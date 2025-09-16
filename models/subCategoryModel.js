const db = require("../config/db");

// Create Sub Category
const createSubCategory = (data, callback) => {
    const sql = `INSERT INTO sub_category 
        (main_category_id, sub_category_name, description, status) 
        VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.main_category_id, data.sub_category_name, data.description, data.status || 1], callback);
};

// Get All Sub Categories
const getAllSubCategories = (callback) => {
    const sql = `SELECT sc.*, mc.category_name 
                 FROM sub_category sc 
                 JOIN main_category mc ON sc.main_category_id = mc.id`;
    db.query(sql, callback);
};

// Get Sub Category by ID
const getSubCategoryById = (id, callback) => {
    const sql = `SELECT sc.*, mc.category_name 
                 FROM sub_category sc 
                 JOIN main_category mc ON sc.main_category_id = mc.id 
                 WHERE sc.id = ?`;
    db.query(sql, [id], callback);
};

// Update Sub Category
const updateSubCategory = (id, data, callback) => {
    const sql = `UPDATE sub_category 
                 SET main_category_id = ?, sub_category_name = ?, description = ?, status = ? 
                 WHERE id = ?`;
    db.query(sql, [data.main_category_id, data.sub_category_name, data.description, data.status, id], callback);
};

// Delete Sub Category
const deleteSubCategory = (id, callback) => {
    const sql = `DELETE FROM sub_category WHERE id = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
};
