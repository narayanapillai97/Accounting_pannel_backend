const PayModeMaster = require('../models/payModeModel');

// Add Payment Mode
exports.addPayMode = (req, res) => {
    const { payment_method, description } = req.body;

    if (!payment_method) {
        return res.status(400).json({ error: "payment_method is required" });
    }

    PayModeMaster.create({ payment_method, description }, (err, result) => {
        if (err) {
            console.error("Error adding payment mode:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Payment mode added successfully", payModeId: result.insertId });
    });
};

// Get All Payment Modes
exports.getAllPayModes = (req, res) => {
    PayModeMaster.getAll((err, results) => {
        if (err) {
            console.error("Error fetching payment modes:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get Payment Mode by ID
exports.getPayModeById = (req, res) => {
    const { id } = req.params;
    PayModeMaster.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching payment mode:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "Payment mode not found" });
        res.status(200).json(result[0]);
    });
};

// Update Payment Mode
exports.updatePayModeById = (req, res) => {
    const { id } = req.params;
    const { payment_method, description } = req.body;

    if (!payment_method) {
        return res.status(400).json({ error: "payment_method is required" });
    }

    PayModeMaster.updateById(id, { payment_method, description }, (err, result) => {
        if (err) {
            console.error("Error updating payment mode:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Payment mode not found" });
        res.status(200).json({ success: true, message: "Payment mode updated successfully" });
    });
};

// Delete Payment Mode
exports.deletePayModeById = (req, res) => {
    const { id } = req.params;
    PayModeMaster.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting payment mode:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Payment mode not found" });
        res.status(200).json({ success: true, message: "Payment mode deleted successfully" });
    });
};
