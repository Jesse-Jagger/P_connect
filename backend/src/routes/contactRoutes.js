const express = require("express");
const { sendMessage, getSellerMessages } = require("../controllers/contactController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, sendMessage);

router.get("/", authenticate, getSellerMessages);

module.exports = router;
