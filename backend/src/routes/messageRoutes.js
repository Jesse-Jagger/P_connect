const express = require("express");
const { sendMessage, getSellerMessages } = require("../controllers/messageController");
const { authenticate, isSeller } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, sendMessage);

router.get("/", authenticate, isSeller, getSellerMessages);

module.exports = router;
