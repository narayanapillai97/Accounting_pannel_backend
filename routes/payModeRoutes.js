const express = require('express');
const router = express.Router();
const payModeController = require('../controller/payModeController');

// Routes
router.post('/post', payModeController.addPayMode);
router.get('/get', payModeController.getAllPayModes);
router.get('/get/:id', payModeController.getPayModeById);
router.put('/update/:id', payModeController.updatePayModeById);
router.delete('/delete/:id', payModeController.deletePayModeById);

module.exports = router;
