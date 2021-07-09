const Escrow = require('./build/contracts/Escrow.json');
const EscrowDisputeManager = require('./build/contracts/EscrowDisputeManager.json');

module.exports = {
  // contract addresses
  ESCROW_ADDRESS: Escrow.networks[5777].address,
  ESCROWDISPUTEMANAGER_ADDRESS: EscrowDisputeManager.networks[5777].address,
  // contract abi
  ESCROW_ABI: Escrow.abi,
  ESCROWDISPUTEMANAGER_ABI: EscrowDisputeManager.abi,
};