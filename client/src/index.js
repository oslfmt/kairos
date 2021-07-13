import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import Web3 from 'web3';
import { Escrow } from './models/Escrow';
// Algolia search import
const searchClient = algoliasearch('R9Y9XV4UI3', '0925b07c442589f3802c5b4231d906e9');

// set the ethereum, web3 objects; create an instance of Escrow wrapper class for contract
const ethereum = window.ethereum;
const web3 = new Web3(ethereum);
const escrowInstance = new Escrow(web3);

ReactDOM.render(
  <React.StrictMode>
    <InstantSearch searchClient={searchClient} indexName="test_jobs">
      <App ethereum={ethereum} web3={web3} escrowInstance={escrowInstance} />
    </InstantSearch>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
