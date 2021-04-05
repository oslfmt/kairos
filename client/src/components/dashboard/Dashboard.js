import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { getUserMetadata } from '../../helper/auth';
import axios from 'axios';
import Profile from './Profile';
import PostsGrid from './PostsGrid';
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [activePostings, setActivePostings] = useState([]);
  const [profileData, setProfileData] = useState(null);

  // effects run after every completed render, but can choose to fire only when certain values have changed
  // ERROR: there is some issue with userMetadata being undefined, on the very first render. After refresh, it works
  // The reason is probably it takes some time to update, so we need to wait until it is updated, before running
  // this effect immediately
  useEffect(() => {
    if (isAuthenticated) {
      getUserMetadata(user, getAccessTokenSilently, setProfileData);
    }
  }, [setProfileData, isAuthenticated]);

  // on component mount, send a GET request to endpoint for user Jobs
  // set the received jobs array to component state
  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`http://localhost:4000/dashboard?userID=${user.sub}`)
        .then(res => setActivePostings(res.data))
        .catch(err => console.error(err));
    }

    // cleanup function resets the state
    return () => {
      setActivePostings([]);
    }
  }, [setActivePostings, isAuthenticated]);

  const renderPostGrid = (e) => {
    switch (e.target.name) {
      case 'active-jobs':
        console.log('active');
        break;
      case 'active-postings':
        console.log('active-postings');
        break;
      case 'completed-jobs':
        console.log('completed');
        break;
      default:
        console.log('active');
    }
  }
  
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-4">
          <div className="navbar bg-light">
            <div className="nav-item">
            <button className="btn" type="button">Dashboard</button>
            </div>
            <div className="nav-item">
            <button className="btn" type="button">Messages</button>
            </div>
            <div className="nav-item">
            <button className="btn" type="button">Settings</button>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="navbar bg-light">
            <div className="nav-item">
              {/* they should be buttons which have onClick event, which then changes the state of PostsGrid accordingly */}
              <button className="btn" type="button" name="active-jobs" onClick={renderPostGrid}>Active Jobs</button>
            </div>
            <div className="nav-item">
              <button className="btn" type="button" name="active-postings" onClick={renderPostGrid}>Active Postings ({activePostings.length})</button>
            </div>
            <div className="nav-item">
            <button className="btn" type="button" name="completed-jobs" onClick={renderPostGrid}>Completed Jobs</button>
            </div>
          </div>
        </div>
        <div className="col-1 align-items-center d-flex">
          <Link type="button" to="/postjob" className="btn btn-primary">Post Job</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Profile userMetadata={profileData} setUserMetadata={setProfileData} />
        </div>
        <div className="col-8">
          <PostsGrid activePostings={activePostings} />
        </div>
      </div>
    </div>
  );
}
