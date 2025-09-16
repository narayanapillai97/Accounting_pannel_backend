const db = require("../config/db");

// Create Variant
const createVariant = (data, callback) => {
    const sql = `INSERT INTO variant (variant_name, option_values, description) VALUES (?, ?, ?)`;
    db.query(sql, [data.variant_name, data.option_values, data.description], callback);
};

// Get All Variants
const getAllVariants = (callback) => {
    const sql = `SELECT * FROM variant`;
    db.query(sql, callback);
};

// Get Variant By ID
const getVariantById = (id, callback) => {
    const sql = `SELECT * FROM variant WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Update Variant
const updateVariant = (id, data, callback) => {
    const sql = `UPDATE variant 
                 SET variant_name = ?, option_values = ?, description = ? 
                 WHERE id = ?`;
    db.query(sql, [data.variant_name, data.option_values, data.description, id], callback);
};

// Delete Variant
const deleteVariant = (id, callback) => {
    const sql = `DELETE FROM variant WHERE id = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    createVariant,
    getAllVariants,
    getVariantById,
    updateVariant,
    deleteVariant
};
