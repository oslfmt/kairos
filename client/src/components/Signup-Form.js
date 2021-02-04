import React, { Component } from 'react';
const axios = require('axios');


export default class SignupForm extends Component {
	constructor(props) {
		super(props);

		// HUGE SECURITY VULNERABILITY!!!: stores unencrypted plaintext password in state!!!!!!!????
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const User = {
			name: this.state.firstName + " " + this.state.lastName,
			email: this.state.email,
			password: this.state.password
		};
		
		axios.post('http://localhost:4000/register/', User)
			.then(res => console.log(res))
			.catch(err => console.error(err));

		// reset state
		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		})
	}

	handleInput(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div>
				<section id="signup-form" >
        	<div className="container d-flex justify-content-center">
            <div className="card">
							<div className="card-body">
								<h2 className="card-title">Sign Up</h2>
								<form>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="firstName">First Name</label>
											<input 
												type="text" 
												className="form-control" 
												name="firstName"
												value={this.state.firstName}
												onChange={this.handleInput}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="lastName">Last Name</label>
											<input 
												type="text" 
												className="form-control" 
												name="lastName"
												value={this.state.lastName}
												onChange={this.handleInput}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md">
											<label htmlFor="university">Email</label>
											<input 
												type="email" 
												className="form-control" 
												name="email"
												value={this.state.email}
												onChange={this.handleInput}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
												<label htmlFor="password">Password</label>
												<input 
													type="password" 
													className="form-control" 
													name="password"
													value={this.state.password}
													onChange={this.handleInput}
												/>
										</div>
										<div className="form-group col-md-6">
												<label htmlFor="confirmPassword">Confirm Password</label>
												<input type="password" className="form-control" id="confirmPassword"></input>
										</div>
									</div>
									<div className="form-row mt-3">
										<div className="form-group col-md text-center">
											<button className="btn btn-lg btn-primary" onClick={this.handleSubmit}>Join</button>
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
