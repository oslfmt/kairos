// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IArbitrable.sol";
import "./IArbitrator.sol";
import "./IEvidence.sol";

contract Escrow is IArbitrable, IEvidence {
  enum Status {Initial, Reclaimed, Disputed, Resolved}
  enum RulingOptions {RefusedToArbitrate, PayerWins, PayeeWins}
  uint256 constant numberOfRulingOptions = 2;

  struct TX {
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

  TX[] public txs;
  mapping (uint256 => uint256) disputeIDtoTXID;

  function newTransaction(
    address payable _payee, 
    IArbitrator _arbitrator, 
    string memory _metaEvidence, 
    uint256 _reclamationPeriod, 
    uint256 _arbitrationFeeDepositPeriod
    ) public payable returns (uint256 txID) {
      emit MetaEvidence(txs.length, _metaEvidence);

      txs.push(
        TX({
          payer: payable(msg.sender),
          payee: _payee,
          arbitrator: _arbitrator,
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

      txID = txs.length;
  }

  function releaseFunds(uint256 _txID) public {
    TX storage transaction = txs[_txID];
    require(transaction.status == Status.Initial, "Transaction is not in initial state");

    // payee can only reclaim funds if the reclamationPeriod has passed
    if (msg.sender != transaction.payer) {
      require(block.timestamp - transaction.createdAt > transaction.reclamationPeriod, "Payer still has time to reclaim");
    }

    // payer can release funds to payee at any time
    transaction.status = Status.Resolved;
    transaction.payee.transfer(transaction.value);
  }

  function reclaimFunds(uint256 _txID) public payable {
    TX storage transaction = txs[_txID];

    require(
      transaction.status == Status.Initial || transaction.status == Status.Reclaimed,
      "Transaction is not in an initial or reclaimed state"
    );

    require(msg.sender == transaction.payer, "Only payer can reclaim funds");

    // if payer has already called function, putting status in a reclaimed state AND the payee hasn't deposited the
    // arbitration fee, then the payer can reclaim the funds in escrow
    if (transaction.status == Status.Reclaimed) {
      require(
        block.timestamp - transaction.reclaimedAt > transaction.arbitrationFeeDepositPeriod,
        "Payee still has time to deposit arbitration fee"
      );
      // payer wins by default and gets refunded escrowBalance + arbitrationFee
      transaction.payer.transfer(transaction.value + transaction.payerFeeDeposit);
      transaction.status = Status.Resolved;
    } else {
      // otherwise, payer is calling reclaim for the first time, and must check to see if contract is still in period
      require(block.timestamp - transaction.createdAt <= transaction.reclamationPeriod, "Reclamation period ended");
      // require the payer to pay arbitration fee
      require(
        msg.value >= transaction.arbitrator.arbitrationCost(""),
        "Can't reclaim funds without depositing the arbitration fee"
      );
      transaction.payerFeeDeposit = msg.value;
      transaction.reclaimedAt = block.timestamp; // start the reclamation phase
      transaction.status = Status.Reclaimed; // set contract status to reclaimed state
    }
  }

  // this is the place where we put the rules to enforce the ruling, which the arbitrator decides
  // Note: does NOT handle refusedToArbitrate event
  function rule(uint256 _disputeID, uint256 _ruling) override public {
    uint256 txID = disputeIDtoTXID[_disputeID];
    TX storage transaction = txs[txID];

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

  function depositArbitrationFeeForPayee(uint256 _txID) public payable {
    TX storage transaction = txs[_txID];
    // check that state of contract is reclaimed
    require(transaction.status == Status.Reclaimed, "Transaction is not in reclaimed state");
    // doesn't there need to be a check for if the arbitrationFeeDepositPeriod has ended?
    require(block.timestamp - transaction.reclaimedAt <= transaction.arbitrationFeeDepositPeriod, "Arbitration fee deposit period elapsed");

    // if checks pass, deposit payee arbitration fee into ARBITRATOR contract balance, and open a dispute
    transaction.payeeFeeDeposit = msg.value;
    transaction.disputeID = transaction.arbitrator.createDispute{value: msg.value}(numberOfRulingOptions, "");
    transaction.status = Status.Disputed;
    disputeIDtoTXID[transaction.disputeID] = _txID;

    // emit dispute event
    emit Dispute(transaction.arbitrator, transaction.disputeID, _txID, _txID);
  }

  function remainingTimeToReclaim(uint256 _txID) public view returns (uint256) {
    TX storage transaction = txs[_txID];
    require(transaction.status == Status.Initial, "Transaction is not in Initial state");
    return (block.timestamp - transaction.createdAt) > transaction.reclamationPeriod ? 0 : (transaction.createdAt + transaction.reclamationPeriod - block.timestamp);
  }

  function remainingTimeToDepositArbitrationFee(uint256 _txID) public view returns (uint256) {
    TX storage transaction = txs[_txID];
    require(transaction.status == Status.Reclaimed, "Transaction is not in Reclaimed state");
    return (block.timestamp - transaction.reclaimedAt) > transaction.arbitrationFeeDepositPeriod ? 0 : (transaction.reclaimedAt + transaction.arbitrationFeeDepositPeriod - block.timestamp);
  }

  function submitEvidence(uint256 _txID, string memory _evidence) public {
    TX storage transaction = txs[_txID];
    require(transaction.status != Status.Resolved, "Transaction not in resolved state");
    require(msg.sender == transaction.payer || msg.sender == transaction.payee, "Third parties are not allowed to submit evidence");
    emit Evidence(transaction.arbitrator, _txID, msg.sender, _evidence);
  }
}