const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();

const bodyParser = require("body-parser");
const vendormasterRoutes = require("./routes/vendormasterRoutes");
const employeeRoutes = require('./routes/employeeRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const bankDetailsRoutes = require('./routes/bankDetailsRoutes');
const payModeRoutes = require('./routes/payModeRoutes');
const authRoutes = require("./routes/authRoutes");
const mainCategoryRoutes = require('./routes/mainCategoryRoutes');
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const variantRoutes = require("./routes/variantRoutes");
const income = require ("./routes/incomeRoutes");
const expenditureRoutes = require('./routes/expenditureRoutes');

// Middleware
app.use(express.static("image"));
app.use(cors());
app.use(bodyParser.json());


// Route
app.use("/vendormaster",vendormasterRoutes);
app.use('/employee', employeeRoutes);
app.use('/verification', verificationRoutes);
app.use('/bankdetails', bankDetailsRoutes);
app.use('/paymode', payModeRoutes);
app.use("/authRoutes", authRoutes);
app.use('/maincategory', mainCategoryRoutes);
app.use("/subcategory", subCategoryRoutes);
app.use("/variant", variantRoutes);
app.use("/income",income);
app.use('/expenditure', expenditureRoutes);


// Start the servers
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// module.exports = router;
