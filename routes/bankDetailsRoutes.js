const express = require('express');
const router = express.Router();
const bankDetailsController = require('../controller/bankDetailsController');

// Routes
router.post('/post', bankDetailsController.addBankDetail);
router.get('/get', bankDetailsController.getAllBankDetails);
router.get('/get/:id', bankDetailsController.getBankDetailById);
router.get('/getby-employee/:employee_id', bankDetailsController.getBankDetailByEmployeeId);
router.put('/update/:id', bankDetailsController.updateBankDetailById);
router.delete('/delete/:id', bankDetailsController.deleteBankDetailById);

module.exports = router;
