const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: schema is case and type sensitive, ie, data passed in must conform EXACTLY to this schema
// in order for a new document of this type to be created in the collection
const UserSchema = new Schema({
  University: String,
  StudentID: String,
  Major: String,
  Skills: String
});

module.exports = mongoose.model('User', UserSchema);