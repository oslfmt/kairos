const EscrowDisputeManager = artifacts.require('EscrowDisputeManager');

module.exports = function (deployer) {
  deployer.deploy(EscrowDisputeManager);
}