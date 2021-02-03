import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && ( 
      <img style={{borderRadius: "50%", blockSize: "50px"}} src={user.picture} alt={user.name}/>
    )
  )
}

export default Profile
