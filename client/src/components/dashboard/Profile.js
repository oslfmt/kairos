import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Card className="bg-white shadow rounded overflow-hidden mt-3">
        <div className="px-4 pt-0 pb-4 cover-profile">
          <div className="media align-items-end profile-head-profile">
            <div className="profile mr-3">
              <img className="rounded-circle rounded mb-1 img-thumbnail" style={{height: "auto", width: "auto"}} src={user.picture} alt={user.name}/>
            </div>
            <div className="media-body mb-5 text-white">
              <h4 className="mt-0 mb-0">{user.name}</h4>
              <p className="midium mb-4"><i className="fas fa-map-marker-alt mr-2"></i>Truman State University</p>
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Text style={{marginTop: "50px"}} className="px-4 py-3">
            <h5 className="mb-0">Profile Info</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">{user.discription}</p>
            </div>
          </Card.Text>
          <Card.Text style={{marginTop: "50px"}} className="px-4 py-3">
            <h5 className="mb-0">Profile Info</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">{user.discription}</p>
            </div>
          </Card.Text>
          <Card.Text style={{marginTop: "50px"}} className="px-4 py-3">
            <h5 className="mb-0">Profile Info</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">{user.discription}</p>
            </div>
          </Card.Text>
          <Button className="btn btn-sm">Edit Profile</Button>
        </Card.Body>
      </Card>
    )
  );
}
