import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import helper function
import handleInputChange from '../helper/form';

export default function UserIconDropDown() {
  const {user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <NavDropdown title={<Image src={user.picture} style={{'height': '50px'}} className="mr-3" roundedCircle/>}>
        <NavDropdown.Item>
          <Link to="/dashboard" className="dropdown-item text-center">Profile</Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <CreateFreelancerModal />
        </NavDropdown.Item>
        <NavDropdown.Item>
          <LogoutButton />
        </NavDropdown.Item>
      </NavDropdown>
    )
  );
}

function CreateFreelancerModal() {
  const [show, setShow] = useState(false);
  const [freelancerDetails, setFreelancerDetails] = useState({University: '', StudentID: '', Major: '', Skills: ''});

  const handleSubmit = () => {
    const options = {
      method: 'PATCH',

    }
    axios.request(options)
      .then(res => console.log(res));
  }

  const handleChange = (e) => handleInputChange(e, setFreelancerDetails);

  return (
    <>
      <p onClick={() => setShow(true)}>Create Freelancer<br></br>Account</p>

      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Create Freelancer Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateFreelancerForm handler={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Continue
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

function CreateFreelancerForm(props) {
  const handleInputChange = props.handler;

  return (
    <form>
      <div className="form-group">
        <label>University</label>
        <input className="form-control" name="University" onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Student ID</label>
        <input className="form-control" name="StudentID" onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Major(s)</label>
        <input className="form-control" name="Major" onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Skills</label>
        <input className="form-control" name="Skills" onChange={handleInputChange} />
      </div>
    </form>
  );
}