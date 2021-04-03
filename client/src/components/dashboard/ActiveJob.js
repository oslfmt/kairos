import React from 'react';

export default function ActiveJob(props) {
  const job = props.postDetails;

  return (
    <div className="card shadow m-3">
      <div className="card-header">{job.title.toUpperCase()}</div>
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <p className="card-text">{job.description}</p>
            <p className="card-text">Skills requested: <em>{job.skills}</em></p>
            <p className="card-text">Payment Types: <em>{job.paymentForms}</em></p>
            <p className="card-text">Price: <em>{job.price}</em></p>
          </div>
          <div className="col-4 flex-column d-flex">
            <p className="card-text text-center">Freelancer Name</p>
            <button className="btn btn-primary mb-2">Chat</button>
            <button className="btn btn-primary">Pay to Escrow</button>
          </div>
        </div>
      </div>
    </div>
  );
}