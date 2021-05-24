import React, { useState, useEffect } from 'react'
import Profile from './Profile';
import PostsGrid from './PostsGrid';
import { Link } from 'react-router-dom'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { IDX } from '@ceramicstudio/idx';
import SignUpForm from '../SignUpForm';

export default function Dashboard(props) {
  const ceramic = props.ceramic;
  const [activePostings, setActivePostings] = useState([]);

  const [cairosProfile, setCairosProfile] = useState(null);
  const [renderSignup, setRenderSignup] = useState(false);
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

  // Sets and loads the IDX
  useEffect(() => {
    const aliases = {
      CairosProfile: "kjzl6cwe1jw145xzqcqoxzuobn1gqznhdlquy1bbc1qnb0wmd91kzfielmpgzea"
    };
    setIDX(new IDX({ ceramic, aliases }));
  }, [ceramic]);

  // check if index has a CairosProfile record
  useEffect(() => {
    const checkCairosProfile = async () => {
      const hasCairosProfile = await idx.has('CairosProfile', idx.id);

      if (hasCairosProfile) {
        // load profile on page and don't render signup form
        const cairosProfile = await idx.get('CairosProfile', idx.id);
        setCairosProfile(cairosProfile);
      } else {
        // render signup form
        setRenderSignup(true);
      }
    }

    if (idx) {
      checkCairosProfile();
    }
  }, [idx])

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
            {cairosProfile ? <Profile cairosProfile={cairosProfile} setCairosProfile={setCairosProfile} /> : null}
          </div>
          <div className="col-8">
            {cairosProfile ? <PostsGrid activePostings={activePostings} /> : null}
            {renderSignup ? <SignUpForm idx={idx} /> : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
