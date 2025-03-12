const db = require("../config/database");

const Property = {
  create: ({ title, price, location, image, sellerId }, callback) => {
    const sql = `INSERT INTO properties (title, price, location, image, sellerId) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [title, price, location, image, sellerId], callback);
  },

  getAll: (callback) => {
    const sql = `SELECT * FROM properties`;
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM properties WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.length ? results[0] : null);
    });
  },
};

module.exports = Property;
