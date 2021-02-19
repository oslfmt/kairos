import React, { Component } from 'react';
import JobDeck from '../Job/JobDeck';
import Header from '../layout/Header';
import CustomHits from '../Job/JobDeck';
import { RefinementList } from 'react-instantsearch-dom';

/**
 * Renders the UI for the 'BROWSE' page, the primary place where searching is done. Contains a custom Header component
 * which contains the user search query (if redirected from another page).
 * 
 * Currently, component only utilizes location prop
 * @props match - from render func: react-router-dom
 * @props location - from render func: react-router-dom. Contains 'state' field which is used to retrieve search query
 * @props history - from render func: react-router-dom
 * https://reactrouter.com/core/api/match
 * 
 * @child Header - special Browse header which contains search query from redirected pages
 * @child RefinementList - InstantSearchJS component that filters results
 * @child CustomHits - customized component that renders a deck of 'Job' components based on hits retrieved
 */
export default class BrowseGrid extends Component {
	render() {
		// from location prop; state property contains search query if redirected from another page
		// state property is undefined otherwise
		const state = this.props.location.state;

		return (
			<div>
				{/* Header component:
						query - the user search query; checks if state is undefined, if so, return undefined
						browse - indicates if this header is on the 'BrowseGrid'
				 */}
				<Header 
					query={state?.query}
					browse={true}
				/>
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
								<div className="jumbotron p-3">
									<h4 className="lead">Payments Accepted</h4>
									<RefinementList attribute="paymentForms" />
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
		);
	}
}
