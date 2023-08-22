const MessageModel = require("../Models/message");
async function handleChatPage(req, res) {
  const ticketId = req.query.ticketId;
  const session = req.session;
  const messages = await MessageModel.find({ ticketId: ticketId });
  res.render("chat", { ticketId, session, messages });
}

module.exports = {
  handleChatPage,
};
