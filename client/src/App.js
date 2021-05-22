import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';

// import pages
import Home from './components/views/Home';
import Header from './components/layout/Header';
import JobForm from './components/views/JobForm';
import FreelancerList from './components/Freelancer-list';
import BrowseGrid from './components/search/BrowseGrid';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer'
import SignUpForm from './components/SignUpForm'
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';

import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect';
import Web3 from 'web3';

import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// import DID instance
import { DID } from 'dids';

// import provider detector
import detectEthereumProvider from '@metamask/detect-provider';

function App(props) {
  const ceramic = props.ceramic;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [did, setDid] = useState('');

  const [ethereum, setEthereum] = useState(null);
  const [web3, setWeb3] = useState(null);

  // checks that Metamask or an ethereum provider is installed
  useEffect(() => {
    const detectProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        // the bare provider in window.ethereum provided by metamask
        setEthereum(provider);
        // the provider object wrapped in a web3 convenience library
        setWeb3(new Web3(provider));
      }
    }
    
    detectProvider();
  }, [setWeb3, setEthereum]);

  // Authenticates DID with a DID provider instance in order to perform writes
  useEffect(() => {
    const authenticateDID = async () => {
      // request authentication from user's blockchain wallet
      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(ethereum, currentAccount);
      await threeIdConnect.connect(authProvider);

      // set DID instance on ceramic client
      const didProvider = threeIdConnect.getDidProvider();

      // not an optimal solution
      try {
        ceramic.did.setProvider(didProvider);
      } catch (error) {
        const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };
        const did = new DID({ resolver });
        ceramic.setDID(did);

        ceramic.did.setProvider(didProvider);
      }
      
      // authenticate the DID (ceramic popup)
      // returns the did
      ceramic.did.authenticate()
        .then(setDid)
        .catch(console.error);
    }

    if (currentAccount) {
      authenticateDID();
    }
  }, [setDid, ceramic, currentAccount, ethereum]);

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard did={did} ceramic={ceramic} />
        </Route>

        <Route path="/freelancerdashboard">
          <Header />
          <FreelancerDashboard />
          <Footer />
        </Route>

        <Route path="/signupinfo">
          <SignUpForm />
        </Route>

        <Route path="/postjob">
          <Header />
          <JobForm />
        </Route>

        {/* render: func - passes route props (match, location, history) to BrowseGrid 
            https://reactrouter.com/core/api/Route/render-func */}
        <Route path="/browse"
          render={(props) => (
            <BrowseGrid {...props} />
          )}
        />

        <Route path="/notify">
          <Header />
          <FreelancerList />
        </Route>

        {/* load home page at root */}
        <Route exact path="/">
          {!did ? <Home web3={web3} ethereum={ethereum} setCurrentAccount={setCurrentAccount} did={did} /> : <Redirect to="/dashboard" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;