// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Escrow.sol";

// contract is for all things dispute related
contract EscrowDisputeManager is Escrow {
    function reclaimFunds(uint256 _contractID) public payable {
    Contract storage transaction = contracts[_contractID];

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

  function depositArbitrationFeeForPayee(uint256 _contractID) public payable {
    Contract storage transaction = contracts[_contractID];
    // check that state of contract is reclaimed
    require(transaction.status == Status.Reclaimed, "Transaction is not in reclaimed state");
    // doesn't there need to be a check for if the arbitrationFeeDepositPeriod has ended?
    require(block.timestamp - transaction.reclaimedAt <= transaction.arbitrationFeeDepositPeriod, "Arbitration fee deposit period elapsed");

    // if checks pass, deposit payee arbitration fee into ARBITRATOR contract balance, and open a dispute
    transaction.payeeFeeDeposit = msg.value;
    transaction.disputeID = transaction.arbitrator.createDispute{value: msg.value}(numberOfRulingOptions, "");
    transaction.status = Status.Disputed;
    disputeIDtoContractID[transaction.disputeID] = _contractID;

    // emit dispute event
    emit Dispute(transaction.arbitrator, transaction.disputeID, _contractID, _contractID);
  }

  function remainingTimeToReclaim(uint256 _contractID) public view returns (uint256) {
    Contract storage transaction = contracts[_contractID];
    require(transaction.status == Status.Initial, "Transaction is not in Initial state");
    return (block.timestamp - transaction.createdAt) > transaction.reclamationPeriod ? 0 : (transaction.createdAt + transaction.reclamationPeriod - block.timestamp);
  }

  function remainingTimeToDepositArbitrationFee(uint256 _contractID) public view returns (uint256) {
    Contract storage transaction = contracts[_contractID];
    require(transaction.status == Status.Reclaimed, "Transaction is not in Reclaimed state");
    return (block.timestamp - transaction.reclaimedAt) > transaction.arbitrationFeeDepositPeriod ? 0 : (transaction.reclaimedAt + transaction.arbitrationFeeDepositPeriod - block.timestamp);
  }
}