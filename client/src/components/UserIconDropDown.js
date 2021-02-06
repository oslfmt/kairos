import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from './LogoutButton';
import ProfileImg from './UserProfileInfo/profile-img';

const UserIconDropDown = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div class="collapse navbar-collapse" id="navbar-list-4">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a href='/#' class="nav-link" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <ProfileImg />
            </a>
            <div style={{left: "-80px"}} class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item text-center" href="/profile">Profile</a>
              <LogoutButton />
            </div>
          </li>   
        </ul>
      </div>
    )
  )
}

export default UserIconDropDown