const express = require('express');
const router = express.Router();
const verificationController = require('../controller/verificationController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");


// Routes
router.post('/post', verifyNonTechnicalAccess,verificationController.addVerification);
router.get('/get', verifyNonTechnicalAccess,verificationController.getAllVerifications);
router.get('/get/:id',verifyNonTechnicalAccess, verificationController.getVerificationById);
router.get('/getby-employee/:employee_id', verifyNonTechnicalAccess,verificationController.getVerificationByEmployeeId);
router.put('/update/:id', verifyNonTechnicalAccess,verificationController.updateVerificationById);
router.delete('/delete/:id',verifyNonTechnicalAccess, verificationController.deleteVerificationById);

module.exports = router;
