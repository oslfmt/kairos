const stripe = require('stripe')('sk_test_51IMGlyEoOA5uRAruugbPjjUCx6fce2ZIJltJ274FvfImWTX41WvbsU9srKtHJtTcoPYyhSQWQXreL89H1EfVRxUd00FD16w7iy');

const createPaymentIntent = async () => {
  // amounts are currently hardcoded; will need to change later
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: 'kory.anders@example.com',
    // application_fee_amount: 123,
    // transfer_data: {
    //   destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}'
    // },
  });

  return paymentIntent;
}

const createConnectedAccount = async () => {
  const account = await stripe.accounts.create({
    type: 'express'
  });
  return account;
}

const retrieveAccounts = async () => {
  const accounts = await stripe.accounts.list();
  return accounts;
}

const createAccountLink = async (accountID) => {
  const accountLink = await stripe.accountLinks.create({
    account: accountID,
    refresh_url: 'https://example.com/reauth',
    return_url: 'https://example.com/return',
    type: 'account_onboarding',
  });
  return accountLink;
}

module.exports = {
  createPaymentIntent,
  createConnectedAccount,
  retrieveAccounts,
  createAccountLink,
};