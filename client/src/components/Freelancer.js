import React, { Component } from 'react';

export default class Freelancer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Jimi',
			avatarUrl: '../img/profilepic.jpg'
		};
	}

	render() {
		return (
			<div>
				<div className="card bg-secondary mb-3">
					<div className="card-body d-flex align-items-center">
						<div className="row align-items-center">
							<div className="col-md-2 text-center">
							</div>
							<div className="col-md-2">
								<h5 className="card-title text-center text-white">{this.state.name}</h5>
							</div>
							<div className="col-md-8">
								<p className="card-text text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatum velit ab blanditiis culpa delectus a eius quam? Eos, ex!</p>
								<div className="d-flex justify-content-end">
									<button className="btn btn-success">Notify</button>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
