import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const ProfileImg = () => {
	const { user, isAuthenticated } = useAuth0();
  
	return (
	  isAuthenticated && ( 
		<img class="rounded-circle rounded mb-1 img-thumbnail" style={{height: "auto", width: "auto"}} src={user.picture} alt={user.name}/>
	  )
	)
  }

  const ProfileName = () => {
	const { user, isAuthenticated } = useAuth0();
  
	return (
	  isAuthenticated && ( 
		<h4 class="mt-0 mb-0">{user.name}</h4>
	  )
	)
  }

  const ProfileInfo = () => {
	const { user, isAuthenticated } = useAuth0();
	console.log(user);
	return (
	  isAuthenticated && ( 
		<div class="p-4 rounded shadow-sm bg-light">
			<p class="font-italic mb-0">{user.discription}</p>
		</div>
		
	  )
	)
  }

export default class Profile extends Component {
	render() {
		return (
				<div class="row py-5 px-4">
					<div class="col-md-3 mx-auto">
						<div class="bg-white shadow rounded overflow-hidden">
							<div class="px-4 pt-0 pb-4 cover-profile">
								<div class="media align-items-end profile-head-profile">
									<div class="profile mr-3"><ProfileImg /><a href="#/" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a></div>
									<div class="media-body mb-5 text-white">
										<ProfileName />
										<p class="midium mb-4"> <i class="fas fa-map-marker-alt mr-2"></i>Truman State University</p>
									</div>
								</div>
							</div>

							<div style={{marginTop: "50px"}} class="px-4 py-3">
								<h5 class="mb-0">Profile Info</h5>
								<ProfileInfo />
							</div>
							<div class="py-4 px-4">
								<div class="d-flex align-items-center justify-content-between mb-3">
									<h5 class="mb-0">Other Stuff</h5><a href="#/" class="btn btn-link text-muted">Show all</a>
								</div>
								<div class="row">
									<div class="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"></img></div>
									<div class="col-lg-6 mb-2 pl-lg-1"><img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"></img></div>
									<div class="col-lg-6 pr-lg-1 mb-2"><img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" class="img-fluid rounded shadow-sm"></img></div>
									<div class="col-lg-6 pl-lg-1"><img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"></img></div>
								</div>
							</div>
							<div style={{margin: "20px"}} class="row">
							<div class="col-4">
							<button type="button" class="btn btn-secondary">Dashboard</button>
							</div>
							<div class="col-4">
							<button type="button" class="btn btn-secondary">Messages</button>
							</div>
							<div class="col-4">
							<button type="button" class="btn btn-secondary">Settings</button>
							</div>
						</div>
						</div>
					</div>
					

					<div class="col-md-9 mx-auto">
						<div class="bg-white shadow rounded overflow-hidden">
							<div class="px-4 py-3">
								<h5 class="mb-0">Active Jobs (3)</h5>
								<div class="p-4 rounded shadow-sm bg-light">
									<div class="row py-5 px-4">
										<div class="col-md-4 mx-auto">
											<p class="font-italic mb-0">Web Developer</p>
										</div>
										<div class="col-md-4 mx-auto">
										<img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"></img>
										</div>
									</div>
									<div class="row py-5 px-4">
										<div class="col-md-4 mx-auto">
											<p class="font-italic mb-0">Web Developer</p>
										</div>
										<div class="col-md-4 mx-auto">
										<img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}
