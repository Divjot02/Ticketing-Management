const mongoose = require("mongoose");
// create a schema for resolvers
const employeeSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: true,
  },
});
// create model for this schema
const employeeModel = mongoose.model("Employee", employeeSchema);
//export this model
module.exports = employeeModel;
