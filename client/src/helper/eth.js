  // Set the retrieved account to currentAccount
  const handleAccountsChanged = (accounts, currentAccount, setCurrentAccount) => {
    if (accounts.length === 0) {
      alert("Please connect to metamask");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  }

  export {
    handleAccountsChanged
  }