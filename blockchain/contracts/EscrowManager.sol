// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ContractManager.sol";

// ether is sent to this contract, which acts as an escrow account manager. The contract stores the ether amount
// in a mapping linked to the contractID. This allows the escrow manager to associate escrow balances with specific
// contracts.
// contract holds funds in its escrow account until one of two things eventually occur:
//    case 1) client wins a dispute
//    case 2) freelancer and client agree that contract was completed successfully

// in case 1, the escrow manager returns the escrow funds back to the client.
// in case 2, the escrow manager pays out the escrow funds to the freelancer on behalf of the client
contract EscrowManager is ContractManager {
  // maps contractID to the escrow amount of that particular contract
  mapping (uint256 => uint256) escrowAccounts;

  function depositFundsToEscrow(uint _contractID, uint _amount) public {
    // set the balance of escrow account to given amount
    escrowAccounts[_contractID] = _amount;
    emit EscrowFundsDeposited(_contractID, _amount);
  }

  function payFreelancer(uint _contractID) public {
    uint256 payment = escrowAccounts[_contractID];
    address payable freelancer = contracts[_contractID].freelancer;

    // transfer ether to freelancer from escrow account
    (bool sent, bytes memory data) = freelancer.call{value: payment}("");
    require(sent, "Failed to send ether");

    // deduct balance from escrow
    escrowAccounts[_contractID] -= payment;
  }

  function reimburseFunds(uint _contractID, address payable _recipient) public {
    uint payment = escrowAccounts[_contractID];
    (bool sent, bytes memory data) = _recipient.call{value: payment}("");
    require(sent, "Failed to send ether");

    // deduct balance from escrow
    escrowAccounts[_contractID] -= payment;
  }

  receive() external payable {}

  event EscrowFundsDeposited(uint contractID, uint amount);
}

// TODO
// 1. make sure that when depositing funds ether is actually transferred to contract balance (not just manipulating numbers)
// 2. security checks for freelancer payment (multisig of both parties)
// 3. security checks for reimburseFunds (multisig of both parties)