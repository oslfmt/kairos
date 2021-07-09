import Config from '../config';

export class EscrowDisputeManager {

  web3 = null;
  account = '';
  contractInstance = null;

  setWeb3(web3) {
    this.web3 = web3;
    this.contractInstance = this.web3.eth.Contract(Config.ESCROWDISPUTEMANAGER_ABI, Config.ESCROWDISPUTEMANAGER_ADDRESS);
  }

  setAccount(account) {
    this.account = account;
  }

  // wrapper functions for contract methods
  reclaimFunds(contractID) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.reclaimFunds(contractID, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  depositArbitrationFeeForPayee(contractID) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.depositArbitrationFeeForPayee(contractID, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  remainingTimeToReclaim(contractID) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.remainingTimeToReclaim(contractID, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  remainingTimeToDepositArbitrationFee(contractID) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.remainingTimeToDepositArbitrationFee(contractID, (err, receipt) => {
          if (!err) resolve(receipt);
          reject(err);
        });
      } catch(e) {
        reject(e);
      }
    });
  }
}