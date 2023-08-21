async function handleChatPage(req, res) {
  const ticketId = req.query.ticketId;
  console.log(ticketId);
  const session = req.session;
  res.render("chat", { ticketId, session });
}

module.exports = {
  handleChatPage,
};
