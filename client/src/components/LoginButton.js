import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Link className="nav-link">
      <a href="/#" onClick={() => loginWithPopup()}>
        Log In
      </a>
      </Link>
    )
  )
}

export default LoginButton