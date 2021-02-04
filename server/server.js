const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;

let Job = require('./Job-model');
const fetchDataFromDatabase = require('./search');

// would like to somehow call this to batch indexes every certain time period (ex every 10 min)
// or use mongoDB change stream to call this whenever data is updated in DB, but this might be more expensive?
fetchDataFromDatabase();

// import router used for authentication endpoint
// processes endpoing '/register' for user registration
const AuthRoute = require('./routes/auth');
app.use(AuthRoute);

mongoose.connect('mongodb+srv://user1:test123@cluster0.98it7.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

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


app.listen(PORT, () => {
  console.log('App listening at port ' + PORT);
});