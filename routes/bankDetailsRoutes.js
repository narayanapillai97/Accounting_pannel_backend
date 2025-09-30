const express = require('express');
const router = express.Router();
const bankDetailsController = require('../controller/bankDetailsController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post', verifyNonTechnicalAccess,bankDetailsController.addBankDetail);
router.get('/get',verifyNonTechnicalAccess, bankDetailsController.getAllBankDetails);
router.get('/get/:id',verifyNonTechnicalAccess, bankDetailsController.getBankDetailById);
router.get('/getby-employee/:employee_id', verifyNonTechnicalAccess,bankDetailsController.getBankDetailByEmployeeId);
router.put('/update/:id',verifyNonTechnicalAccess, bankDetailsController.updateBankDetailById);
router.delete('/delete/:id', verifyNonTechnicalAccess,bankDetailsController.deleteBankDetailById);

module.exports = router;
