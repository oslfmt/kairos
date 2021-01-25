import axios from 'axios';
import React, { Component } from 'react';
import JobDeck from './JobDeck';
import Header from './layout/Header'
import CustomHits from './JobDeck';

export default class BrowseGrid extends Component {
	render() {
		return (
			<div>
				<Header />
				<section id="job-grid">
					<div className="container-md mt-5 mb-5">
						<div className="row">
							<h3 className="display-5">Results</h3>
						</div>
						<div className="row">
							<CustomHits hitComponent={JobDeck} />
						</div>
					</div>
				</section>
			</div>
		)
	}
}
