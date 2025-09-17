const express = require('express');
const router = express.Router();
const payModeController = require('../controller/payModeController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post',verifyNonTechnicalAccess, payModeController.addPayMode);
router.get('/get', verifyNonTechnicalAccess,payModeController.getAllPayModes);
router.get('/get/:id', verifyNonTechnicalAccess,payModeController.getPayModeById);
router.put('/update/:id', verifyNonTechnicalAccess,payModeController.updatePayModeById);
router.delete('/delete/,:id', verifyNonTechnicalAccess,payModeController.deletePayModeById);

module.exports = router;
