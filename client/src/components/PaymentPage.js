import React, { Component } from 'react';
import axios from 'axios';

export default class PaymentPage extends Component {
  componentDidMount() {
    axios.get('http://localhost:4000/secret')
      .then(res => {
        let clientSecret = res.data.client_secret;
        console.log(clientSecret);
        // call stripe.confirmCardPayment() with client_secret and card details
        
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Enter Payment Details</h1>
      </div>
    )
  }
}
