const Message = require("../models/Message");

exports.sendMessage = (req, res) => {
  const { propertyId, message } = req.body;
  const buyerId = req.user.id;

  if (!propertyId || !message) {
    return res.status(400).json({ message: "Property ID and message are required" });
  }

  const query = "SELECT seller_id FROM properties WHERE id = ?";
  db.query(query, [propertyId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!results.length) return res.status(404).json({ message: "Property not found" });

    const sellerId = results[0].seller_id;

    Message.sendMessage({ buyerId, sellerId, propertyId, message }, (err, result) => {
      if (err) return res.status(500).json({ message: "Server error", error: err.message });
      res.status(201).json({ message: "Message sent successfully" });
    });
  });
};

exports.getSellerMessages = (req, res) => {
  const sellerId = req.user.id;

  Message.getMessagesForSeller(sellerId, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    res.json(results);
  });
};
