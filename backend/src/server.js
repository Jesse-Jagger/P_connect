const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
