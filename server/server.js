const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;

let Job = require('./Job-model');

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
    Job.
        find().
        exec((err, jobs) => {
            if (err) return console.error(err);
            res.send(jobs);
        });
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