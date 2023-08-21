const express = require("express");
const router = express.Router();
const {
  handleCreateTicket,
  handleViewUserTickets,
  handleViewResolverTickets,
  handleCloseTicket,
  handleResolvedTicket,
} = require("../Controller/ticket");

// /ticket/Create
router.post("/Create", handleCreateTicket);
// /ticket/View
router.get("/userView", handleViewUserTickets);
router.get("/resolverView", handleViewResolverTickets);
router.put("/Close", handleCloseTicket);
router.put("/Resolved", handleResolvedTicket);
module.exports = router;
