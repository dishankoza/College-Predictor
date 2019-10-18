let mongoose = require('mongoose');
//var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    address : String,
    username : String,
    password : String,
    marks : Number,
    area_code: String,
    phone : String,
    gender : String


});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)