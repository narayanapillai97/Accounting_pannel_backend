const Income = require('../models/incomeModel');

// Add income
exports.addIncome = (req, res) => {
    const { date, category_id, subcategory_id, variant_id, payer_name, description, amount, payment_mode_id, bill_id, status } = req.body;

    if (!date || !amount) {
        return res.status(400).json({ error: "date and amount are required" });
    }

    Income.create({ date, category_id, subcategory_id, variant_id, payer_name, description, amount, payment_mode_id, bill_id, status }, (err, result) => {
        if (err) {
            console.error("Error adding income:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Income added successfully", incomeId: result.insertId });
    });
};

// Get all
exports.getAllIncome = (req, res) => {
    Income.getAll((err, results) => {
        if (err) {
            console.error("Error fetching income:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get by ID
exports.getIncomeById = (req, res) => {
    const { id } = req.params;
    Income.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching income:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "Income not found" });
        res.status(200).json(result[0]);
    });
};

// Update
exports.updateIncomeById = (req, res) => {
    const { id } = req.params;
    const { date, category_id, subcategory_id, variant_id, payer_name, description, amount, payment_mode_id, bill_id, status } = req.body;

    if (!date || !amount) {
        return res.status(400).json({ error: "date and amount are required" });
    }

    Income.updateById(id, { date, category_id, subcategory_id, variant_id, payer_name, description, amount, payment_mode_id, bill_id, status }, (err, result) => {
        if (err) {
            console.error("Error updating income:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Income not found" });
        res.status(200).json({ success: true, message: "Income updated successfully" });
    });
};

// Delete
exports.deleteIncomeById = (req, res) => {
    const { id } = req.params;
    Income.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting income:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Income not found" });
        res.status(200).json({ success: true, message: "Income deleted successfully" });
    });
};
