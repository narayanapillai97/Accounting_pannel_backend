const MainCategory = require('../models/mainCategoryModel');

// Add category
exports.addCategory = (req, res) => {
    const { category_name, description, status } = req.body;

    if (!category_name) {
        return res.status(400).json({ error: "category_name is required" });
    }

    MainCategory.create({ category_name, description, status }, (err, result) => {
        if (err) {
            console.error("Error adding category:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ success: true, message: "Category added successfully", categoryId: result.insertId });
    });
};

// Get all categories
exports.getAllCategories = (req, res) => {
    MainCategory.getAll((err, results) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
};

// Get category by ID
exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    MainCategory.getById(id, (err, result) => {
        if (err) {
            console.error("Error fetching category:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(result[0]);
    });
};

// Update category
exports.updateCategoryById = (req, res) => {
    const { id } = req.params;
    const { category_name, description, status } = req.body;

    if (!category_name) {
        return res.status(400).json({ error: "category_name is required" });
    }

    MainCategory.updateById(id, { category_name, description, status }, (err, result) => {
        if (err) {
            console.error("Error updating category:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found" });
        res.status(200).json({ success: true, message: "Category updated successfully" });
    });
};

// Delete category
exports.deleteCategoryById = (req, res) => {
    const { id } = req.params;
    MainCategory.deleteById(id, (err, result) => {
        if (err) {
            console.error("Error deleting category:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found" });
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    });
};
