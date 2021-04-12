import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// import helper function
import handleInputChange from '../helper/form';

export default function UserIconDropDown() {
  const {user, isAuthenticated } = useAuth0();
  const [createdFreelancerAccount, setCreatedFreelancerAccount] = useState(false);

  return (
    isAuthenticated && (
      <NavDropdown title={<Image src={user.picture} style={{'height': '50px'}} className="mr-3" roundedCircle/>}>
        <NavDropdown.Item>
          <Link to="/dashboard" className="dropdown-item text-center">Profile</Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          {/* user prop currently not used */}
          {createdFreelancerAccount ? 
            <Link to="/freelancerdashboard" className="dropdown-item text-center">Freelancer Dashboard</Link> : 
            <CreateFreelancerModal user={user} setCreatedFreelancerAccount={setCreatedFreelancerAccount} />}
        </NavDropdown.Item>
        <NavDropdown.Item>
          <LogoutButton />
        </NavDropdown.Item>
      </NavDropdown>
    )
  );
}

/**
 * Popup for user to input preliminary info in order to create a freelancer account
 * On submit, sends userinput to mongoDB and creates new user object
 */
function CreateFreelancerModal(props) {
  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [freelancerDetails, setFreelancerDetails] = useState({university: '', studentID: '', major: '', skills: ''});

  const handleClose = () => setShow(false);
  const handleChange = (e) => handleInputChange(e, setFreelancerDetails);

  // validate form
  const validateForm = () => {
    return true;
  }

  const handleSubmit = () => {
    if (validateForm) {
      const options = {
        method: 'POST',
        url: "http://localhost:4000/dashboard",
        data: freelancerDetails
      }
  
      // send post request creating new freelancer account
      axios.request(options)
        .then(res => console.log(res))
        .catch(err => console.error(err));
  
      // redirect to freelancer dashboard
      setRedirect(true);

      // update the dropdown to remove create account option
      props.setCreatedFreelancerAccount(true);
    }
  }

  if (redirect) {
    return <Redirect push to="/freelancerdashboard"/>;
  } else {
    return (
      <>
        <p onClick={() => setShow(true)} className="text-center">Create Freelancer<br></br>Account</p>
  
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Create Freelancer Account</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-group">
                  <label>University</label>
                  <input type="text" className="form-control" name="University" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input type="text" className="form-control" name="StudentID" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Major(s)</label>
                  <input type="text" className="form-control" name="Major" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Skills</label>
                  <input type="text" className="form-control" name="Skills" onChange={handleChange} required />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </form>
        </Modal>
      </>
    );
  }
}