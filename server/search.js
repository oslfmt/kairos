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

/**
 * Mutates an object by renaming a specified key
 * @param {object} obj - the object to modify
 * @param {string} oldKey - the key name to be changed
 * @param {string} newKey - the new key name
 */
function renameKey(obj, oldKey, newKey) {
  if (oldKey !== newKey) {
    Object.defineProperty(obj, newKey,
      Object.getOwnPropertyDescriptor(obj, oldKey));
    delete obj[oldKey];
  }
  return obj;
}

/**
 * Fetches data from mongoDB database and saves all records to Algolia search index.
 */
function fetchDataFromDatabase() {
  Job.find()
    .exec((err, jobs) => {
      if (err) return console.error(err);

      // create a new array where _id is renamed to objectID for each record
      let newJobs = jobs.map(job => {
        return renameKey(job.toObject(), '_id', 'objectID');
      });

      // save and update records to algolia index
      index.saveObjects(newJobs)
        .then(() => {
            console.log('All records updated and saved');
        })
        .catch(err => console.log(err));
    });
}

module.exports = fetchDataFromDatabase;