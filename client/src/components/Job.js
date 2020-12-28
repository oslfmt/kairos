import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Job extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: 'TITLE',
			description: '[DESCRIPTION...]',
			price: 0,
			freelancer: {
				name: 'Freelancer Name',
				rating: 0
			}
		};
	}

	render() {
		return (
			<div className="col-sm-3">
				<div className="card">
					<div className="card-body">
						<Link to="/servicedetails" className="stretched-link"></Link>
						<h5 className="card-title">{this.state.title}</h5>
						<p className="card-text">{this.state.description}</p>
						<div className="row">
							<div className="col">
								<p className="lead">{this.state.freelancer.name}</p>
							</div>
							<div className="col">
								<p className="font-weight-bold text-center">${this.state.price}</p>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="far fa-star"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
