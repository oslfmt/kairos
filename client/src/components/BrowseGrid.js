import React, { Component } from 'react';
import JobDeck from './JobDeck';
import Header from './layout/Header'
import CustomHits from './JobDeck';
import { RefinementList } from 'react-instantsearch-dom';

export default class BrowseGrid extends Component {
	render() {
		return (
			<div>
				<Header />
				<section id="job-grid">
					<div className="container-fluid p-5">
						<div className="row">
							<div className="col-auto">
								<div className="jumbotron p-3">
									<h4 className="lead">Category</h4>
									<RefinementList attribute="skills" />
								</div>
								<div className="jumbotron p-3">
									<h4 className="lead">Price</h4>
									<RefinementList attribute="price" />
								</div>
							</div>
							<div className="col">
								<h3 className="display-5 mb-4">Results</h3>
								<CustomHits hitComponent={JobDeck} />
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}
