import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ActiveJob from './ActiveJob';

export default function PostsGrid(props) {
  const activePostings = props.activePostings;

  return (
    <div className="jumbotron mt-3 p-2">
      <PostsList activePostings={activePostings} />
    </div>
  );
  /* This is the number of posted jobs*/
}

const PostsList = (props) => {
  const postCards = props.activePostings.map((post, index) => (
    <ActiveJob postDetails={post} key={index} />
  ))

  return <ul>{postCards}</ul>;
}
