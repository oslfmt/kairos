import Config from '../config';

export class Escrow {

  web3 = null;
  account = '';
  contractInstance = null;

  // this function must be called first, could be constructor
  setWeb3(web3) {
    this.web3 = web3;
    this.contractInstance = this.web3.eth.Contract(Config.ESCROW_ABI, Config.ESCROW_ADDRESS);
  }

  getWeb3() {
    return this.web3;
  }

  setAccount(account) {
    this.account = account;
  }

  // wrapper functions for contract methods
  createNewContract(payee, metaEvidence, reclamationPeriod, arbitrationFeeDepositPeriod) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.createNewContract(payee, metaEvidence, reclamationPeriod, arbitrationFeeDepositPeriod, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  releaseFunds(contractID) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.releaseFunds(contractID, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  rule(disputeID, ruling) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.rule(disputeID, ruling, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  submitEvidence(contractID, evidence) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.submitEvidence(contractID, evidence, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  contractBalance() {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.contractBalance((err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  // add listeners for events?
}

//TODO
// 1. figure out whether {from: address} is necessary in wrapper method calls
// 2. figure out how to setWeb3 and setAddress works with frontend
// 3. figure out of event listener wrappers are necessary and how to set them up