const express = require('express');
const router = express.Router();
const incomeController = require('../controller/incomeController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post', verifyNonTechnicalAccess, incomeController.addIncome);
router.get('/get', verifyNonTechnicalAccess, incomeController.getAllIncome);
router.get('/get/:id', verifyNonTechnicalAccess, incomeController.getIncomeById);
router.put('/update/:id', verifyNonTechnicalAccess, incomeController.updateIncomeById);
router.delete('/delete/:id', verifyNonTechnicalAccess, incomeController.deleteIncomeById);

module.exports = router;
