import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [edit, setEdit] = useState(false);

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
            <h5 className="mb-2">Profile Info</h5>
            <InputGroup>
              <FormControl
                placeholder={user.description}
                className="weird"
                readOnly
              />
            </InputGroup>
            <div className="add-info pt-4">
              <p>Client Reputation: 100pts</p>
              <p>Jobs Completed: 5</p>
              <p>Date Joined: Feb 10 2021</p>
            </div>
          </Card.Text>
          <Button className="btn btn-sm" style={{'float': 'right'}} onClick={() => setEdit(!edit)}>Edit Profile</Button>
        </Card.Body>
      </Card>
    )
  );
}
