const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByEmail, storeUserToken } = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Step 2: Verify password (supports both hashed & plain text)
    let isMatch = false;

    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      // If password looks like a bcrypt hash → compare with bcrypt
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Fallback for plain text (for now)
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Step 3: Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Step 4: Store token in DB
    await storeUserToken(user.id, token);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
