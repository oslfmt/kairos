import React, { Component } from 'react';
import Job from './Job';

export default class BrowseGrid extends Component {
	constructor(props) {
		super(props);

		this.setState({
			jobs: []
		});
	}

	jobList() {
		
	}

	render() {
		return (
			<section id="job-grid">
				<div className="container-md mt-5 mb-5">
						<div className="row">
							<h3 className="display-5">Top Services</h3>
						</div>
						<div className="row">
							{this.jobList()}
						</div>

						<div className="row mt-5">
								<h3 className="display-5">Services</h3>
						</div>
						<div className="row">
							<Job />
							<Job />
							<Job />
						</div>
				</div>
			</section>
		)
	}
}
