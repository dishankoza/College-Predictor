const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
  cutoffs: [
    {
      branchName: String,
      cutoffMarks: Number
    }
  ]
});

module.exports = mongoose.model("College", CollegeSchema);
