const db = require("../config/database");
const bcrypt = require("bcrypt");

const User = {
  create: async (name, email, password, role, callback) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, hashedPassword, role], callback);
    } catch (error) {
      callback(error);
    }
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results.length > 0 ? results[0] : null);
    });
  },
};

module.exports = User;
