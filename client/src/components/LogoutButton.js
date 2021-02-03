import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <a class="dropdown-item text-center" href="" onClick={() => logout()}>
        Log Out
      </a>
    )
  )
}

export default LogoutButton
