import React, { Component } from 'react'
import Profile from './Profile';
import PostsGrid from './PostsGrid';
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-4">
            <div className="navbar bg-light">
              <div className="nav-item">
                <Link to="">Dashboard</Link>
              </div>
              <div className="nav-item">
                <Link to="">Messages</Link>
              </div>
              <div className="nav-item">
                <Link to="">Settings</Link>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="navbar bg-light">
              <div className="nav-item">
                <Link to="">Active Jobs (3)</Link>
              </div>
              <div className="nav-item activePostings">            
                <Link to="">Active Postings 0</Link>
              </div>
              <div className="nav-item">
                <Link to="">Completed Jobs (1)</Link>
              </div>
            </div>
          </div>
          <div className="col-1 align-items-center d-flex">
            <Link type="button" to="/postjob" className="btn btn-primary">Post Job</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Profile />
          </div>
          <div className="col-8">
            <PostsGrid />
          </div>
        </div>
      </div>
    );
  }
}
