const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleLoginForm,
  handleRegisterForm,
  handleUserRegister,
  handleUserLogout,
  handleUserDashboard,
} = require("../Controller/users");
router.get("/Login", handleLoginForm);
router.post("/Login", handleUserLogin);
router.get("/Register", handleRegisterForm);
router.post("/Register", handleUserRegister);
router.get("/Logout", handleUserLogout);
router.get("/Dashboard", handleUserDashboard);
module.exports = router;
