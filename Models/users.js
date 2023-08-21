const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
//library used for password hashing
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a valid Username"],
  },
  email: {
    type: String,
    // unique: [true, "Email Already Exists"],
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    // minlength: 6,
    required: true,
  },
});
// create model for this schema
const userModel = mongoose.model("User", userSchema);
//export this model
module.exports = userModel;
