import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../../img/profilepic.jpg';

export default class Profile extends Component {
	render() {
		return (
			<div>
				<section id="profile">
					<div className="container-fluid">
						<div className="row m-5">
							<div className="col-4">
								<div className="card">
									<div className="card-body text-center">
										<img src={profilePic} className="img-fluid" alt="profile pic"></img>
										<form className="mt-4 text-left text-white" action="">
											<div className="form-group">
												<label htmlFor="university">University</label>
												<input type="text" className="form-control"></input>
											</div>
											<div className="form-group">
												<label htmlFor="major">Major</label>
												<input type="text" className="form-control"></input>
											</div>
											<div className="form-group">
												<label htmlFor="skills">Top Skills</label>
												<input type="text" className="form-control"></input>
											</div>
											<div className="d-flex justify-content-end">
												<button className="btn btn-secondary btn-sm">edit</button>
											</div>
										</form>
										<p className="text-left text-white">Date Joined</p>
										<p className="text-left">mm/dd/yyyy</p>
									</div>
								</div>
						</div>
						<div className="col-8">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Description</h4>
									<div className="input-group">
										<textarea cols="20" rows="9" className="form-control"></textarea>
									</div>
									<div className="d-flex justify-content-end">
										<button className="edit-btn btn btn-success btn-sm">edit</button>
									</div>
								</div>
							</div>
							<div style={{marginBottom: '1.5rem'}} className="card">
								<div className="card-body">
									<h4 className="card-title">Skills</h4>
									<div className="input-group">
										<textarea cols="20" rows="9" className="form-control"></textarea>
									</div>
									<div className="d-flex justify-content-end">
										<button className="edit-btn btn btn-success btn-sm">edit</button>
									</div>
								</div>
							</div>
								<div className="d-flex justify-content-end">
									<button className="btn btn-secondary" disabled>Active Jobs</button>
										<Link className="btn btn-primary" to="/postjob">Post a Gig</Link>
								</div>
							</div>
						</div>
					</div>
    		</section>
			</div>
		)
	}
}
