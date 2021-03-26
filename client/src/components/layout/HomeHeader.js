import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from 'react-bootstrap/Navbar'
import UserIconDropDown from '../UserIconDropDown';

const HomeHeader = () => {
  return (
    <Navbar bg="light" className="justify-content-end p-4">
      <Nav>
        <Nav.Item>
          <Nav.Link>How It Works</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Advantages</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <SignUpButton />
        </Nav.Item>
        <Nav.Item>
          <LoginButton />
        </Nav.Item>
        <Nav.Item>
          <UserIconDropDown />
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Nav.Link onClick={() => loginWithRedirect()}>
        Log in
      </Nav.Link>
    )
  );
}

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const signUp = () => {
    loginWithRedirect({screen_hint: 'signup'});
  }

  return (
    !isAuthenticated && (
      <Nav.Link onClick={() => signUp()}>
        Sign Up
      </Nav.Link>
    )
  );
}

export {
  HomeHeader,
  SignUpButton,
  LoginButton,
};