const Employee = require('../models/employeeModel');

// Add Employee
exports.addEmployee = (req, res) => {
    const { full_name, designation, department, mobile_number, email, joining_date, status } = req.body;

    if (!full_name || !mobile_number || !email) {
        return res.status(400).json({ error: "full_name, mobile_number, and email are required" });
    }

    Employee.create({ full_name, designation, department, mobile_number, email, joining_date, status }, (err, result) => {
        if (err) {
            console.error("Error inserting employee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Employee added successfully", employeeId: result.insertId });
    });
};

// Get All Employees
exports.getAllEmployees = (req, res) => {
    Employee.getAll((err, results) => {
        if (err) {
            console.error("Error fetching employees:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get Employee By ID
exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    Employee.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching employee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update Employee
exports.updateEmployeeById = (req, res) => {
    const { id } = req.params;
    const { full_name, designation, department, mobile_number, email, joining_date, status } = req.body;

    if (!full_name || !mobile_number || !email) {
        return res.status(400).json({ error: "full_name, mobile_number, and email are required" });
    }

    Employee.updateById(id, { full_name, designation, department, mobile_number, email, joining_date, status }, (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee updated successfully" });
    });
};

// Delete Employee
exports.deleteEmployeeById = (req, res) => {
    const { id } = req.params;
    Employee.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting employee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    });
};
