const Escrow = artifacts.require('Escrow');

contract("Escrow", accounts => {
  let escrow;
  let payer = accounts[1];
  let payee = accounts[2];

  before(async () => {
    escrow = await Escrow.deployed();
  });

  it('creates a new contract with correct fields', async () => {
    // is this supposed to be ipfs hash?
    let metaEvidence = "";
    let reclamationPeriod = 60;
    let arbitrationFeeDepositPeriod = 60;
    let amountDeposited = web3.utils.toWei('2', 'ether');

    // deploy contract
    await escrow.createNewContract(
      payee, 
      metaEvidence, 
      reclamationPeriod, 
      arbitrationFeeDepositPeriod, 
      {from: payer, value: amountDeposited}
    );
    // get the new contracts individual fields
    let contract = await escrow.contracts(0);
    let arbitrator = await escrow.defaultArbitrator();

    // check that all fields of the contract are initialized properly
    assert.equal(contract.payer, payer, "payer is not correct");
    assert.equal(contract.payee, payee, "payee is not correct");
    assert.equal(contract.arbitrator, arbitrator, "arbitrator is not correct")
    assert.equal(contract.status.toNumber(), 0, "status is not initial");
    assert.equal(contract.value, amountDeposited, "value is not correct")
    assert.equal(contract.disputeID.toNumber(), 0, "disputeID is not 0")
    assert.equal(contract.reclaimedAt.toNumber(), 0, "reclaimedAt is incorrect")
    assert.equal(contract.payerFeeDeposit.toNumber(), 0)
    assert.equal(contract.payeeFeeDeposit.toNumber(), 0)
    assert.equal(contract.reclamationPeriod.toNumber(), 60)
    assert.equal(contract.arbitrationFeeDepositPeriod.toNumber(), 60)
  });

  it('increased contract balance correctly', async () => {
    const addressBalance = await escrow.contractBalance();
    assert.equal(web3.utils.fromWei(addressBalance, 'ether'), 2)
  });

  it('releases funds from contract escrow balance to payee', async () => {
    let contract = await escrow.contracts(0);
    const contractBalanceBefore = await escrow.contractBalance();
    let value = contract.value;
    const payeeBalanceBefore = await web3.eth.getBalance(payee);
    // have payer call releaseFunds, which does so unconditionally
    await escrow.releaseFunds(0, {from: payer});
    // check contract status is changed
    contract = await escrow.contracts(0);
    assert.equal(contract.status.toNumber(), 3, "status was not changed to resolved");
    // check that contract payee has been paid the contract value
    const payeeBalanceAfter = await web3.eth.getBalance(payee);
    const difference = payeeBalanceAfter - payeeBalanceBefore;
    assert.equal(difference, web3.utils.toWei(value, 'ether'), "payee balance did not increase");
    // check that contract balance has decreased by contract value
    const contractBalanceAfter = await escrow.contractBalance();
    const contractBalanceDifference = contractBalanceBefore - contractBalanceAfter;
    assert.equal(web3.utils.fromWei(contractBalanceDifference.toString()), value, "contract balance not decreased");
  });

  it('enforces the proper ruling given by arbitrator', async () => {

  });

  it('submits evidence', async () => {

  });

});