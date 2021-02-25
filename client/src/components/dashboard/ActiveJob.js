import React, { Component } from 'react';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'

export default class ActiveJob extends Component {
  render() {
    return (
      <Card className="shadow m-3">
        <Card.Header>JOB TITLE</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={8}>
              <Card.Text>
                Description text goes here.........
              </Card.Text>
            </Col>
            <Col sm={4} className="flex-column d-flex">
              <div>
                <p>Freelancer Name</p>
              </div>
              <Button className="mb-2">Chat</Button>
              <Button>Pay to Escrow</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}