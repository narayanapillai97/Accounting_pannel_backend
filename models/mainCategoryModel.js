const db = require('../config/db');

const MainCategory = {
    // Create category
    create: (data, callback) => {
        const query = `
            INSERT INTO main_category (category_name, description, status)
            VALUES (?, ?, ?)
        `;
        const values = [data.category_name, data.description || null, data.status ?? 1];
        db.query(query, values, callback);
    },

    // Get all
    getAll: (callback) => {
        const query = `SELECT * FROM main_category`;
        db.query(query, callback);
    },

    // Get by ID
    getById: (id, callback) => {
        const query = `SELECT * FROM main_category WHERE id = ?`;
        db.query(query, [id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE main_category
            SET category_name=?, description=?, status=?
            WHERE id=?
        `;
        const values = [data.category_name, data.description || null, data.status ?? 1, id];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM main_category WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = MainCategory;
