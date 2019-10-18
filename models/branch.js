let mongoose = require('mongoose');


var BC = new mongoose.Schema({
    branch:String,
    cutoff: String
});


module.exports = mongoose.model('BC', BC);