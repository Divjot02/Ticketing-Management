const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    ticketId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "TicketInfo", // collection name
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
