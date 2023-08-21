const mongoose = require("mongoose");
// create a schema for ticket
const ticketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No Description",
  },
  status: {
    type: String,
    required: true,
    default: "open",
    // open/closed
  },
  priority: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  // created_at: { type: Date },
  // updated_at: { type: Date },
  //   user: [{ type: Schema.Types.ObjectId }],
});
// create model for this schema
const TicketModel = mongoose.model("TicketInfo", ticketSchema);

module.exports = TicketModel;
