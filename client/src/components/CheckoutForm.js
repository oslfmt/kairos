import React, {useEffect} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  let clientSecret;

  useEffect(() => {
    axios.get('http://localhost:4000/secret')
    .then(res => {
      clientSecret = res.data.client_secret;
    })
    .catch(err => console.error('Error on paymentIntent request ', err));
  });

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Kory Anders',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log('Payment success!')
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button className="btn btn-success" disabled={!stripe}>Confirm order</button>
      </form>
    </div>
  );
}
