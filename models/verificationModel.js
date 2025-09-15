const db = require('../config/db');

// Verification Model
const Verification = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO verification 
            (employee_id, aadhar_number, pan_number, passport_no, verification_date, verified_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.employee_id,
            data.aadhar_number || null,
            data.pan_number || null,
            data.passport_no || null,
            data.verification_date || null,
            data.verified_by || null,
            data.status !== undefined ? data.status : 0
        ];
        db.query(query, values, callback);
    },

    // Get All
    getAll: (callback) => {
        const query = `
            SELECT v.*, e.full_name, e.designation, e.department 
            FROM verification v
            JOIN employee_information e ON v.employee_id = e.id
        `;
        db.query(query, callback);
    },

    // Get By ID
    getById: (id, callback) => {
        const query = `
            SELECT v.*, e.full_name, e.designation, e.department 
            FROM verification v
            JOIN employee_information e ON v.employee_id = e.id
            WHERE v.id = ?
        `;
        db.query(query, [id], callback);
    },

    // Get By Employee ID
    getByEmployeeId: (employee_id, callback) => {
        const query = `
            SELECT * FROM verification WHERE employee_id = ?
        `;
        db.query(query, [employee_id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE verification 
            SET aadhar_number=?, pan_number=?, passport_no=?, verification_date=?, verified_by=?, status=?
            WHERE id=?
        `;
        const values = [
            data.aadhar_number || null,
            data.pan_number || null,
            data.passport_no || null,
            data.verification_date || null,
            data.verified_by || null,
            data.status,
            id
        ];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM verification WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = Verification;
