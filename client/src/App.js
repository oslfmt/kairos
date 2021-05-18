import React, { Component, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import css file
import './css/main.css';

// import pages
import Home from './components/views/Home';
import Header from './components/layout/Header';
import JobForm from './components/views/JobForm';
import FreelancerList from './components/Freelancer-list';
import BrowseGrid from './components/search/BrowseGrid';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer'
import { HomeHeader } from './components/layout/HomeHeader'
import SignUpForm from './components/SignUpForm'
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';

// import CERAMIC & IDX
import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx'

// import resolvers
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

// import DID instance
import { DID } from 'dids';

// import DID provider
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect';

function App() {
  const [ceramic, setCeramic] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);



  useEffect(() => {
    const configureDID = async () => {
      // create an instance of a ceramic client, allowing interaction with a remote ceramic node over HTTP
      const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com');

      // resolver registry for all DID methods node will support
      const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };
      // DID instance wraps the DID resolver
      const did = new DID({ resolver });
      // set DID on ceramic client so client can use it to resolve DIDs to verify ownership of streams
      ceramic.setDID(did);

      setCeramic(ceramic);
    }

    configureDID();
  }, [setCeramic]);

  // useEffect(() => {
  //   const setupDID = async () => {
  //     // request user's blockchain address
  //     // NEED TO CHECK IF THERE IS AN INSTANCE
  //     const addresses = await window.ethereum.enable();

  //     // request authentication from user's blockchain wallet
  //     const threeIdConnect = new ThreeIdConnect();
  //     const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
  //     await threeIdConnect.connect(authProvider);

  //     // create provider instance
  //     const provider = await threeIdConnect.getDidProvider();
  //     // set DID instance on ceramic client
  //     ceramic.did.setProvider(provider);
      
  //     // authenticate the DID
  //     await ceramic.did.authenticate();
  //   }

  //   setupDID();
  // }, [setCeramic]);

  useEffect(() => {
    const setIDX = async () => {
      const aliases = {
        clientProfile: 'definitionID 1',
        freelancerProfile: 'definitionID 2',
      }
  
      const idx = new IDX({ ceramic, aliases });
  
      setAuthenticated(idx.authenticated);
    }

    if (ceramic) {
      setIDX();
    }
  });

  const auth = {
    ceramic,
    authenticated
  };

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Header {...auth} />
          <Dashboard />
          <Footer />
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
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
