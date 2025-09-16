const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByEmail, storeUserToken } = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    console.log("🔐 Login attempt received");
    console.log("📧 Email:", req.body.email);
    
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    console.log("👤 User found:", user ? `ID: ${user.id}, Role: ${user.role}` : "No user found");

    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    let isMatch = false;
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      console.log("🔒 Using bcrypt comparison");
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      console.log("🔓 Using plain text comparison");
      isMatch = password === user.password;
    }

    console.log("✅ Password match result:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT token
    const tokenPayload = { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    console.log("📝 Token payload:", tokenPayload);
    
    const token = jwt.sign(
      tokenPayload,
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("🆕 Generated Token Length:", token.length);
    console.log("🆕 Generated Token (complete):", token);
    console.log("🆕 Token Parts Count:", token.split('.').length);

    // Store token in database
    console.log("💾 Storing token in database for user ID:", user.id);
    await storeUserToken(user.id, token);
    console.log("✅ Token stored successfully");

    const responseData = {
      message: "Login successful",
      token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };

    console.log("📤 Response token length:", responseData.token.length);
    console.log("✅ Login completed successfully");

    res.status(200).json(responseData);

  } catch (error) {
    console.error("❌ Login Error:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add test endpoint for token generation
exports.generateTestToken = async (req, res) => {
  try {
    const testPayload = { 
      id: 1, 
      email: "test@example.com", 
      role: "admin" 
    };
    
    const testToken = jwt.sign(
      testPayload,
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("🧪 Test Token Generated:");
    console.log("📝 Token:", testToken);
    console.log("📏 Length:", testToken.length);
    console.log("🔢 Parts:", testToken.split('.').length);

    res.status(200).json({
      message: "Test token generated",
      token: testToken,
      length: testToken.length,
      parts: testToken.split('.').length
    });

  } catch (error) {
    console.error("❌ Test token generation error:", error);
    res.status(500).json({ message: "Test token generation failed" });
  }
};