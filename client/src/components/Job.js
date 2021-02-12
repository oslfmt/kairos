import React, { Component } from 'react';
import JobModalContent from './JobModalContent';

export default class Job extends Component {
	constructor(props) {
		super(props);

		// the description initially is an empty string
		this.state = {
			description: '',
		};
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

	render() {
    const job = this.props.data;
		return (
			<div className="col-3">
				<div className="card m-0 mb-5 position-relative">
					<div className="card-body">
						<a className="stretched-link" data-toggle="modal" data-target="#exampleModal" onClick={this.togglePopup}/>
						<h5 className="card-title">{job.title}</h5>
						<p className="card-text" id="description">{this.state.description}</p>
						<div className="row align-items-center ">
							<div className="col-9">
								<PaymentFormsList items={job.paymentForms} />
							</div>
							<div className="col-3">
								<p className="font-weight-bold text-center" style={{'color': 'green'}}>${job.price}</p>
							</div>
							<div className="row d-flex align-items-center position-absolute p-2" style={{'bottom': 0, 'right': 25}}>
								<div className="col-8">
									<p>[CLIENT NAME]</p>
								</div>
							</div>
						</div>
					</div>

          {/* Modal-render on card click--may extract to own component in future, but bootstrap classes are uncompatible */}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="container-fluid">
                    <JobModalContent jobData={job} />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
				</div>
			</div>
		);
	}
}

/**
 * This component renders a list of payment forms for each job posting
 * @param {*} props pass in the paymentForms indicated from the index
 */
function PaymentFormsList(props) {
	const paymentForms = props.items;
	const paymentFormsList = paymentForms.map(item => {
		return <li className="list-group-item">{item}</li>;
	});

	return (
		<ul className="list-group">
			{paymentFormsList}
		</ul>
	);
}