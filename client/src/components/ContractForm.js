import React, { useState, useEffect } from 'react'
import { Escrow } from '../models/Escrow';

// this component is a form that is used to create a new contract
export default function ContractForm() {
  // is there a more efficient way to manage state? redux? objects?
  const [payee, setPayee] = useState("");
  const [reclamationPeriod, setReclamationPeriod] = useState("");
  const [arbitrationFeeDepositPeriod, setArbitrationFeeDepositPeriod] = useState("");
  const [value, setValue] = useState("");
  const [contractDetails, setContractDetails] = useState("");

  const [escrowContract, setEscrowContract] = useState("");

  useEffect(() => {
    let escrowContractInstance = new Escrow();
    setEscrowContract(escrowContractInstance);
  }, [setEscrowContract]);

  const handleInputChange = (e) => {
    const target = e.target;
    const userInput = target.value;
    const name = target.name;

    switch (name) {
      case 'payee':
        setPayee(userInput);
        break;
      case 'reclamationPeriod':
        setReclamationPeriod(userInput);
        break;
      case 'arbitrationFeeDepositPeriod':
        setArbitrationFeeDepositPeriod(userInput);
        break;
      case 'value':
        setValue(userInput);
        break;
      case 'contractDetails':
        setContractDetails(userInput);
        break;
    }
  }
  console.log(escrowContract)

  const handleSubmit = async (e) => {
    e.preventDefault();
    escrowContract.createNewContract(
      payee, 
      contractDetails, 
      reclamationPeriod, 
      arbitrationFeeDepositPeriod, 
      {from: 'currentAccount', value: value} // what happens if this metadata is not included?
    );
  }

  return (
    <div className="container mt-5">
      <h1>Create a new contract</h1>
      <form>
        <div className="form-group mb-4">
          <label>Payee</label>
          <input name="payee" className="form-control" value={payee} onChange={handleInputChange} />
        </div>
        <div className="form-group mb-4">
          <label>Reclamation Period</label>
          <input name="reclamationPeriod" className="form-control" value={reclamationPeriod} onChange={handleInputChange} />
        </div>
        <div className="form-group mb-4">
          <label>Arbitration Fee Deposit Period</label>
          <input name="arbitrationFeeDepositPeriod" className="form-control" value={arbitrationFeeDepositPeriod} onChange={handleInputChange} />
        </div>
        <div className="form-group mb-4">
          <label>Value</label>
          <input name="value" className="form-control" value={value} onChange={handleInputChange} />
        </div>
        <div className="form-group mb-4">
          <label>Contract Details</label>
          <textarea name="contractDetails" className="form-control" value={contractDetails} onChange={handleInputChange} />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
