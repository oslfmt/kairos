import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomSearchBox from '../search/CustomSearchBox';
import UserIconDropDown from '../UserIconDropDown';
import { withAuth0 } from '@auth0/auth0-react';
import { SignUpButton, LoginButton } from './HomeHeader';
import Nav from 'react-bootstrap/esm/Nav';

/**
 * Renders the UI for the Header component. This component is reusable, and is placed at the top of most pages.
 * 
 * These props are only used by the specialized 'BrowseGrid' Header because this is the only header that will save
 * queries from another page and use them as a default refinement.
 * @props query - the user input search query; passed to CustomSearchBox for a defaultRefinement
 * @props browse - indicates if Header is on 'browse' page; passed to CustomSearchBox to render proper SearchBox based
 * 								 on value of prop
 * 
 * @child CustomSearchBox - customized InstantSearch component that renders the appropriate SearchBox depending on the
 * 													truth value of browse prop
 */
class Header extends Component {
	render() {
    const isAuthenticated = this.props.auth0.isAuthenticated;

    return (
      <div className="container-fluid p-3 bg-light">
        <div className="row align-items-center">
          <div className="col-xl-2 mr-3">
            <h1 className="display-4">
              <Link to="/">Collancer</Link>
            </h1>
          </div>
          <div className="col-3">
            <CustomSearchBox browse={this.props.browse} query={this.props.query} />
          </div>
          <div className="ml-auto">
            {isAuthenticated ? <UserIconDropDown /> : 
              <Nav>
                <Nav.Item>
                  <SignUpButton />
                </Nav.Item>
                <Nav.Item>
                  <LoginButton />
                </Nav.Item>
              </Nav>
            }
          </div>
        </div>
        <div className="row text-center">
          <div className="col-xl-1">
              <Link to="">Design</Link>
          </div>
          <div className="col-xl-1">
              <Link to="">Programming</Link>
          </div>
          <div className="col-xl-1">
              <Link to="">Tutoring</Link>
          </div>
          <div className="col-xl-1">
              <Link to="">Writing</Link>
          </div>
        </div>
      </div>
    );
	}
}

export default withAuth0(Header);