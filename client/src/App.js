import React, { Component, useEffect } from 'react';
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
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'

// import resolvers
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

// import DID instance
import { DID } from 'dids';

// import provider
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect';

function App() {
  // create an instance of a ceramic client
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com');

  // resolver registry for all DID methods node will support
  const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };

  // DID instance wraps the DID resolver
  // const did = new DID({ resolver });

  // set DID on ceramic client so client can use it to resolve DIDs to verify ownership of streams
  // ceramic.setDID(did);

  const aliases = {
    alias1: 'definitionID 1',
    alias2: 'definitionID 2',
  }
  const idx = new IDX({ ceramic, aliases });

  // authenticate the DID to perform writes with client; DID must have DID provider instance
  useEffect(() => {
    const getAddress = async () => {
      const addresses = await window.ethereum.enable();

      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
      await threeIdConnect.connect(authProvider);

      // provider instance
      const provider = await threeIdConnect.getDidProvider();
      ceramic.did.setProvider(provider);

      await ceramic.did.authenticate();
    }

    getAddress();
  })

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Header />
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
          <HomeHeader />
          <Home />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
