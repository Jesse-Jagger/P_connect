const Property = require("../models/Property");

exports.addProperty = (req, res) => {
  const { title, price, location } = req.body;
  const image = req.file ? req.file.filename : null;
  const sellerId = req.user.id;

  if (!title || !price || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Property.create({ title, price, location, image, sellerId }, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    res.status(201).json({ message: "Property listed successfully", property: result });
  });
};

exports.getProperties = (req, res) => {
  Property.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    res.json(results);
  });
};

exports.getPropertyById = (req, res) => {
  const { id } = req.params;

  Property.findById(id, (err, property) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!property) return res.status(404).json({ message: "Property not found" });

    res.json(property);
  });
};

