const Contact = require("../models/Contact");

exports.sendMessage = (req, res) => {
  const { propertyId, sellerId, message } = req.body;
  const buyerId = req.user.id;

  if (!propertyId || !sellerId || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Contact.create({ buyerId, sellerId, propertyId, message }, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    res.status(201).json({ message: "Message sent successfully" });
  });
};

exports.getSellerMessages = (req, res) => {
  const sellerId = req.user.id;

  Contact.getMessagesForSeller(sellerId, (err, messages) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    res.json(messages);
  });
};
