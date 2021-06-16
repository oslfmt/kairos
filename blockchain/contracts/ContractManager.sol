// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ContractManager {
  struct Contract {
    address payable freelancer;
    address client;
    uint deadline;
    uint payment;
  }

  // tracks all contracts existing on platform, maps contractID to contract struct
  uint256 public contractID = 0;
  mapping (uint256 => Contract) public contracts;

  function createContract(address payable _freelancer, uint _deadline, uint _payment) public {
    // initialize contract metadata
    contracts[contractID].freelancer = _freelancer;
    contracts[contractID].client = msg.sender;
    contracts[contractID].deadline = _deadline;
    contracts[contractID].payment = _payment;

    // increment ID for next contract
    contractID++;

    emit ContractCreated(msg.sender, _freelancer, _deadline, _payment);
  }

  function changeDeadline(uint _contractID, uint _newDeadline) public {
    // require signatures of all parties
    contracts[_contractID].deadline = _newDeadline;
    emit DeadlineChanged(_contractID, _newDeadline);
  }

  function changePaymentAmount(uint _contractID, uint _newPaymentAmount) public {
    // require sigs of all parties
    contracts[_contractID].payment = _newPaymentAmount;
    emit PaymentChanged(_contractID, _newPaymentAmount);
  }

  event ContractCreated(address client, address payable freelancer, uint deadline, uint payment);
  event DeadlineChanged(uint contractID, uint deadline);
  event PaymentChanged(uint contractID, uint payment);
}

// TODO
// 1. Figure out escrow payments and transfer of ether
//    a) Depositing ether into escrow contract
//    b) paying funds to freelancer
//    c) returning funds to client