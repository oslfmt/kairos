import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Job extends Component {
	constructor(props) {
		super(props);

		// the description initially is an empty string
		this.state = {
			description: ''
		}
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
		return (
			<div className="col-3">
				<div className="card m-0 mb-5 position-relative">
					<div className="card-body">
						<Link to="/servicedetails" className="stretched-link"></Link>
						<h5 className="card-title">{this.props.data.title}</h5>
						<p className="card-text" id="description">{this.state.description}</p>
						<div className="row align-items-center ">
							<div className="col-9">
								<PaymentFormsList items={this.props.data.paymentForms} />
							</div>
							<div className="col-3">
								<p className="font-weight-bold text-center" style={{'color': 'green'}}>${this.props.data.price}</p>
							</div>
							<div className="row d-flex align-items-center position-absolute p-2" style={{'bottom': 0, 'right': 25}}>
								<div className="col-8">
									<p>[CLIENT NAME]</p>
								</div>
								<div className="col-4">
									<button className="btn btn-primary" >Apply</button>
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