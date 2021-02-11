import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from './Modal';

export default class Job extends Component {
	constructor(props) {
		super(props);

		// the description initially is an empty string
    // show is set to false, since by default Job card is not clicked
		this.state = {
			description: '',
      show: false,
		};

    this.togglePopup = this.togglePopup.bind(this);
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

  /**
   * Sets show to the opposite boolean value whenever buttons are clicked to show/hide modal
   */
  togglePopup() {
    this.setState({
      show: !this.state.show
    });
  }

	render() {
		return (
			<div className="col-3">
				<div className="card m-0 mb-5 position-relative">
					<div className="card-body">
						<a className="stretched-link" onClick={this.togglePopup}></a>
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
							</div>
						</div>
					</div>
				</div>
        {this.state.show ? <Modal jobDetails={this.props.data} toggle={this.togglePopup} /> : null}
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