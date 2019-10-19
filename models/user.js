const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  marks: Number,
  area_code: String,
  phone: String,
  gender: String
});

// For authentication setup
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
