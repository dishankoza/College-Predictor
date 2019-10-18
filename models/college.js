let mongoose = require('mongoose');
var BCSchema = new mongoose.Schema({
    branch:String,
    cutoff: Number
});

var CollegeSchema = new mongoose.Schema({
    name : String,
    address : String,
    email : String,
    phone : String,
    cutoffs: [
        {
            branchName: String,
            cutoffMarks: Number
        }
    ]   
});

module.exports = mongoose.model('College', CollegeSchema)