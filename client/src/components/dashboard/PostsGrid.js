import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ActiveJob from './ActiveJob';

export default function PostsGrid() {
  // possibly move this up to parent component, so we only have to do this once
  const { user, isAuthenticated } = useAuth0();
  const [jobs, setJobs] = useState([]);

  // on component mount, send a GET request to endpoint for user Jobs
  // set the received jobs array to component state
  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`http://localhost:4000/dashboard?userID=${user.sub}`)
        .then(res => setJobs(res.data))
        .catch(err => console.error(err));
    }
  });

  return (
    <div className="jumbotron mt-3 p-2">
      <JobsList jobs={jobs} />
    </div>
  );
}

const JobsList = (props) => {
  const jobCards = props.jobs.map((job, index) => (
    <ActiveJob jobDetails={job} key={index} />
  ))

  return <ul>{jobCards}</ul>;
}
