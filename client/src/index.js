import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// auth0 import
import { Auth0Provider } from '@auth0/auth0-react';
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Algolia search import
const searchClient = algoliasearch('R9Y9XV4UI3', '0925b07c442589f3802c5b4231d906e9');

// Stripe payments
const stripePromise = loadStripe("pk_test_51ILBPtFOjo9Of2cpevI1Pt0biIXFUboC9Q0DuIdoraxtA6lOp6vtdggV60B36tDMrQZi6aB4devchpwT1kzRb9w200XMQ9Q1iS");

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
      <React.StrictMode>
        <InstantSearch searchClient={searchClient} indexName="test_jobs">
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </InstantSearch>
      </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
