import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		return (
			<div>
				<footer>
					<div className="container-fluid p-4 bg-dark">
						<div className="row align-items-center text-center justify-content-around text-light">
							<div className="col-md-4">
								<h4>Collancer Ltd</h4>
							</div>
							<div className="col-md-4">
								<p>About</p>
								<p>Help</p>
							</div>
							<div className="col-md-4">
								<p>[Icons]</p>
							</div>
						</div>
					</div>
    		</footer>
			</div>
		)
	}
}
