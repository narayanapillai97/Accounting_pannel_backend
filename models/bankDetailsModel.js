const db = require('../config/db');

const BankDetails = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO bank_details 
            (employee_id, bank_name, branch, ifsc_code, account_number, account_type, upi_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.employee_id,
            data.bank_name,
            data.branch || null,
            data.ifsc_code || null,
            data.account_number,
            data.account_type !== undefined ? data.account_type : 0,
            data.upi_id || null
        ];
        db.query(query, values, callback);
    },

    // Get All
    getAll: (callback) => {
        const query = `
            SELECT b.*, e.full_name, e.designation 
            FROM bank_details b
            JOIN employee_information e ON b.employee_id = e.id
        `;
        db.query(query, callback);
    },

    // Get By ID
    getById: (id, callback) => {
        const query = `
            SELECT b.*, e.full_name, e.designation 
            FROM bank_details b
            JOIN employee_information e ON b.employee_id = e.id
            WHERE b.id = ?
        `;
        db.query(query, [id], callback);
    },

    // Get By Employee ID
    getByEmployeeId: (employee_id, callback) => {
        const query = `
            SELECT * FROM bank_details WHERE employee_id = ?
        `;
        db.query(query, [employee_id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE bank_details 
            SET bank_name=?, branch=?, ifsc_code=?, account_number=?, account_type=?, upi_id=?
            WHERE id=?
        `;
        const values = [
            data.bank_name,
            data.branch || null,
            data.ifsc_code || null,
            data.account_number,
            data.account_type !== undefined ? data.account_type : 0,
            data.upi_id || null,
            id
        ];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM bank_details WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = BankDetails;
