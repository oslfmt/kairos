import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';

// auth0 import
import { Auth0Provider } from '@auth0/auth0-react';

// ceramic client
import CeramicClient from '@ceramicnetwork/http-client';
// import resolvers
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// import DID instance
import { DID } from 'dids';

const API_URL = 'https://ceramic-clay.3boxlabs.com';
// for now, use local daemon
const ceramic = new CeramicClient('https://localhost:7007');
// resolver registry for all DID methods node will support
const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };
// DID instance wraps the DID resolver
const did = new DID({ resolver });
// set DID on ceramic client so client can use it to resolve DIDs to verify ownership of streams
ceramic.setDID(did);

// Algolia search import
const searchClient = algoliasearch('R9Y9XV4UI3', '0925b07c442589f3802c5b4231d906e9');

// auth0
const domain = 'collancer-dev.us.auth0.com';
const clientID = 'UgcmqYj5BnsCo3gCmcrMli7HX6BM5mNI';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    redirectUri='http://localhost:3000/dashboard'
    audience="https://collancer-dev.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata create:current_user_metadata"
    useRefreshTokens={true}
  >
    <React.StrictMode>
      <InstantSearch searchClient={searchClient} indexName="test_jobs">
        <App ceramic={ceramic} />
      </InstantSearch>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
