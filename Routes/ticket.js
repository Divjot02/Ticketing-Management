const express = require("express");
const router = express.Router();
const {
  handleCreateTicket,
  handleViewUserTickets,
  handleViewEmployeeTickets,
  handleViewDEpartmentTickets,
  handleCloseTicket,
  handleResolvedTicket,
} = require("../Controller/ticket");

// /ticket/Create
router.post("/Create", handleCreateTicket);
// /ticket/View
router.get("/UserView", handleViewUserTickets);
router.get("/EmployeeView", handleViewEmployeeTickets);
router.get("/DepartmentView", handleViewDEpartmentTickets);
router.put("/Close", handleCloseTicket);
router.put("/Resolved", handleResolvedTicket);
module.exports = router;
