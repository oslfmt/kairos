import React, { useEffect } from 'react';
import UserIconDropDown from '../UserIconDropDown';
import { Link } from 'react-router-dom'
// import { handleAccountsChanged } from '../../helper/eth';

function HomeHeader(props) {
  const ethereum = props.ethereum;
  const setCurrentAccount = props.setCurrentAccount;
  const did = props.did;

  // Requests the ethereum accounts and sets it to the currentAccount
  useEffect(() => {
    if (ethereum) {
      ethereum.request({ method: 'eth_accounts' })
      .then(accounts => setCurrentAccount(accounts[0]))
      .catch(err => {
        console.error(err);
      });
    }
  })

  // updates react state address to proper account
  // useEffect(() => {
  //   if (provider) {
  //     provider.on('accountsChanged', accounts => handleAccountsChanged(accounts, currentAccount, setCurrentAccount));
  //   }
  // }, [currentAccount, setCurrentAccount, provider]);

  return (
    <nav className="navbar navbar-light bg-light justify-content-end p-4">
      <ul className="nav">
          <li className="nav-item">
            <a href="index.html" className="nav-link">How It Works</a>
          </li>
          <li className="nav-item">
            <a href="index.html" className="nav-link">Advantages</a>
          </li>
          <li className="nav-item">
            {!did ? 
              <SignUpButton setCurrentAccount={setCurrentAccount} ethereum={ethereum} /> 
              : null
            }
          </li>
          <li className="nav-item">
            {!did ? 
              <LoginButton /> : 
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            }
          </li>
          <li className="nav-item">
            <UserIconDropDown />
          </li>
        </ul>
    </nav>
  )
}

const SignUpButton = (props) => {
  const ethereum = props.ethereum;
  const setCurrentAccount = props.setCurrentAccount;

  // request access to user accounts and then set accounts accordingly
  const requestAccounts = () => {
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => setCurrentAccount(res[0]))
        .catch(err => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest Error
            alert("Please allow connection to Metamask to proceed.");
          } else {
            console.error(err);
          }
        });
    } else {
      // ask user to install metamask; update with "about" metamask page later
      alert("Please install Metamask or another wallet provider!");
    }
  }

  return (
    <button className="btn" onClick={requestAccounts}>
      Sign Up
    </button>
  );
}

const LoginButton = () => {
  return (
    <button className="btn">
      Log In
    </button>
  );
}

export {
  HomeHeader,
  SignUpButton,
  LoginButton,
};