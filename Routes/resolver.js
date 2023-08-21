const express = require("express");
const router = express.Router();
const {
  handleResolverForm,
  handleResolverLogin,
  handleResolverDashboard,
  handleResolverLogout,
} = require("../Controller/resolver");
router.get("/Login", handleResolverForm);
router.post("/Login", handleResolverLogin);
router.get("/Dashboard", handleResolverDashboard);
router.get("/Logout", handleResolverLogout);
module.exports = router;
