import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const SignUpButton = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Link className="nav-link">
      <a onClick={() => loginWithPopup({ screen_hint: 'signup' })}>
        Sign Up
      </a>
      </Link>
    )
  )
}

export default SignUpButton