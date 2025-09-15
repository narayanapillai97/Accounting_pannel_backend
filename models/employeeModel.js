const db = require('../config/db');

// Employee Information Model
const Employee = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO employee_information 
            (full_name, designation, department, mobile_number, email, joining_date, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.full_name,
            data.designation || null,
            data.department || null,
            data.mobile_number,
            data.email,
            data.joining_date || null,
            data.status !== undefined ? data.status : 1
        ];
        db.query(query, values, callback);
    },

    // Get All
    getAll: (callback) => {
        const query = `SELECT * FROM employee_information`;
        db.query(query, callback);
    },

    // Get By ID
    getById: (id, callback) => {
        const query = `SELECT * FROM employee_information WHERE id = ?`;
        db.query(query, [id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE employee_information 
            SET full_name=?, designation=?, department=?, mobile_number=?, email=?, joining_date=?, status=? 
            WHERE id=?
        `;
        const values = [
            data.full_name,
            data.designation || null,
            data.department || null,
            data.mobile_number,
            data.email,
            data.joining_date || null,
            data.status,
            id
        ];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM employee_information WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = Employee;
