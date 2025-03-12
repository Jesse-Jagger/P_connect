const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role !== "buyer" && role !== "seller") {
    return res.status(400).json({ message: "Role must be 'buyer' or 'seller'" });
  }

  User.findByEmail(email, async (err, existingUser) => {
    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create(name, email, hashedPassword, role, (err) => {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });
        console.log("User registered:", email);
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  console.log("🔹 Login attempt for:", email);

  User.findByEmail(email, async (err, user) => {
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.email);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔍 Password match result:", isMatch);

      if (!isMatch) {
        console.log("Incorrect password for:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Login successful, JWT issued for:", email);
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });

    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
});

module.exports = router;
