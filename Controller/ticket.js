const TicketModel = require("../Models/ticket");

async function handleCreateTicket(req, res) {
  try {
    const ticket = new TicketModel({
      email: req.body.email,
      // email: req.session.email;
      title: req.body.title,
      description: req.body.description,
      //status
      priority: req.body.priority,
      assignedTo: req.body.department,
    });
    // console.log(ticket);
    await ticket.save();
    // console.log("done");
    res.status(200).redirect("/"); //LATER CHANGE IT TO DASHBOARD AFTER IMPLEMENTATION OF LOGIN SIGNUP
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

async function handleViewUserTickets(req, res) {
  try {
    const tickets = await TicketModel.find({ email: req.session.email });
    if (!tickets || !tickets[0])
      return res.render("displayUserTickets", { tickets: [] }); // no tickets available
    // console.log(tickets);
    res.render("displayUserTickets", { tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

async function handleViewResolverTickets(req, res) {
  try {
    const tickets = await TicketModel.find({
      assignedTo: req.session.department,
    });
    if (!tickets || !tickets[0])
      return res.render("displayResolverTickets", { tickets: [] }); // no tickets available
    // console.log(tickets);
    res.render("displayResolverTickets", { tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

async function handleCloseTicket(req, res) {
  try {
    const { ticketId } = req.body;
    await TicketModel.updateOne({ _id: ticketId }, { status: "closed" });
    res.status(200).send("Ticket status changed");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
async function handleResolvedTicket(req, res) {
  try {
    const { ticketId } = req.body;
    await TicketModel.updateOne({ _id: ticketId }, { status: "resolved" });
    res.status(200).send("Ticket status changed");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
module.exports = {
  handleCreateTicket,
  handleViewUserTickets,
  handleViewResolverTickets,
  handleCloseTicket,
  handleResolvedTicket,
};
