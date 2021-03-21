import React, {useState, useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';

export default function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = "collancer-dev.us.auth0.com";

  // effects run after every completed render, but can choose to fire only when certain values have changed
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_metadata = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.error(e);
      }
    };
  
    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [user]);
  
  return (
    isAuthenticated && (
      <Card className="bg-white shadow rounded overflow-hidden mt-3 mb-4">
        <div className="px-4 pt-0 pb-4 cover-profile">
          <div className="media align-items-end profile-head-profile">
            <div className="profile mr-3">
              <img className="rounded-circle rounded mb-1 img-thumbnail" style={{height: "auto", width: "auto"}} src={user.picture} alt={user.name}/>
            </div>
            <div className="media-body mb-5 text-white">
              <h4 className="mt-0 mb-0">{user.nickname}</h4>
              <p className="midium mb-4"><i className="fas fa-map-marker-alt mr-2"></i>Truman State University</p>
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Text className="mt-5">
            Profile Info
            <InputGroup>
              <FormControl
                placeholder={userMetadata ? userMetadata.app_metadata.roles[0] : null}
                readOnly
              />
            </InputGroup>
            Client Reputation: 100pts
            Jobs Completed: 5
            Date Joined: Feb 10 2021
          </Card.Text>
          <Button className="btn btn-sm" style={{'float': 'right'}}>Edit Profile</Button>
        </Card.Body>
      </Card>
    )
  );
}
