// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IArbitrator.sol";

/**
 * simple arbitrator example. Does NOT implement appeal functionality
 */
contract SimpleCentralizedArbitrator is IArbitrator {
  address public owner = msg.sender;
  uint256 constant appealWindow = 3 minutes;
  uint256 internal arbitrationFee = 1e15;

  struct Dispute {
    IArbitrable arbitrated;
    uint256 choices;
    uint256 ruling;
    DisputeStatus status;
    uint appealPeriodStart;
    uint appealPeriodEnd;
    uint appealCount;
  }

  Dispute[] public disputes;

  function arbitrationCost(bytes memory _extraData) public override view returns (uint256) {
    return arbitrationFee;
  }

  function appealCost(uint256 _disputeID, bytes calldata _extraData) public override view returns (uint256) {
    return arbitrationFee * (2**(disputes[_disputeID].appealCount));
  }

  function setArbitrationCost(uint256 _newCost) public {
    arbitrationFee = _newCost;
  }

  function createDispute(uint256 _choices, bytes calldata _extraData) public override payable returns (uint256 disputeID) {
    // require payment to be at least the arbitrationCost
    require(msg.value >= arbitrationCost(_extraData), "Not enough ETH to cover arbitration costs");

    // create a new dispute
    disputes.push(Dispute({
      arbitrated: IArbitrable(msg.sender),
      choices: _choices,
      ruling: uint256(1000),
      status: DisputeStatus.Waiting,
      appealPeriodStart: 0,
      appealPeriodEnd: 0,
      appealCount: 0
    }));

    disputeID = disputes.length - 1;

    emit DisputeCreation(disputeID, IArbitrable(msg.sender));
  }

  function disputeStatus(uint256 _disputeID) public override view returns (DisputeStatus status) {
    Dispute storage dispute = disputes[_disputeID];

    if (disputes[_disputeID].status == DisputeStatus.Appealable && block.timestamp >= dispute.appealPeriodEnd) {
      return DisputeStatus.Solved;
    } else {
      return disputes[_disputeID].status;
    }
  }

  function currentRuling(uint256 _disputeID) public override view returns (uint256 ruling) {
    ruling = disputes[_disputeID].ruling;
  }

  // proxy function which calls arbitrable.rule(), but performs some checks beforehand, then updates dispute, then calls
  // rule of arbitrable to enforce ruling
  function giveRuling(uint256 _disputeID, uint256 _ruling) public {
    // make sure only the arbitrator can decide ruling
    require(msg.sender == owner, "Only the owner of this contract can execute ruling");

    Dispute storage dispute = disputes[_disputeID];
    
    // require ruling to be a valid choice
    require(_ruling <= dispute.choices, "Ruling out of bounds");
    // rulings cannot be made on already solved dispute
    require(dispute.status == DisputeStatus.Waiting, "Dispute is not waiting arbitration");

    // update ruling and status of the dispute
    dispute.ruling = _ruling;
    dispute.status = DisputeStatus.Appealable;

    dispute.appealPeriodStart = block.timestamp;
    dispute.appealPeriodEnd = dispute.appealPeriodStart + appealWindow;

    emit AppealPossible(_disputeID, dispute.arbitrated);
  }

  function executeRuling(uint _disputeID) public {
    Dispute storage dispute = disputes[_disputeID];
    require(dispute.status == DisputeStatus.Appealable, "The dispute must be appealable");
    require(block.timestamp >= dispute.appealPeriodEnd, "The dispute must be executed after appeal period end");

    dispute.status = DisputeStatus.Solved;
    dispute.arbitrated.rule(_disputeID, dispute.ruling);
  }

  function appeal(uint256 _disputeID, bytes calldata _extraData) public override payable {
    Dispute storage dispute = disputes[_disputeID];
    dispute.appealCount++;

    require(msg.value >= appealCost(_disputeID, _extraData), "Not enough ETH to cover appeal cost");
    require(dispute.status == DisputeStatus.Appealable, "The dispute must be appealable");
    require(block.timestamp < dispute.appealPeriodEnd, "The appeal must occur before the end of the appeal period");

    dispute.status = DisputeStatus.Waiting;

    emit AppealDecision(_disputeID, dispute.arbitrated);
  }

  function appealPeriod(uint256 _disputeID) public override view returns (uint256, uint256) {
    Dispute storage dispute = disputes[_disputeID];
    return (dispute.appealPeriodStart, dispute.appealPeriodEnd);
  }
}