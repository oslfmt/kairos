const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const featuredSchema = new Schema({}, { collection: "featured" });
module.exports = mongoose.model('featured', featuredSchema);  
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;

// Import Search Functionality
let Job = require('./Job-model');
const fetchDataFromDatabase = require('./search');

// Import Stripe Payment Functionality
const transaction = require("./transaction");

// would like to somehow call this to batch indexes every certain time period (ex every 10 min)
// or use mongoDB change stream to call this whenever data is updated in DB, but this might be more expensive?
fetchDataFromDatabase();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected to MongoDB'));

// ENDPOINTS
// Home page
app.get('/', (req, res) => {
  Job.
    find().
    limit(4).
    exec((err, jobs) => {
      if (err) return console.error(err);
      res.send(jobs);
    });
});

// browse page
app.get('/browse', (req, res) => {
  // IMPLEMENT: on request object, add search query and update logic to handle search query
  // If no search query provided, do a generic GET request
  let searchQuery = req.query.searchQuery;

  // if searchQuery is blank, then page is just loaded so fetch all generic jobs
  if (searchQuery === undefined) {
    Job.
    find().
    exec((err, jobs) => {
      if (err) return console.error(err);
      res.send(jobs);
    });
  } else {
    Job.
    find().
    where('description', /.description/i).
    exec((err, jobs) => {
      if (err) return console.error(err);
      res.send(jobs);
    });
  }
});

// posting a new job
app.post('/postjob', (req, res) => {
  let job = new Job(req.body);

  // store to database in jobs cluster
  job.save()
    .then(() => {
      res.status(200).send("Job saved to database");
    })
    .catch(err => {
      res.status(400).send("Failed: " + err);
    });
});

// load user jobs on dashboard
app.get('/dashboard', (req, res) => {
  const id = req.query.userID;
  
  Job.find({ userID: id }, (err, docs) => {
    if (err) return console.error(err);

    res.json(docs);
  });
});

// send update request to create freelancer account
app.patch('/dashboard', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log('App listening at port ' + PORT);
});

// PAYMENT FUNCTIONALITY TESTS
(async () => {
  // test paymentIntent
  // const obj = await transaction.paymentFunction();
  // console.log('payment created');
  
  // // create test account
  // const account = await transaction.createConnectedAccount();
  // console.log('Account ID:' + account.id);

  // create test account link for redirecting to onboarding
  // transaction.retrieveAccounts()
  //   .then(res => {
  //     const accountID = res.data[0].id;
  //     return accountID;
  //   })
  //   .then(accountID => {
  //     const accountLink = transaction.createAccountLink(accountID);
  //     console.log(accountLink);
  //   })
})();
