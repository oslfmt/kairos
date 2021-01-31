import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SearchBox } from 'react-instantsearch-dom';

export default class Header extends Component {
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

	handleSubmit(e) {
		e.preventDefault();
		
		this.setState({
			submit: true
		});
	}

	render() {
		// store state in variables
		const {query, submit} = this.state;

		return (
			<div className="container-fluid p-3 bg-light">
				<div className="row justify-content-start align-items-center">
					<div className="col-xl-2 justify-content-center d-flex ml-3 mr-3">
						<h1 className="display-4">
							<Link to="/">Collancer</Link>
						</h1>
					</div>
					<div className="col-3">
						<SearchBox
							searchAsYouType={false} 
							defaultRefinement={this.props.query} 
							onChange={this.handleInputChange}
							onSubmit={this.handleSubmit}
						/>
					</div>
					<div className="col-4">
						<button className="btn btn-primary" onClick={this.handleSubmit}>Go</button>
					</div>
				</div>
				<div className="row text-center">
					<div className="col-xl-1">
							<Link to="">Design</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Programming</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Tutoring</Link>
					</div>
					<div className="col-xl-1">
							<Link to="">Writing</Link>
					</div>
				</div>

				{/* if submit is 'true', redirect to browse page */}
				{submit ? <Redirect push 
										to={{
											pathname:"/browse",
											state: { query: query }
										}}
									/> : null}
      </div>
		);
	}
}
