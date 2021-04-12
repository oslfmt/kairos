const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: schema is case and type sensitive, ie, data passed in must conform EXACTLY to this schema
// in order for a new document of this type to be created in the collection
const UserSchema = new Schema({
  userID: String,
  clientDetails: {
    username: String,
    organization: String,
    description: String,
  },
  freelancerDetails: {
    university: String,
    studentID: String,
    major: String,
    skills: String,
    description: String
  },
});

module.exports = mongoose.model('User', UserSchema);