const Verification = require('../models/verificationModel');

// Add Verification
exports.addVerification = (req, res) => {
    const { employee_id, aadhar_number, pan_number, passport_no, verification_date, verified_by, status } = req.body;

    if (!employee_id) {
        return res.status(400).json({ error: "employee_id is required" });
    }

    Verification.create({ employee_id, aadhar_number, pan_number, passport_no, verification_date, verified_by, status }, (err, result) => {
        if (err) {
            console.error("Error inserting verification:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Verification added successfully", verificationId: result.insertId });
    });
};

// Get All
exports.getAllVerifications = (req, res) => {
    Verification.getAll((err, results) => {
        if (err) {
            console.error("Error fetching verifications:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get By ID
exports.getVerificationById = (req, res) => {
    const { id } = req.params;
    Verification.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching verification:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Verification not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Get By Employee ID
exports.getVerificationByEmployeeId = (req, res) => {
    const { employee_id } = req.params;
    Verification.getByEmployeeId(employee_id, (err, result) => {
        if (err) {
            console.error("Error fetching verification:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "No verification record for this employee" });
        }
        res.status(200).json(result);
    });
};

// Update
exports.updateVerificationById = (req, res) => {
    const { id } = req.params;
    const { aadhar_number, pan_number, passport_no, verification_date, verified_by, status } = req.body;

    Verification.updateById(id, { aadhar_number, pan_number, passport_no, verification_date, verified_by, status }, (err, result) => {
        if (err) {
            console.error("Error updating verification:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Verification not found" });
        }
        res.status(200).json({ success: true, message: "Verification updated successfully" });
    });
};

// Delete
exports.deleteVerificationById = (req, res) => {
    const { id } = req.params;
    Verification.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting verification:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Verification not found" });
        }
        res.status(200).json({ success: true, message: "Verification deleted successfully" });
    });
};
