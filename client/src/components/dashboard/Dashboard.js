import React, { Component, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Profile from './Profile';
import PostsGrid from './PostsGrid';
import Form from 'react-bootstrap/Form'
import { useAuth0 } from '@auth0/auth0-react';
const axios = require('axios').default;

export default class Dashboard extends Component {
  render() {
    return (
      <Container className="mt-3" fluid>
        <Row>
          <Col sm={4}>
            <Navbar bg="light" variant="dark">
              <Nav.Link>Dashboard</Nav.Link>
              <Nav.Link>Messages</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
            </Navbar>
          </Col>
          <Col sm={7}>
            <Navbar bg="light" variant="dark">
              <Nav.Link>Active Jobs (3)</Nav.Link>
              <Nav.Link>Active Postings (2)</Nav.Link>
              <Nav.Link>Completed Jobs (1)</Nav.Link>
            </Navbar>
          </Col>
          <Col sm={1} className="align-items-center d-flex">
            <Button>Post Job</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Profile />
          </Col>
          <Col sm={8}>
            {/* <PostsGrid /> */}
            <GetStartedForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

/**
 * A form that first time users fill out to get their basic account set up
 * When submit button is clicked:
 * 1. Form disappears
 * 2. All user data is sent and stored on current user Auth0 account object. Probably the user_metadata
 * 3. The new dashboard reflects the new changes
 */
const GetStartedForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState('');
  // const []
  const domain = "collancer-dev.us.auth0.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user create:current_user_metadata",
      })
      .then(accessToken => {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const options = {
          method: 'PATCH',
          url: userDetailsByIdUrl,
          headers: {
            authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json'
          },
          data: {
            user_metadata: {
              "username": "testuser",
              "organization": "organization here",
              "description": "description....",
            }
          }
        }
        
        axios.request(options).then(res => {
          console.log(res.data);
        }).catch(err => {
          console.error(err);
        });
      })
      .catch(error => console.error(error));
    }
  }

  const handleInput = (e) => {
    const userInput = e.target.value;
    console.log(e.target.name);
    
    setUsername(userInput);
  }

  return (
    <Form className="m-3 p-3 bg-light">
      <h3>Please Enter some info to set up your account:</h3>
      <Form.Group>
        <Form.Control type="text" placeholder="Username" value={username} onChange={handleInput}/>
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" placeholder="Organization" />
      </Form.Group>
      <Form.Group>
        <Form.Control as="textarea" rows={3} placeholder="Description" />
      </Form.Group>
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}
