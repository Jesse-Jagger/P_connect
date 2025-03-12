const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

const isSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access restricted to sellers only" });
  }
  next();
};

const isBuyer = (req, res, next) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({ message: "Access restricted to buyers only" });
  }
  next();
};

module.exports = { authenticate, isSeller, isBuyer };