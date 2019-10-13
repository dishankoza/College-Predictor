let mongoose = require('mongoose');


var CollegeSchema = new mongoose.Schema({
    name : String,
    address : String,
    email : String,
    phone : String,
    BC : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'BC'
        }
        ]    
    


});

module.exports = mongoose.model('College', CollegeSchema)