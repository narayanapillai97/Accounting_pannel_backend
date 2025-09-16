const SubCategory = require("../models/subCategoryModel");

// Create
exports.createSubCategory = (req, res) => {
    SubCategory.createSubCategory(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Sub Category created successfully", id: results.insertId });
    });
};

// Get All
exports.getAllSubCategories = (req, res) => {
    SubCategory.getAllSubCategories((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get By ID
exports.getSubCategoryById = (req, res) => {
    SubCategory.getSubCategoryById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Sub Category not found" });
        res.json(results[0]);
    });
};

// Update
exports.updateSubCategory = (req, res) => {
    SubCategory.updateSubCategory(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Sub Category updated successfully" });
    });
};

// Delete
exports.deleteSubCategory = (req, res) => {
    SubCategory.deleteSubCategory(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Sub Category deleted successfully" });
    });
};
