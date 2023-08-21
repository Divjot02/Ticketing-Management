const mongoose = require("mongoose");
// create a schema for resolvers
const resolverSchema = new mongoose.Schema({
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
const resolverModel = mongoose.model("Resolver", resolverSchema);
//export this model
module.exports = resolverModel;
