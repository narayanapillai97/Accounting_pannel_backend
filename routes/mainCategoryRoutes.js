const express = require('express');
const router = express.Router();
const mainCategoryController = require('../controller/mainCategoryController');

// Routes
router.post('/post', mainCategoryController.addCategory);
router.get('/get', mainCategoryController.getAllCategories);
router.get('/get/:id', mainCategoryController.getCategoryById);
router.put('/update/:id', mainCategoryController.updateCategoryById);
router.delete('/delete/:id', mainCategoryController.deleteCategoryById);

module.exports = router;
