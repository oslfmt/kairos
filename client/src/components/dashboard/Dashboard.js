import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ActiveJob from './ActiveJob';
import Profile from './Profile';
import PostsGrid from './PostsGrid';

export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Navbar bg="primary" variant="light">
              <Nav.Link>Dashboard</Nav.Link>
              <Nav.Link>Messages</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
            </Navbar>
          </Col>
          <Col sm={8}>
            <Navbar bg="primary" variant="dark">
              <Nav.Link>Active Jobs</Nav.Link>
            </Navbar>
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
    )
  }
}
