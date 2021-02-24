import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <a href="/#" className="dropdown-item text-center" onClick={() => logout()}>
        Log Out
      </a>
    )
  )
}

export default LogoutButton
