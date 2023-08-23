const TicketModel = require("../Models/ticket");

async function handleCreateTicket(req, res) {
  try {
    const ticket = new TicketModel({
      email: req.session.email,
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
      return res.render("displayMyTickets", { tickets: [] }); // no tickets available
    // console.log(tickets);
    res.render("displayMyTickets", { tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
//done
async function handleViewEmployeeTickets(req, res) {
  try {
    const tickets = await TicketModel.find({
      // assignedTo: req.session.department,
      email: req.session.email,
    });
    // console.log(req.session.email);
    // console.log(tickets);
    if (!tickets || !tickets[0])
      return res.render("displayEmployeeTickets", { tickets: [] }); // no tickets available
    // console.log(tickets);
    res.render("displayEmployeeTickets", { tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
async function handleViewDEpartmentTickets(req, res) {
  try {
    const tickets = await TicketModel.find({
      assignedTo: req.session.department,
    });
    if (!tickets || !tickets[0])
      return res.render("displayDeptTickets", { tickets: [] }); // no tickets available
    // console.log(tickets);
    res.render("displayDeptTickets", { tickets });
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
  handleViewEmployeeTickets,
  handleViewDEpartmentTickets,
  handleCloseTicket,
  handleResolvedTicket,
};
