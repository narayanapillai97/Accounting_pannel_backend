const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

// Routes
router.post('/post', verifyNonTechnicalAccess,employeeController.addEmployee);
router.get('/get', verifyNonTechnicalAccess,employeeController.getAllEmployees);
router.get('/get/:id',verifyNonTechnicalAccess, employeeController.getEmployeeById);
router.put('/update/:id', verifyNonTechnicalAccess,employeeController.updateEmployeeById);
router.delete('/delete/:id', verifyNonTechnicalAccess,employeeController.deleteEmployeeById);

module.exports = router;
