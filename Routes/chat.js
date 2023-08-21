const express = require("express");
const router = express.Router();
const { handleChatPage } = require("../Controller/chat.js");
router.get("/Window", handleChatPage);
module.exports = router;
