import React, { Component } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import { Redirect } from 'react-router-dom';

/**
 * This component renders the appropriate SearchBox based on if the 'browse' prop is true. If true, a 'BrowseSearchBox'
 * is rendered. This SearchBox contains a defaultRefinement that is the redirected query. Any input changes and submits are
 * handled by InstantSearch.js
 * 
 * If false, a 'regular SearchBox' is rendered, which is a generic search box that appears on any other page except for
 * '/browse'. This SearchBox has handler functions that handle onChange and onSubmit events. When submitted, the app
 * redirects to 'browse'.
 * 
 * The reason this distinction between SearchBoxes is necessary is because if a submit event occurs on the 'Browse' page and
 * we are using a generic SearchBox, this will redirect back to '/browse', which rerenders the Header & SearchBox, causing
 * circular logic.
 * 
 * @props query - only used in BrowseSearchBox; contains user query from redirected page
 * @props browse - indicates which SearchBox to load
 * 
 * @state query - holds the user query; only used in generic SearchBox
 * @state submit - if true, triggers a redirect to '/browse' page, passing the user query in the location prop
 * 
 * @child SearchBox - InstantSearch.js component that handles all search queries
 * @child Redirect - react-router-dom component that automatically redirects to a different page
 * 									 https://reactrouter.com/web/api/Redirect
 */
export default class CustomSearchBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			submit: false,
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Sets state of query field to the user input typed in search box
	 * @param {the event object} e 
	 */
	handleInputChange(e) {
		this.setState({
			query: e.target.value
		});
	}

	/**
	 * Sets 'submit' in state object to true, thus triggering a redirect
	 * @param {event object} e 
	 */
	handleSubmit(e) {
		e.preventDefault();
		
		this.setState({
			submit: true
		});
	}

	render() {
		// store state fields
		const {query, submit} = this.state;

		// render appropriate SearchBox based on browse prop (which tells us if we are on browse page or not)
		return (
			<div>
				{this.props.browse ? 
					<SearchBox
						searchAsYouType={false} 
						// sets immediate search to the search query upon mounting
						defaultRefinement={this.props.query} 
					/> :
					<SearchBox
						onChange={this.handleInputChange}
						onSubmit={this.handleSubmit}
					/>
				}

				{/* If submit is true, redirect to browse page passing user query in state field*/}
				{submit ? 
					<Redirect
						push 
						to={{
								pathname:"/browse",
								state: { query: query }
								}}
					/> : 
					null
				}
			</div>
		);
	}
}
