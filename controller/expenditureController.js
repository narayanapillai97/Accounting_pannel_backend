const Expenditure = require('../models/expenditureModel');

// Add expenditure
exports.addExpenditure = (req, res) => {
    const { date, category_id, subcategory_id, variant_id, payee_name, description, amount, payment_mode_id, bill_id, status } = req.body;

    if (!date || !amount) {
        return res.status(400).json({ error: "date and amount are required" });
    }

    Expenditure.create({ date, category_id, subcategory_id, variant_id, payee_name, description, amount, payment_mode_id, bill_id, status }, (err, result) => {
        if (err) {
            console.error("Error adding expenditure:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Expenditure added successfully", expenditureId: result.insertId });
    });
};

// Get all
exports.getAllExpenditure = (req, res) => {
    Expenditure.getAll((err, results) => {
        if (err) {
            console.error("Error fetching expenditure:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get by ID
exports.getExpenditureById = (req, res) => {
    const { id } = req.params;
    Expenditure.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching expenditure:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "Expenditure not found" });
        res.status(200).json(result[0]);
    });
};

// Update
exports.updateExpenditureById = (req, res) => {
    const { id } = req.params;
    const { date, category_id, subcategory_id, variant_id, payee_name, description, amount, payment_mode_id, bill_id, status } = req.body;

    if (!date || !amount) {
        return res.status(400).json({ error: "date and amount are required" });
    }

    Expenditure.updateById(id, { date, category_id, subcategory_id, variant_id, payee_name, description, amount, payment_mode_id, bill_id, status }, (err, result) => {
        if (err) {
            console.error("Error updating expenditure:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Expenditure not found" });
        res.status(200).json({ success: true, message: "Expenditure updated successfully" });
    });
};

// Delete
exports.deleteExpenditureById = (req, res) => {
    const { id } = req.params;
    Expenditure.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting expenditure:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Expenditure not found" });
        res.status(200).json({ success: true, message: "Expenditure deleted successfully" });
    });
};

exports.getExpenditureReport = (req, res) => {
    const { fromDate, toDate } = req.params;
    const { category_id, payment_mode_id } = req.query;

    // Validate required parameters
    if (!fromDate || !toDate) {
        return res.status(400).json({ 
            error: "fromDate and toDate are required parameters" 
        });
    }

    // Validate date format
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    
    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
        return res.status(400).json({ 
            error: "Invalid date format. Use YYYY-MM-DD format" 
        });
    }

    if (fromDateObj > toDateObj) {
        return res.status(400).json({ 
            error: "fromDate cannot be greater than toDate" 
        });
    }

    Expenditure.getReport({ fromDate, toDate, category_id, payment_mode_id }, (err, results) => {
        if (err) {
            console.error("Error fetching expenditure report:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        // Calculate summary statistics
        const totalAmount = results.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalRecords = results.length;

        res.status(200).json({
            success: true,
            report: {
                summary: {
                    fromDate,
                    toDate,
                    totalRecords,
                    totalAmount: parseFloat(totalAmount.toFixed(2))
                },
                data: results
            }
        });
    });
};

// Get Expenditure Summary Report (Category-wise)
exports.getExpenditureSummary = (req, res) => {
    const { fromDate, toDate } = req.params;

    if (!fromDate || !toDate) {
        return res.status(400).json({ 
            error: "fromDate and toDate are required parameters" 
        });
    }

    // Validate date format
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    
    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
        return res.status(400).json({ 
            error: "Invalid date format. Use YYYY-MM-DD format" 
        });
    }

    if (fromDateObj > toDateObj) {
        return res.status(400).json({ 
            error: "fromDate cannot be greater than toDate" 
        });
    }

    Expenditure.getCategorySummary({ fromDate, toDate }, (err, results) => {
        if (err) {
            console.error("Error fetching expenditure summary:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const grandTotal = results.reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0);

        res.status(200).json({
            success: true,
            summary: {
                fromDate,
                toDate,
                grandTotal: parseFloat(grandTotal.toFixed(2)),
                categories: results
            }
        });
    });
};
