import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import { updateUserMetadata } from '../helper/auth';
import handleInputChange from '../helper/form';
import axios from 'axios';

/**
 * A form that first time users fill out to get their basic account set up
 * When submit button is clicked:
 * 1. Form disappears
 * 2. All user data is sent and stored on current user Auth0 account object. Probably the user_metadata
 * 3. The new dashboard reflects the new changes
 */
const SignUpForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [redirect, setRedirect] = useState(false);
  const [profileData, setProfileData] = useState({username: '', organization: '', description: ''});
  
  /**
   * Updates the user_metadata on Auth0 store with the data typed in the signup form. Once data has been
   * successfully stored on Auth0, redirects to the user dashboard.
   * @param {SyntheticEvent} e event object on submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      // create a new user document on database
      const options = {
        method: 'POST',
        url: 'http://localhost:4000/signupform',
        data: {
          userID: user.sub,
          clientDetails: profileData,
        }
      };

      axios.request(options)
        .then(res => console.log(res))

      updateUserMetadata(user, profileData, getAccessTokenSilently)
        .then(setRedirect(true))
    }
  }

  const handleChange = (e) => handleInputChange(e, setProfileData);

  if (redirect) {
    // ERROR: need to fix stack trace so when user clicks back, redirects to home page
    return <Redirect to="/dashboard"/>;
  } else {
    return (
      <div className="container justify-content-center d-flex mt-5">
        <form className="m-3 p-3 bg-light" style={{'width': '500px'}}>
          <h3>Please enter some info to set up your account:</h3>
          <div class="form-group">
            <label for="username">Name</label>
            <input type="text" class="form-control" name="username" value={profileData.username} onChange={handleChange}/>
            <small class="form-text text-muted">Please enter your first and last name</small>
          </div>
          <div class="form-group">
            <label for="organization">Organization</label>
            <input type="text" class="form-control" name="organization" value={profileData.organization} onChange={handleChange}/>
            <small class="form-text text-muted">Enter the university you attend, or an organization you are affiliated with.</small>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" as="textarea" rows={3} class="form-control" name="description" value={profileData.description} onChange={handleChange}/>
            <small class="form-text text-muted">A brief description of what you plan to use the site for.</small>
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
