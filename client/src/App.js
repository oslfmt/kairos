import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';

// import pages
import Home from './views/Home';
import Header from './components/layout/Header';
import JobForm from './views/JobForm';
import BrowseGrid from './components/search/BrowseGrid';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer'
import SignUpForm from './components/SignUpForm'
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';

import CeramicClient from '@ceramicnetwork/http-client';
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect';
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids';

function App(props) {
  const ethereum = props.ethereum;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [did, setDid] = useState('');
  const [ceramic, setCeramic] = useState(null);

  // set ceramic
  useEffect(() => {
    const API_URL = 'https://ceramic-clay.3boxlabs.com';
    const ceramic = new CeramicClient(API_URL);
    const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };
    const did = new DID({ resolver });
    ceramic.setDID(did);
    setCeramic(ceramic);
  }, [setCeramic]);

  useEffect(() => {
    const authenticateDID = async () => {
      // request authentication from user's blockchain wallet
      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(ethereum, currentAccount);
      await threeIdConnect.connect(authProvider);

      // set DID instance on ceramic client
      const didProvider = threeIdConnect.getDidProvider();
      ceramic.did.setProvider(didProvider);
      
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
          <JobForm ceramic={ceramic} {...props} />
        </Route>

        {/* render: func - passes route props (match, location, history) to BrowseGrid 
            https://reactrouter.com/core/api/Route/render-func */}
        <Route path="/browse"
          render={(props) => (
            <BrowseGrid {...props} />
          )}
        />

        <Route exact path="/">
          <Home {...props} setCurrentAccount={setCurrentAccount} did={did} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;