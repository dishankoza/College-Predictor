let mongoose = require('mongoose');


var BC = new mongoose.Schema({
    branch:String,
    cutoff: Number
});


module.exports = mongoose.model('BC', BC);