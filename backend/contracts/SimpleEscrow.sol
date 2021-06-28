// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IArbitrable.sol";
import "./IArbitrator.sol";
import "./IEvidence.sol";

contract SimpleEscrow is IArbitrable, IEvidence {
  address payable public payer = payable(msg.sender);
  address payable public payee;
  uint256 public value;
  IArbitrator public arbitrator;
  uint256 public createdAt;
  // time is set to short, for testing purposes
  uint256 public constant reclamationPeriod = 3 minutes;
  uint256 public constant arbitrationFeeDepositPeriod = 3 minutes;

  enum Status {Initial, Reclaimed, Disputed, Resolved}
  Status public status;
  uint256 public reclaimedAt;

  enum RulingOptions {RefusedToArbitrate, PayerWins, PayeeWins}
  uint256 constant numberOfRulingOptions = 2;

  uint256 constant metaEvidenceID = 0;
  uint256 constant evidenceGroupID = 0;

  constructor(address payable _payee, IArbitrator _arbitrator, string memory _metaevidence) payable {
    value = msg.value;
    payee = _payee;
    arbitrator = _arbitrator;
    createdAt = block.timestamp;

    emit MetaEvidence(metaEvidenceID, _metaevidence);
  }

  function releaseFunds() public {
    require(status == Status.Initial, "Transaction is not in initial state");

    // payee can only reclaim funds if the reclamationPeriod has passed
    if (msg.sender != payer) {
      require(block.timestamp - createdAt > reclamationPeriod, "Payer still has time to reclaim");
    }

    // payer can release funds to payee at any time
    status = Status.Resolved;
    payee.transfer(value);
  }

  function reclaimFunds() public payable {
    require(
      status == Status.Initial || status == Status.Reclaimed,
      "Transaction is not in an initial or reclaimed state"
    );

    require(msg.sender == payer, "Only payer can reclaim funds");

    // if payer has already called function, putting status in a reclaimed state AND the payee hasn't deposited the
    // arbitration fee, then the payer can reclaim the funds in escrow
    if (status == Status.Reclaimed) {
      require(
        block.timestamp - reclaimedAt > arbitrationFeeDepositPeriod,
        "Payee still has time to deposit arbitration fee"
      );
      // payer wins by default and gets refunded escrowBalance + arbitrationFee
      payer.transfer(address(this).balance);
    } else {
      // otherwise, payer is calling reclaim for the first time, and must check to see if contract is still in period
      require(block.timestamp - createdAt <= reclamationPeriod, "Reclamation period ended");
      // require the payer to pay arbitration fee
      require(
        msg.value == arbitrator.arbitrationCost(""),
        "Can't reclaim funds without depositing the arbitration fee"
      );
      reclaimedAt = block.timestamp; // start the reclamation phase
      status = Status.Reclaimed; // set contract status to reclaimed state
    }
  }

  // this is the place where we put the rules to enforce the ruling, which the arbitrator decides
  // Note: does NOT handle refusedToArbitrate event
  function rule(uint256 _disputeID, uint256 _ruling) override public {
    // first check if the caller has the right to rule on the contract
    require(msg.sender == address(arbitrator), "Only the arbitrator can execute a ruling");
    // require status to be in disputed state
    require(status == Status.Disputed, "There should be a dispute to execute a ruling");
    require(_ruling <= numberOfRulingOptions, "Ruling out of bounds");

    status = Status.Resolved;
    // return contract balance (escrowFunds + arbitratorFee) to whoever won
    if (_ruling == uint256(RulingOptions.PayerWins)) {
      payer.transfer(address(this).balance);
    } else if (_ruling == uint256(RulingOptions.PayeeWins)) {
      payee.transfer(address(this).balance);
    }
    emit Ruling(arbitrator, _disputeID, _ruling);
  }

  function depositArbitrationFeeForPayee() public payable {
    // check that state of contract is reclaimed
    require(status == Status.Reclaimed, "Transaction is not in reclaimed state");
    // doesn't there need to be a check for if the arbitrationFeeDepositPeriod has ended?
    require(block.timestamp - reclaimedAt <= arbitrationFeeDepositPeriod, "Arbitration fee deposit period elapsed");

    // if checks pass, deposit payee arbitration fee into ARBITRATOR contract balance, and open a dispute
    uint256 disputeID = arbitrator.createDispute{value: msg.value}(numberOfRulingOptions, "");
    status = Status.Disputed;

    // emit dispute event
    emit Dispute(arbitrator, disputeID, metaEvidenceID, evidenceGroupID);
  }

  function remainingTimeToReclaim() public view returns (uint256) {
    require(status == Status.Initial, "Transaction is not in Initial state");
    return (block.timestamp - createdAt) > reclamationPeriod ? 0 : (createdAt + reclamationPeriod - block.timestamp);
  }

  function remainingTimeToDepositArbitrationFee() public view returns (uint256) {
    require(status == Status.Reclaimed, "Transaction is not in Reclaimed state");
    return (block.timestamp - reclaimedAt) > arbitrationFeeDepositPeriod ? 0 : (reclaimedAt + arbitrationFeeDepositPeriod - block.timestamp);
  }

  function submitEvidence(string memory _evidence) public {
    require(status != Status.Resolved, "Transaction not in resolved state");
    require(msg.sender == payer || msg.sender == payee, "Third parties are not allowed to submit evidence");
    emit Evidence(arbitrator, evidenceGroupID, msg.sender, _evidence);
  }
}