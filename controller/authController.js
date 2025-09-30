const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { 
  findUserByEmail, 
  storeUserToken,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  checkEmailExists
} = require("../models/userModel");

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
      { expiresIn: "7d" }
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
      { expiresIn: "7d" }
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

// NEW USER MANAGEMENT CONTROLLERS

// Get all users
exports.getUsers = async (req, res) => {
  try {
    console.log("📋 Fetching all users");
    const users = await getAllUsers();
    
    res.status(200).json({
      message: "Users fetched successfully",
      data: users
    });
    
  } catch (error) {
    console.error("❌ Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("👤 Fetching user by ID:", id);
    
    const user = await getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "User fetched successfully",
      data: user
    });
    
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    console.log("🆕 Creating new user");
    const { full_name, email, password, mobile_number, role, status } = req.body;
    
    // Validate required fields
    if (!full_name || !email || !password || !mobile_number) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
      full_name,
      email,
      password: hashedPassword,
      mobile_number,
      role: role || "user",
      status: status !== undefined ? status : 1
    };
    
    const userId = await createUser(userData);
    
    // Get the created user
    const newUser = await getUserById(userId);
    
    res.status(201).json({
      message: "User created successfully",
      data: newUser
    });
    
  } catch (error) {
    console.error("❌ Create user error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("✏️ Updating user ID:", id);
    
    const { full_name, email, password, mobile_number, role, status } = req.body;
    
    // Check if user exists
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if email is taken by another user
    if (email && email !== existingUser.email) {
      const emailExists = await checkEmailExists(email, id);
      if (emailExists) {
        return res.status(400).json({ message: "Email already taken by another user" });
      }
    }
    
    const userData = {
      full_name: full_name || existingUser.full_name,
      email: email || existingUser.email,
      mobile_number: mobile_number || existingUser.mobile_number,
      role: role || existingUser.role,
      status: status !== undefined ? status : existingUser.status
    };
    
    // Only update password if provided
    if (password && password.trim() !== "") {
      userData.password = await bcrypt.hash(password, 10);
    }
    
    await updateUser(id, userData);
    
    // Get the updated user
    const updatedUser = await getUserById(id);
    
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });
    
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ Deleting user ID:", id);
    
    // Check if user exists
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    await deleteUser(id);
    
    res.status(200).json({
      message: "User deleted successfully"
    });
    
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    console.log("🔍 Searching users with query:", q);
    
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const users = await searchUsers(q);
    
    res.status(200).json({
      message: "Users search completed",
      data: users
    });
    
  } catch (error) {
    console.error("❌ Search users error:", error);
    res.status(500).json({ message: "Failed to search users" });
  }
};