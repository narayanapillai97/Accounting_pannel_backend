const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

// Routes
router.post('/post', employeeController.addEmployee);
router.get('/get', employeeController.getAllEmployees);
router.get('/get/:id', employeeController.getEmployeeById);
router.put('/update/:id', employeeController.updateEmployeeById);
router.delete('/delete/:id', employeeController.deleteEmployeeById);

module.exports = router;
