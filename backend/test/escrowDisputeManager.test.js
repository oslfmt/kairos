const EscrowDisputeManager = artifacts.require('EscrowDisputeManager');

contract("EscrowDisputeManager", accounts => {
  let escrowDisputeManager;

  before(async () => {
    escrowDisputeManager = await EscrowDisputeManager.deployed();
  });

  describe('reclaiming funds', async () => {
    
  });

  describe('depositing arbitration fee by payee', async () => {

  });

  describe('getter functions', async () => {
    it('retrieves remainingTimeToReclaim', async () => {

    });

    it('retrieves remainingTimeToDepositArbitrationFee', async () => {

    });
  });

})