import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import css file
import './css/main.css';

// import pages
import Home from './components/views/Home';
import SignupForm from './components/Signup-Form';
import Profile from './components/views/Profile';
import Header from './components/layout/Header';
import JobForm from './components/views/JobForm';
import Footer from './components/layout/Footer';
import FreelancerList from './components/Freelancer-list';
import BrowseGrid from './components/BrowseGrid';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>

          <Route path="/profile">
            <Header />
            <Profile />
            <Footer />
          </Route>

          <Route path="/postjob">
            <Header />
            <JobForm />
            <Footer />
          </Route>

          <Route path="/browse">
            <Header />
            <BrowseGrid />
            <Footer />
          </Route>

          <Route path="/notify">
            <Header />
            <FreelancerList />
            <Footer />
          </Route>

          {/* load home page at root */}
          <Route exact path="/">
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
