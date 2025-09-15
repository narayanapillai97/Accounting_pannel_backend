const express = require('express');
const vendorController = require('../controller/vendormasterController');
const router = express.Router();

router.post('/post', vendorController.addVendor);
router.get('/get', vendorController.getAllVendors);
router.get('/get/:id', vendorController.getVendorById);
router.put('/update/:id', vendorController.updateVendorById);
router.delete('/delete/:id', vendorController.deleteVendorById);

module.exports = router;
