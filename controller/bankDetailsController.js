const BankDetails = require('../models/bankDetailsModel');

// Add Bank Detail
exports.addBankDetail = (req, res) => {
    const { employee_id, bank_name, branch, ifsc_code, account_number, account_type, upi_id } = req.body;

    if (!employee_id || !bank_name || !account_number) {
        return res.status(400).json({ error: "employee_id, bank_name, and account_number are required" });
    }

    BankDetails.create({ employee_id, bank_name, branch, ifsc_code, account_number, account_type, upi_id }, (err, result) => {
        if (err) {
            console.error("Error inserting bank detail:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Bank detail added successfully", bankDetailId: result.insertId });
    });
};

// Get All Bank Details
exports.getAllBankDetails = (req, res) => {
    BankDetails.getAll((err, results) => {
        if (err) {
            console.error("Error fetching bank details:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get Bank Detail by ID
exports.getBankDetailById = (req, res) => {
    const { id } = req.params;
    BankDetails.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching bank detail:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "Bank detail not found" });
        res.status(200).json(result[0]);
    });
};

// Get Bank Detail by Employee ID
exports.getBankDetailByEmployeeId = (req, res) => {
    const { employee_id } = req.params;
    BankDetails.getByEmployeeId(employee_id, (err, result) => {
        if (err) {
            console.error("Error fetching bank detail:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "No bank details for this employee" });
        res.status(200).json(result);
    });
};

// Update Bank Detail
exports.updateBankDetailById = (req, res) => {
    const { id } = req.params;
    const { bank_name, branch, ifsc_code, account_number, account_type, upi_id } = req.body;

    if (!bank_name || !account_number) {
        return res.status(400).json({ error: "bank_name and account_number are required" });
    }

    BankDetails.updateById(id, { bank_name, branch, ifsc_code, account_number, account_type, upi_id }, (err, result) => {
        if (err) {
            console.error("Error updating bank detail:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Bank detail not found" });
        res.status(200).json({ success: true, message: "Bank detail updated successfully" });
    });
};

// Delete Bank Detail
exports.deleteBankDetailById = (req, res) => {
    const { id } = req.params;
    BankDetails.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting bank detail:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Bank detail not found" });
        res.status(200).json({ success: true, message: "Bank detail deleted successfully" });
    });
};
