import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Profile from './Profile';
import PostsGrid from './PostsGrid';

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
            <PostsGrid />
          </Col>
        </Row>
      </Container>
    );
  }
}
