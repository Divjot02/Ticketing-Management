const express = require("express");
const router = express.Router();
const {
  handleEmployeeForm,
  handleEmployeeLogin,
  handleEmployeeDashboard,
  handleEmployeeLogout,
} = require("../Controller/employee");
router.get("/Login", handleEmployeeForm);
router.post("/Login", handleEmployeeLogin);
router.get("/Dashboard", handleEmployeeDashboard);
router.get("/Logout", handleEmployeeLogout);
module.exports = router;
