const express = require('express');
const router = express.Router();
const verificationController = require('../controller/verificationController');

// Routes
router.post('/post', verificationController.addVerification);
router.get('/get', verificationController.getAllVerifications);
router.get('/get/:id', verificationController.getVerificationById);
router.get('/getby-employee/:employee_id', verificationController.getVerificationByEmployeeId);
router.put('/update/:id', verificationController.updateVerificationById);
router.delete('/delete/:id', verificationController.deleteVerificationById);

module.exports = router;
