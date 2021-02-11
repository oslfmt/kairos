import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import css file
import './css/main.css';

// import pages
import Home from './components/views/Home';
import Profile from './components/views/Profile';
import Header from './components/layout/Header';
import JobForm from './components/views/JobForm';
import FreelancerList from './components/Freelancer-list';
import BrowseGrid from './components/search/BrowseGrid';
import LoginButton from './components/LoginButton';
import Footer from './components/layout/Footer';
import JobDetail from './components/JobDetail';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup">
            <LoginButton />
          </Route>

          <Route path="/profile">
            <Header />
            <Profile />
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

          <Route path="/servicedetails">
            <Header />
            <JobDetail />
            <Footer />
          </Route>

          {/* load home page at root */}
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
