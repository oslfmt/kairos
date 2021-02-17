import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class JobModalContent extends Component {
  render() {
    const job = this.props.jobData;
    return (
      <div className="row">
        <div className="col-8">
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <div className="deliverables">
            <h3>Deliverables</h3>
            <ul>
              <li>dev 1</li>
              <li>dev 2</li>
              <li>dev 3</li>
            </ul>
          </div>
          <div className="skills-info">
            <h3>Skills and Expertise</h3>
            <SkillsList skills={job.skills} />
          </div>
          <div className="payment-info">
            <h3>Payment Forms Accepted</h3>
            <ul>
              <li>payment 1</li>
              <li>payment 2</li>
              <li>payment 3</li>
            </ul>
            <p>Price: $X</p>
          </div>
        </div>
        <div className="col-4 text-center d-flex flex-column">
          <div className="jumbotron">
            {/* CLIENT PROFILE INFO */}
          </div>
          <button className="btn btn-primary">Apply</button>
          <button className="btn btn-secondary">Save Job</button>
        </div>
      </div>
    );
  }
}

// fix findDOMnode problem
const SkillsList = (props) => {
  const skills = props.skills;
  console.log(skills);
  const skillsList = skills.map((skill, index) => {
    <ListGroup.Item key={index}>{skill}</ListGroup.Item>
  });

  return (
    <ListGroup>
      {skillsList}
    </ListGroup>
  )
}
