const db = require('../config/db');

const PayModeMaster = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO pay_mode_master (payment_method, description)
            VALUES (?, ?)
        `;
        const values = [data.payment_method, data.description || null];
        db.query(query, values, callback);
    },

    // Get All
    getAll: (callback) => {
        const query = `SELECT * FROM pay_mode_master`;
        db.query(query, callback);
    },

    // Get By ID
    getById: (id, callback) => {
        const query = `SELECT * FROM pay_mode_master WHERE id = ?`;
        db.query(query, [id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE pay_mode_master 
            SET payment_method=?, description=?
            WHERE id=?
        `;
        const values = [data.payment_method, data.description || null, id];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM pay_mode_master WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = PayModeMaster;
