// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ContractManager.sol";

contract EscrowManager is ContractManager {
  // maps contractID to the escrow amount of that particular contract
  mapping (uint256 => uint256) escrowAccounts;

  function depositFundsToEscrow(uint _contractID, uint amount) public payable {
    // deposit in this contract? or in a separate escrow contract, which manages all escrow accounts?
    // depositer must be guaranteed that ONLY they have the rights to receive funds in the event that they win a dispute
    // freelancer is guaranteed that ONLY they have the rights to receive these funds
    // contract is autonomous and is in full control of the funds, and sends the funds to...
    //    client if the client wins a dispute
    //    freelancer if the client and freelancer complete the contract successfully
    escrowAccounts[_contractID] = amount;

  }

  function payFreelancer(uint _contractID) public {
    uint256 payment = escrowAccounts[_contractID];
    address payable freelancer = contracts[_contractID].freelancer;

    freelancer.call({value: payment});
  }

  // ether is sent to this contract, which acts as an escrow account manager. The contract stores the ether amount
  // in a mapping linked to the contractID. This allows the escrow manager to associate escrow balances with specific
  // contracts.
  // contract holds funds in its escrow account until one of two things eventually occur:
  //    case 1) client wins a dispute
  //    case 2) freelancer and client agree that contract was completed successfully
  
  // in case 1, the escrow manager returns the escrow funds back to the client.
  // in case 2, the escrow manager pays out the escrow funds to the freelancer on behalf of the client
  receive() external payable {

  }
}