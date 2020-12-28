const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    skills: Array,
    otherSkills: String
});

module.exports = mongoose.model('Job', JobSchema);