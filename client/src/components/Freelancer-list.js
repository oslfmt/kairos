import React, { Component } from 'react'
import Freelancer from './Freelancer';

export default class FreelancerList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			freelancers: []
		};

		this.submitJob = this.submitJob.bind(this);
	}

	render() {
		return (
			<div>
				<section id="freelancers">
					<div className="container">
						<div className="row m-5">
							<div className="col">
								<Freelancer />
								<div className="d-flex justify-content-center">
									<button 
										style={{margin: "20px"}}
										id="submit-job-btn"
										className="btn btn-primary"
									>
										Finish
									</button>
									<button
										style={{margin: "20px"}}
										className="btn btn-outline-secondary btn-lg"
									>
										Show More
									</button>
								</div>
							</div>
						</div>
					</div>
    		</section>
			</div>
		)
	}
}
