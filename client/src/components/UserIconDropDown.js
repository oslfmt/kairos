import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from './LogoutButton';
// import ProfileImg from './UserProfileInfo/profile-img';

const UserIconDropDown = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="collapse navbar-collapse" id="navbar-list-4">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a href='/#' className="nav-link" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {/* <ProfileImg /> */}
            </a>
            <div style={{left: "-80px"}} className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item text-center" href="/dashboard">Profile</a>
              <LogoutButton />
            </div>
          </li>   
        </ul>
      </div>
    )
  )
}

export default UserIconDropDown