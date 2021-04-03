import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import JobModalContent from './JobModalContent';
import ItemList from './ItemList';

/**
 * This component renders a Job card on the browse page. It is a card that displays simple info
 * that is relevant to the particular job.
 */
export default class Job extends Component {
	constructor(props) {
		super(props);

		// the description initially is an empty string
		this.state = {
			description: '',
      show: false
		};

    this.handleShow = this.handleShow.bind(this);
	}

	/**
	 * When job card is loaded, get the full length of the string from props, which has
	 * the string stored in the index. Truncate the description if it is over max character,
	 * then set state to truncated string.
	 */
	componentDidMount() {
		const MAX_LENGTH = 75;
		let description = this.props.data.description;

		// if description is too long, truncate it down
		description = (description.length > MAX_LENGTH) ? 
			description.substr(0, MAX_LENGTH) + '...' : description;

		this.setState({
			description: description
		});
	}
  
  handleShow() {
    this.setState({
      show: !this.state.show
    })
  }

	render() {
    const job = this.props.data;
		return (
			<div className="col-3">
				<div className="card m-0 mb-5 position-relative">
					<div className="card-body" style={{height: "300px"}}>
            {/* Clicking anywhere on card triggers modal */}
						<a className="stretched-link" onClick={this.handleShow} />
						<h5 className="card-title">{job.title}</h5>
						<p className="card-text" id="description">{this.state.description}</p>
						<div className="row align-items-center ">
							<div className="col-9">
								<ItemList items={job.paymentForms} />
							</div>
							<div className="col-3">
								<p className="font-weight-bold text-center" style={{'color': 'green'}}>${job.price}</p>
							</div>
							<div className="row d-flex align-items-center position-absolute p-2" style={{'bottom': 0, 'right': 25}}>
								<div className="col-9">
									<p>{job.clientName}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
        {this.state.show ? <JobModal handleShow={this.handleShow} show={true} jobData={job} /> : null}
			</div>
		);
	}
}

/**
 * This component is a modal popup that displays the job details, client profile, and an apply button
 * 
 * @prop show - boolean indicating whether to display modal
 * @prop handleShow - handler function to change state of parent component
 * @prop jobData - job details to display
 */
function JobModal(props) {
  const handleClose = () => {
    props.handleShow()
  };

  return (
    <Modal size="xl" show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JobModalContent jobData={props.jobData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}