const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: String,
    description: String,
    price: String,
    skills: Array,
    otherSkills: String,
    paymentForms: Array,
    userID: String
});

module.exports = mongoose.model('Job', JobSchema);