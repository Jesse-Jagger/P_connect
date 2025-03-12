const db = require("../config/database");

const Contact = {
  create: ({ buyerId, sellerId, propertyId, message }, callback) => {
    const sql = `INSERT INTO contacts (buyerId, sellerId, propertyId, message) VALUES (?, ?, ?, ?)`;
    db.query(sql, [buyerId, sellerId, propertyId, message], callback);
  },

  getMessagesForSeller: (sellerId, callback) => {
    const sql = `SELECT * FROM contacts WHERE sellerId = ? ORDER BY created_at DESC`;
    db.query(sql, [sellerId], callback);
  },
};

module.exports = Contact;
