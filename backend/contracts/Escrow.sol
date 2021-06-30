// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./interfaces/IArbitrable.sol";
import "./interfaces/IArbitrator.sol";
import "./interfaces/IEvidence.sol";

contract Escrow is IArbitrable, IEvidence {
  enum Status {Initial, Reclaimed, Disputed, Resolved}
  enum RulingOptions {RefusedToArbitrate, PayerWins, PayeeWins}
  uint256 constant numberOfRulingOptions = 2;
  // for now, default arbitrator is Kleros Court on Kovan (later change to mainnet)
  // why does wrapping address in IArbitrator work??
  IArbitrator defaultArbitrator = IArbitrator(0x60B2AbfDfaD9c0873242f59f2A8c32A3Cc682f80);

  struct Contract {
    address payable payer;
    address payable payee;
    IArbitrator arbitrator;
    Status status;
    uint256 value;
    uint256 disputeID;
    uint256 createdAt;
    uint256 reclaimedAt;
    uint256 payerFeeDeposit;
    uint256 payeeFeeDeposit;
    uint256 reclamationPeriod;
    uint256 arbitrationFeeDepositPeriod;
  }

  Contract[] public contracts;
  mapping (uint256 => uint256) disputeIDtoContractID;

  function createNewContract(
    address payable _payee,
    string memory _metaEvidence, 
    uint256 _reclamationPeriod, 
    uint256 _arbitrationFeeDepositPeriod
    ) public payable returns (uint256 contractID) {
      emit MetaEvidence(contracts.length, _metaEvidence);

      contracts.push(
        Contract({
          payer: payable(msg.sender),
          payee: _payee,
          arbitrator: defaultArbitrator,
          status: Status.Initial,
          value: msg.value,
          disputeID: 0,
          createdAt: block.timestamp,
          reclaimedAt: 0,
          payerFeeDeposit: 0,
          payeeFeeDeposit: 0,
          reclamationPeriod: _reclamationPeriod,
          arbitrationFeeDepositPeriod: _arbitrationFeeDepositPeriod
        })
      );

      contractID = contracts.length - 1;
  }

  function releaseFunds(uint256 _contractID) public {
    Contract storage transaction = contracts[_contractID];
    require(transaction.status == Status.Initial, "Transaction is not in initial state");

    // payee can only reclaim funds if the reclamationPeriod has passed
    if (msg.sender != transaction.payer) {
      require(block.timestamp - transaction.createdAt > transaction.reclamationPeriod, "Payer still has time to reclaim");
    }

    // payer can release funds to payee at any time
    transaction.status = Status.Resolved;
    transaction.payee.transfer(transaction.value);
  }

  // this is the place where we put the rules to enforce the ruling, which the arbitrator decides
  // Note: does NOT handle refusedToArbitrate event
  function rule(uint256 _disputeID, uint256 _ruling) override public {
    uint256 txID = disputeIDtoContractID[_disputeID];
    Contract storage transaction = contracts[txID];

    // first check if the caller has the right to rule on the contract
    require(msg.sender == address(transaction.arbitrator), "Only the arbitrator can execute a ruling");
    // require status to be in disputed state
    require(transaction.status == Status.Disputed, "There should be a dispute to execute a ruling");
    require(_ruling <= numberOfRulingOptions, "Ruling out of bounds");

    transaction.status = Status.Resolved;
    // return contract balance (escrowFunds + arbitratorFee) to whoever won
    if (_ruling == uint256(RulingOptions.PayerWins)) {
      transaction.payer.transfer(transaction.value + transaction.payerFeeDeposit);
    } else if (_ruling == uint256(RulingOptions.PayeeWins)) {
      transaction.payee.transfer(transaction.value + transaction.payeeFeeDeposit);
    }
    emit Ruling(transaction.arbitrator, _disputeID, _ruling);
  }

  function submitEvidence(uint256 _contractID, string memory _evidence) public {
    Contract storage transaction = contracts[_contractID];
    require(transaction.status != Status.Resolved, "Transaction not in resolved state");
    require(msg.sender == transaction.payer || msg.sender == transaction.payee, "Third parties are not allowed to submit evidence");
    emit Evidence(transaction.arbitrator, _contractID, msg.sender, _evidence);
  }
}

// TODO
// - Test smart contracts in trufflef
// - test smart contracts against centralized arbitrator on kleros kovan
// - figure out "extraData" implementation (if necessary), ie, # of votes, subcourt IDs, etc.
