// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IArbitrator.sol";

/**
 * simple arbitrator example. Does NOT implement appeal functionality
 */
contract SimpleCentralizedArbitrator is IArbitrator {
  address public owner = msg.sender;

  struct Dispute {
    IArbitrable arbitrated;
    uint256 choices;
    uint256 ruling;
    DisputeStatus status;
  }

  Dispute[] public disputes;

  function arbitrationCost(bytes memory _extraData) public override pure returns (uint256) {
    return 0.1 ether;
  }

  function appealCost(uint256 _disputeID, bytes calldata _extraData) public override pure returns (uint256) {
    return 2**250; // unaffordable amount to basically avoid appeals in this example
  }

  function createDispute(uint256 _choices, bytes calldata _extraData) public override payable returns (uint256 disputeID) {
    // require payment to be at least the arbitrationCost
    require(msg.value >= arbitrationCost(_extraData), "Not enough ETH to cover arbitration costs");

    // create a new dispute
    disputes.push(Dispute({
      arbitrated: IArbitrable(msg.sender),
      choices: _choices,
      ruling: uint256(1000),
      status: DisputeStatus.Waiting
    }));

    disputeID = disputes.length - 1;

    emit DisputeCreation(disputeID, IArbitrable(msg.sender));
  }

  function disputeStatus(uint256 _disputeID) public override view returns (DisputeStatus status) {
    status = disputes[_disputeID].status;
  }

  function currentRuling(uint256 _disputeID) public override view returns (uint256 ruling) {
    ruling = disputes[_disputeID].ruling;
  }

  // proxy function which calls arbitrable.rule(), but performs some checks beforehand, then updates dispute, then calls
  // rule of arbitrable to enforce ruling
  function rule(uint256 _disputeID, uint256 _ruling) public {
    // make sure only the arbitrator can decide ruling
    require(msg.sender == owner, "Only the owner of this contract can execute ruling");

    Dispute storage dispute = disputes[_disputeID];
    
    // require ruling to be a valid choice
    require(_ruling <= dispute.choices, "Ruling out of bounds");
    // rulings cannot be made on already solved dispute
    require(dispute.status == DisputeStatus.Waiting, "Dispute is not waiting arbitration");

    // update ruling and status of the dispute
    dispute.ruling = _ruling;
    dispute.status = DisputeStatus.Solved;

    // pay arbitration fee to the arbitrator
    // fee is deposited by payee when calling createDispute()
    payable(owner).transfer(arbitrationCost(""));
    // call arbitrable rule function to enforce ruling
    dispute.arbitrated.rule(_disputeID, _ruling);
  }

  function appeal(uint256 _disputeID, bytes calldata _extraData) public override payable {
    require(msg.value >= appealCost(_disputeID, _extraData), "Not enough ETH to cover appeal costs");
  }

  function appealPeriod(uint256 _disputeID) public override pure returns (uint256, uint256) {
    return (0, 0);
  }
}