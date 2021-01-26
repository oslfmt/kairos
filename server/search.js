let Job = require('./Job-model');
const algoliasearch = require('algoliasearch');

const client = algoliasearch('R9Y9XV4UI3', '6f7d18c4f5c34f9b9e6d8d1f23be0f4c');
const index = client.initIndex('test_jobs');

index.setSettings({
    searchableAttributes: [
        'title',
        'skills, otherSkills',
        'description'
    ],
    attributesForFaceting: [
        'skills',
        'price',
    ]
}).then(() => {
    console.log('Settings set');
});

const fetchDataFromDatabase = () => {
    Job.find()
        .exec((err, jobs) => {
            if (err) return console.error(err);
            index.saveObjects(jobs, { autoGenerateObjectIDIfNotExist: true });
        });
    
    return true;
}

fetchDataFromDatabase();

module.exports = { index, fetchDataFromDatabase };