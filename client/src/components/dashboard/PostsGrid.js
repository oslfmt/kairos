import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ActiveJob from './ActiveJob'

export default class PostsGrid extends Component {
  render() {
    return (
      <Jumbotron className="mt-3 p-2">
        <ActiveJob />
        <ActiveJob />
        <ActiveJob />
      </Jumbotron>
    );
  }
}
