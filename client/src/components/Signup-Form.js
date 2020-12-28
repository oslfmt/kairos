import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignupForm extends Component {
	render() {
		return (
			<div>
				<section id="signup-form" >
        	<div className="container d-flex justify-content-center">
            <div className="card">
							<div className="card-body">
								<h2 className="card-title">Sign Up</h2>
								<form action="#">
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="firstName">First Name</label>
											<input type="text" className="form-control" id="firstName"></input>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="lastName">Last Name</label>
											<input type="text" className="form-control" id="lastName"></input>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md">
											<label htmlFor="university">University</label>
											<input type="text" className="form-control" id="university"></input>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md">
											<label htmlFor="username">Username</label>
											<input type="text" className="form-control" id="username"></input>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
												<label htmlFor="password">Password</label>
												<input type="text" className="form-control" id="password"></input>
										</div>
										<div className="form-group col-md-6">
												<label htmlFor="confirmPassword">Confirm Password</label>
												<input type="text" className="form-control" id="confirmPassword"></input>
										</div>
									</div>
									<div className="form-row mt-3">
										<div className="form-group col-md text-center">
											<Link className="btn btn-lg btn-primary" to="/profile">Join</Link>
										</div>
									</div>
								</form>
							</div>
            </div>
        	</div>
    		</section>
			</div>
		)
	}
}
