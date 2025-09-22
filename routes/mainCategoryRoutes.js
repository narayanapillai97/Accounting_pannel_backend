const express = require('express');
const router = express.Router();
const mainCategoryController = require('../controller/mainCategoryController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post', verifyNonTechnicalAccess,mainCategoryController.addCategory);
router.get('/get', verifyNonTechnicalAccess,mainCategoryController.getAllCategories);
router.get('/get/:id',verifyNonTechnicalAccess, mainCategoryController.getCategoryById);
router.put('/update/:id', verifyNonTechnicalAccess,mainCategoryController.updateCategoryById);
router.delete('/delete/:id', verifyNonTechnicalAccess,mainCategoryController.deleteCategoryById);

module.exports = router;
