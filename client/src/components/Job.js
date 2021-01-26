import React from 'react';
import { Link } from 'react-router-dom';

export default function Job(props) {
	return (
		<div className="col-3">
			<div className="card m-0 mb-5">
				<div className="card-body">
					<Link to="/servicedetails" className="stretched-link"></Link>
					<h5 className="card-title">{props.data.title}</h5>
					<p className="card-text">{props.data.description}</p>
					<div className="row">
						<div className="col">
							<p className="lead">[CLIENT NAME]</p>
						</div>
						<div className="col">
							<p className="font-weight-bold text-center">${props.data.price}</p>
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
	)
}
