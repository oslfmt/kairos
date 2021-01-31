let Job = require('./Job-model');

// import and create algolia search client
const algoliasearch = require('algoliasearch');
const client = algoliasearch('R9Y9XV4UI3', '6f7d18c4f5c34f9b9e6d8d1f23be0f4c');
const index = client.initIndex('test_jobs');

// set search settings on index
index.setSettings({
    searchableAttributes: [
        'title',
        'skills, otherSkills',
        'description'
    ],
    attributesForFaceting: [
        'skills',
        'price',
        'paymentForms',
    ]
}).then(() => {
    console.log('Settings set');
});

function renameKey(obj, oldKey, newKey) {
    if (oldKey !== newKey) {
        Object.defineProperty(obj, newKey,
            Object.getOwnPropertyDescriptor(obj, oldKey));
        delete obj[oldKey];
    }
}

// fetch data from mongoDB database
function fetchDataFromDatabase() {
    Job.find()
        .exec((err, jobs) => {
            if (err) return console.error(err);

            let newJobs = jobs.map(job => {
                job.update({$set: {title: 'test'}});
                return job;
            });
            console.log(newJobs);

            // save jobs to algolia index
            // index.saveObjects(jobs, { autoGenerateObjectIDIfNotExist: true })
            //     .then(({ objectIDs }) => {
            //         console.log(objectIDs);
            //     })
            //     .catch(err => console.log(err));
        });
    return true;
}

module.exports = fetchDataFromDatabase;