import React, {useState, useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { updateUserMetadata } from '../AuthHelper';

export default function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // effects run after every completed render, but can choose to fire only when certain values have changed
  // ERROR: there is some issue with userMetadata being undefined, on the very first render. After refresh, it works
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "collancer-dev.us.auth0.com";

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

        const userMetadata = await metadataResponse.json();
        setUserMetadata(userMetadata);
      } catch (e) {
        console.error(e);
      }
    };
  
    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [user, getAccessTokenSilently, isAuthenticated]);

  const editProfile = () => {
    // set edit mode to opposite of previous state
    setEditMode(prevState => !prevState);

    // for each input element, toggle the readOnly attribute
    const inputElements = document.getElementsByClassName('form-control');
    for (let elem of inputElements) {
      elem.readOnly = !elem.readOnly;
      if(elem.readOnly === false) {elem.value = elem.placeholder;}
      else{elem.placeholder = elem.value;}
    }
    
    // submit updated data if in edit mode
    if (editMode) {
      updateUserMetadata(user, userMetadata.user_metadata, getAccessTokenSilently);
    }
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserMetadata(prevState => {
      // this is inefficient because it recopies the entire user object on every input change, when
      // we really only need to change the user_metadata
      let newState = { ...prevState };
      newState.user_metadata[name] = value;
      return { ...newState, ...prevState };
    });
  }
  
  return (
    isAuthenticated && (
      <div className="card-prof">
        <div style={{padding: "10px"}} className="bg-white shadow rounded overflow-hidden mt-3 mb-4">
          <div className="px-4 pt-0 pb-4 cover-profile">
            <div className="media align-items-end profile-head-profile">
              <div className="profile mr-3">
                <img className="rounded-circle rounded mb-1 img-thumbnail" style={{height: "auto", width: "auto"}} src={user.picture} alt={user.name}/>
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">{userMetadata ? userMetadata.user_metadata.username : null}</h4>
                <p className="midium mb-4"><i className="fas fa-map-marker-alt mr-2"></i>Truman State University</p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text mt-5">Profile Info</p>
            <form>
              <div className="form-group">
                <input 
                  className="form-control" 
                  name="organization" 
                  onChange={handleInput}
                  placeholder={userMetadata ? userMetadata.user_metadata.organization : null}
                  readOnly />
              </div>
              <div className="form-group">
                <input 
                  className="form-control" 
                  name="description"
                  onChange={handleInput} 
                  placeholder={userMetadata ? userMetadata.user_metadata.description : null}
                  readOnly />
              </div>
            </form>
            {editMode ?
              <button className="btn-success btn-sm" style={{'float': 'right'}} onClick={editProfile}>Save</button>
              : 
              <button className="btn-primary btn-sm" style={{'float': 'right'}} onClick={editProfile}>Edit Profile</button>
            }
          </div>
        </div>
      </div>
    )
  );
}
