const Variant = require("../models/variantModel");

// Create
exports.createVariant = (req, res) => {
    Variant.createVariant(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Variant created successfully", id: results.insertId });
    });
};

// Get All
exports.getAllVariants = (req, res) => {
    Variant.getAllVariants((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get By ID
exports.getVariantById = (req, res) => {
    Variant.getVariantById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Variant not found" });
        res.json(results[0]);
    });
};

// Update
exports.updateVariant = (req, res) => {
    Variant.updateVariant(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Variant updated successfully" });
    });
};

// Delete
exports.deleteVariant = (req, res) => {
    Variant.deleteVariant(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Variant deleted successfully" });
    });
};
