import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<div className="container-fluid p-3 bg-light">
				<div className="row justify-content-start align-items-center">
					<div className="col-xl-2 justify-content-center d-flex ml-3 mr-3">
						<h1 className="display-4">
							<Link to="/">Collancer</Link>
						</h1>
					</div>
					<div className="col-xl-3 p-0">
						<input type="text" className="form-control" placeholder="Search..."></input>
					</div>
					<div className="col-xl-2">
						<Link to="/browse" className="btn btn-primary">Go</Link>
					</div>
				</div>
				<div className="row text-center">
					<div className="col-xl-1">
							<Link to="">Design</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Programming</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Tutoring</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Writing</Link>
					</div>
				</div>
      </div>
		)
	}
}
