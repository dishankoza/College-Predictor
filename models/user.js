let mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    address : String,
    email : String,
    password : String,
    marks : Number,
    area_code: String,
    phone : String,
    gender : String


});

module.exports = mongoose.model('User', userSchema)