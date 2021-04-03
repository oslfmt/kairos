import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

export default function UserIconDropDown() {
  const {user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <NavDropdown title={<Image src={user.picture} style={{'height': '50px'}} className="mr-3" roundedCircle/>}>
        <NavDropdown.Item>
          <Link to="/dashboard" className="dropdown-item text-center">Profile</Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link to="/createfreelancer" className="dropdown-item text-center">Create Freelancer<br></br>Account</Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <LogoutButton />
        </NavDropdown.Item>
      </NavDropdown>
    )
  );
}