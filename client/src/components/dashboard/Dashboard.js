import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Profile from './Profile';
import PostsGrid from './PostsGrid';
import { Link } from 'react-router-dom'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { IDX } from '@ceramicstudio/idx';

export default function Dashboard(props) {
  const ceramic = props.ceramic;
  const [activePostings, setActivePostings] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [idx, setIDX] = useState(null);

  // on component mount, send a GET request to endpoint for user Jobs
  // set the received jobs array to component state
  // useEffect(() => {
  //   axios.get(`http://localhost:4000/dashboard?userID=${user.sub}`)
  //   .then(res => setActivePostings(res.data))
  //   .catch(err => console.error(err));

  //   // cleanup function resets the state
  //   return () => {
  //     setActivePostings([]);
  //   }
  // }, [setActivePostings]);

  useEffect(() => {
    const aliases = {
      CairosProfile: "kjzl6cwe1jw145xzqcqoxzuobn1gqznhdlquy1bbc1qnb0wmd91kzfielmpgzea"
    };

    setIDX(new IDX({ ceramic, aliases }));
  }, [ceramic]);

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

  useEffect(() => {
    const loadIDXstuff = async () => {
      const index = await props.idx.getIndex();
      const did = props.idx.id;
      
      const profile = await props.idx.get('basicProfile', did);
      console.log(profile)
      // for (const alias in index) {
      //   console.log(await props.idx.get(alias, did))
      // }
    }

    loadIDXstuff();
  });

  const setBasicProfile = async () => {
    const basicProfileID = await props.idx.set('basicProfile', {
      name: 'Victor',
      description: 'Hello there',
      gender: 'Male' 
    });

    console.log(basicProfileID)
  }
  
  return (
    <div>
      <Header authenticated={props.did} />
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
            <button className="btn" onClick={setBasicProfile}>Set Basic Profile</button>
          </div>
          <div className="col-8">
            <PostsGrid activePostings={activePostings} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
