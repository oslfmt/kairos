import { TileDocument } from '@ceramicnetwork/stream-tile';
import models from '../config.json';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

// this component is a form that is used to create a new contract
export default function ContractForm(props) {
  const jobData = props.data;
  const ceramic = props.ceramic;
  // is there a more efficient way to manage state? redux? objects?
  const [reclamationPeriod, setReclamationPeriod] = useState("");
  const [arbitrationFeeDepositPeriod, setArbitrationFeeDepositPeriod] = useState("");
  const [value, setValue] = useState("");
  const [contractDetails, setContractDetails] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const userInput = target.value;
    const name = target.name;

    switch (name) {
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
      default:
    }
  }

  // submits Job details AND contract details to ceramic
  const submitJobAndContract = async (e) => {
    e.preventDefault();

    const contract = { reclamationPeriod, arbitrationFeeDepositPeriod, value, contractDetails };
    const contractMetdata = {
      family: "contracts",
      schema: models.schemas.Contract,
    };

    // create contract document
    const contractDoc = await TileDocument.create(ceramic, contract, contractMetdata);
    const contractStreamID = contractDoc.id.toString();

    let uuid = uuidv4(); // generate uuid
    let status = "posted"; // initial status is posted
    // use previous contractStreamID created in new job
    const job = { uuid, ...jobData, status, contractDetails: contractStreamID };
    const jobMetadata = {
      family: "jobs",
      schema: models.schemas.Job,
    };

    // create job document
    const jobDoc = await TileDocument.create(ceramic, job, jobMetadata);
    const jobStreamID = jobDoc.id.toString();
    // save streamID somewhere for later reference to job
    // actually might not need uuid for schemas, since streamID functions as a unique ID
  }

  return (
    <div className="container mt-5">
      <h1>Create a new contract</h1>
      <form>
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
        <button className="btn btn-primary" onClick={submitJobAndContract}>Submit</button>
      </form>
    </div>
  );
}
