import React, { Component } from 'react';

/**
 * This component renders a Modal that displays the job details of the job card that was clicked
 * 
 * @prop jobDetails - the data pertaining to the particular Job card
 * @prop toggle - handler function that toggles display of modal
 */
export default class Modal extends Component {
  render() {
    const jobDetails = this.props.jobDetails;
    return (
      <div>
        {jobDetails.title}
        <button onClick={this.props.toggle}>Close</button>
      </div>
    );
  }
}



