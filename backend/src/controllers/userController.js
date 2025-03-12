const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    User.createUser({ name, email, password: hashedPassword, role }, (err, result) => {
      if (err) return res.status(500).json({ message: "Server error", error: err.message });

      res.status(201).json({ message: "User registered successfully" });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🔄 Login attempt for email: ${email}`);

    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        console.log("User not found!");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("User found in database:", user);

      // Compare entered password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password does NOT match!");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("Password matches! Generating token...");

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Token generated:", token);
      res.json({ token });
    });

  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
