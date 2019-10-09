let mongoose = require('mongoose');


var CollegeSchema = new mongoose.Schema({
    name : String,
    branch : String,
    address : String,
    email : String,
    cutoff : Number,
    phone : String


});

module.exports = mongoose.model('College', userSchema)