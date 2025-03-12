const express = require("express");
const upload = require("../middleware/upload");
const { authenticate, isSeller } = require("../middleware/authMiddleware");
const { addProperty, getProperties, getPropertyById } = require("../controllers/propertyController");

const router = express.Router();

router.post("/", authenticate, isSeller, upload.single("image"), addProperty);

router.get("/", authenticate, getProperties);

router.get("/:id", authenticate, getPropertyById);

module.exports = router;
