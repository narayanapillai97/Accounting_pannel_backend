const express = require('express');
const vendorController = require('../controller/vendormasterController');
const router = express.Router();
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// The middleware is added as the second argument for each route.
// Express will now automatically run it before calling the controller function.
router.post('/post', verifyNonTechnicalAccess, vendorController.addVendor);
router.get("/get", verifyNonTechnicalAccess, vendorController.getAllVendors);
router.get('/get/:id', verifyNonTechnicalAccess, vendorController.getVendorById);
router.put('/update/:id', verifyNonTechnicalAccess, vendorController.updateVendorById);
router.delete('/delete/:id', verifyNonTechnicalAccess, vendorController.deleteVendorById);

module.exports = router;