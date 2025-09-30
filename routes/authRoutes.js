const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

console.log("🛣️ Setting up auth routes...");

// Login route with debug middleware
router.post("/login", (req, res, next) => {
  console.log("📍 Login route hit");
  console.log("📨 Request body email:", req.body.email);
  console.log("📨 Request body password length:", req.body.password ? req.body.password.length : 0);
  next();
}, authController.login);

// Test token generation endpoint
router.get("/test-token", authController.generateTestToken);

// Debug headers endpoint
router.get("/debug-headers", (req, res) => {
  console.log("📨 Headers received:");
  Object.entries(req.headers).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  console.log("🔑 Authorization header:", req.headers.authorization);
  if (req.headers.authorization) {
    console.log("📏 Auth header length:", req.headers.authorization.length);
  }

  res.json({ 
    headers: req.headers,
    authHeader: req.headers.authorization,
    authHeaderLength: req.headers.authorization ? req.headers.authorization.length : 0
  });
});

// User management routes - ADD THESE NEW ROUTES
router.get("/get", authController.getUsers);
router.get("/getby/:id", authController.getUserById);
router.post("/post", authController.createUser);
router.put("/update/:id", authController.updateUser);
router.delete("/delete/:id", authController.deleteUser);
router.get("/users/search", authController.searchUsers);

console.log("✅ Auth routes configured");
module.exports = router;