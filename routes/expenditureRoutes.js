const express = require('express');
const router = express.Router();
const expenditureController = require('../controller/expenditureController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post', verifyNonTechnicalAccess, expenditureController.addExpenditure);
router.get('/get', verifyNonTechnicalAccess, expenditureController.getAllExpenditure);
router.get('/get/:id', verifyNonTechnicalAccess, expenditureController.getExpenditureById);
router.put('/update/:id', verifyNonTechnicalAccess, expenditureController.updateExpenditureById);
router.delete('/delete/:id', verifyNonTechnicalAccess, expenditureController.deleteExpenditureById);

router.get('/report/:fromDate/:toDate', verifyNonTechnicalAccess, expenditureController.getExpenditureReport);
router.get('/report/summary/:fromDate/:toDate', verifyNonTechnicalAccess, expenditureController.getExpenditureSummary);

module.exports = router;
