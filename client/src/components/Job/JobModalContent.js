import React, { Component } from 'react';
import ItemList from './ItemList';

export default class JobModalContent extends Component {
  render() {
    const job = this.props.jobData;
    return (
      <div className="row">
        <div className="col-8">
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <div className="skills-info">
            <h3>Skills and Expertise</h3>
            <ItemList items={job.skills} />
          </div>
          <div className="payment-info mt-3">
            <h3>Payment Forms Accepted</h3>
            <ItemList items={job.paymentForms} />
            <p className="m-3">Price: ${job.price}</p>
          </div>
        </div>
        <div className="col-4 text-center d-flex flex-column">
          <div className="jumbotron">
            {/* CLIENT PROFILE INFO */}
          </div>
          <button className="btn btn-primary m-2">Apply</button>
          <button className="btn btn-secondary btn-info m-2">Save Job</button>
        </div>
      </div>
    );
  }
}
