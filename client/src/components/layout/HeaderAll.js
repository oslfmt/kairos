import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';
import UserIconDropDown from '../UserIconDropDown';

export default class HeaderAll extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-sm bg-light flex-row-reverse p-4">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="#">How It Works</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="#">Advantages</Link>
					</li>
					<li className="nav-item">
						<LoginButton />
						<UserIconDropDown />
					</li>
					<li className="nav-item">
						<SignUpButton />
					</li>
				</ul>
			</nav>
		)
	}
}
