import React, { useState } from 'react'
import handleInputChange from '../helper/form';

function SignUpForm(props) {
  const idx = props.idx;
  const [profileData, setProfileData] = useState({name: '', affiliations: '', description: ''});
  
  /**
   * Updates the user_metadata on Auth0 store with the data typed in the signup form. Once data has been
   * successfully stored on Auth0, redirects to the user dashboard.
   * @param {SyntheticEvent} e event object on submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await idx.set('CairosProfile', profileData);
    const record = await idx.get('CairosProfile', idx.id);

    return record;
  }

  const handleChange = (e) => handleInputChange(e, setProfileData);

  return (
    <div className="container justify-content-center d-flex">
      <form className="m-3 p-3 bg-light">
        <h3>Please enter some info to set up your Cairos Profile:</h3>
        <div className="form-group m-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" value={profileData.name} onChange={handleChange}/>
          <small className="form-text text-muted">Please enter your first and last name</small>
        </div>
        <div className="form-group m-3">
          <label htmlFor="affiliations">Organization</label>
          <input type="text" className="form-control" name="affiliations" value={profileData.affiliations} onChange={handleChange}/>
          <small className="form-text text-muted">Enter organization(s) you are affiliated with, comma-separated.</small>
        </div>
        <div className="form-group m-3">
          <label htmlFor="description">Description</label>
          <input type="text" as="textarea" rows={3} className="form-control" name="description" value={profileData.description} onChange={handleChange}/>
          <small className="form-text text-muted">A description of yourself.</small>
        </div>
        <div className="form-group m-3">
          <label htmlFor="gender">Gender</label>
          <select className="form-select" name="gender">
            <option value="" defaultValue></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary m-3" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
