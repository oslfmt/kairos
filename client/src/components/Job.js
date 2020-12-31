import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Job extends Component {
	render() {
		return (
			<div className="col-sm-3">
				<div className="card">
					<div className="card-body">
						<Link to="/servicedetails" className="stretched-link"></Link>
						<h5 className="card-title">{this.props.jobData.title}</h5>
						<p className="card-text">{this.props.jobData.description}</p>
						<div className="row">
							<div className="col">
								{/* Retrieve from FREELANCER NAME (associated with account) */}
								<p className="lead">[FREELANCER NAME]</p>
							</div>
							<div className="col">
								<p className="font-weight-bold text-center">${this.props.jobData.price}</p>
							</div>
						</div>
						{/* Retrieve from FREELANCER RATING (associated with account) */}
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
