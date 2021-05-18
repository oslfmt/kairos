import React, { useState,  useEffect } from 'react';
import UserIconDropDown from '../UserIconDropDown';
import { Link } from 'react-router-dom'
import { handleAccountsChanged } from '../../helper/eth';

// import provider detector
import detectEthereumProvider from '@metamask/detect-provider';

function HomeHeader(props) {
  const provider = props.provider;
  const setProvider = props.setProvider;
  const currentAccount = props.currentAccount;
  const setCurrentAccount = props.setCurrentAccount;

  // checks that Metamask or an ethereum provider is installed
  useEffect(() => {
    const detectProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        // check if something is overwritting window.ethereum
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        } else {
          setProvider(provider);
        }
      }
    }
    detectProvider();
  }, [setProvider]);

  // Requests the ethereum accounts and sets it to the currentAccount
  useEffect(() => {
    if (provider) {
      provider
      .request({ method: 'eth_accounts' })
      .then(res => handleAccountsChanged(res, currentAccount, setCurrentAccount))
      .catch(err => {
        console.error(err);
      });
    }
  }, [currentAccount, setCurrentAccount, provider])

  // updates react state address to proper account
  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', accounts => handleAccountsChanged(accounts, currentAccount, setCurrentAccount));
    }
  }, [currentAccount, setCurrentAccount, provider]);

  return (
    <nav className="navbar navbar-light bg-light justify-content-end p-4">
      <ul className="nav">
          <li className="nav-item">
            <a className="nav-link">How It Works</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Advantages</a>
          </li>
          <li className="nav-item">
            {!currentAccount ? 
              <SignUpButton 
                setCurrentAccount={setCurrentAccount} 
                currentAccount={currentAccount} 
                provider={provider} /> 
              : null
            }
          </li>
          <li className="nav-item">
            {!currentAccount ? 
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
  const setCurrentAccount = props.setCurrentAccount;
  const currentAccount = props.currentAccount;
  const provider = props.provider;

  // request access to user accounts and then set accounts accordingly
  const requestAccounts = () => {
    if (provider) {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then(res => handleAccountsChanged(res, currentAccount, setCurrentAccount))
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