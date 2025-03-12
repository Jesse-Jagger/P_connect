const db = require("../config/database");

class Message {
  static sendMessage({ buyerId, sellerId, propertyId, message }, callback) {
    const query = "INSERT INTO messages (buyer_id, seller_id, property_id, message) VALUES (?, ?, ?, ?)";
    db.query(query, [buyerId, sellerId, propertyId, message], callback);
  }

  static getMessagesForSeller(sellerId, callback) {
    const query = `
      SELECT messages.*, users.name AS buyer_name, properties.title AS property_title
      FROM messages
      JOIN users ON messages.buyer_id = users.id
      JOIN properties ON messages.property_id = properties.id
      WHERE messages.seller_id = ?`;
    db.query(query, [sellerId], callback);
  }
}

module.exports = Message;
