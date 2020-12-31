import axios from 'axios';
import React, { Component } from 'react';
import JobDeck from './JobDeck';

export default class BrowseGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:4000/browse')
			.then(res => {
				this.setState({
					jobs: res.data
				});
			})
			.catch(err => console.error(err));
	}

	render() {
		return (
			<section id="job-grid">
				<div className="container-md mt-5 mb-5">
						<div className="row">
							<h3 className="display-5">Top Services</h3>
						</div>
						<div className="row">
							<JobDeck jobs={this.state.jobs} />
						</div>

						<div className="row mt-5">
								<h3 className="display-5">Services</h3>
						</div>
						<div className="row">
							<JobDeck jobs={this.state.jobs} />
						</div>
				</div>
			</section>
		)
	}
}
