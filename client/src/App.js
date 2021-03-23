import React, { Component } from 'react';
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

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup">
          </Route>

          <Route path="/dashboard">
            <Header />
            <Dashboard />
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
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
