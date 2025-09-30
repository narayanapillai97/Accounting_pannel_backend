const db = require("../config/db");

// Check user by email/username
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    console.log("🔍 Searching for user with email:", email);
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("❌ Database error in findUserByEmail:", err);
        return reject(err);
      }
      console.log("📊 Database results:", results.length, "users found");
      resolve(results[0]);
    });
  });
};

// Store token in user_access table
const storeUserToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    console.log("💾 Storing token for user ID:", userId);
    console.log("💾 Token length to store:", token.length);
    
    const query =
      "INSERT INTO user_access (user_id, token, created_at) VALUES (?, ?, NOW())";
    db.query(query, [userId, token], (err, result) => {
      if (err) {
        console.error("❌ Database error in storeUserToken:", err);
        return reject(err);
      }
      console.log("✅ Token stored successfully in database");
      console.log("📋 Database insert result:", result);
      resolve(result);
    });
  });
};

// NEW USER MANAGEMENT FUNCTIONS

// Get all users
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    console.log("🔍 Fetching all users");
    const query = "SELECT id, full_name, email, mobile_number, role, status, created_at, updated_at FROM users ORDER BY created_at DESC";
    db.query(query, (err, results) => {
      if (err) {
        console.error("❌ Database error in getAllUsers:", err);
        return reject(err);
      }
      console.log("📊 Users found:", results.length);
      resolve(results);
    });
  });
};

// Get user by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    console.log("🔍 Fetching user with ID:", id);
    const query = "SELECT id, full_name, email, mobile_number, role, status, created_at, updated_at FROM users WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("❌ Database error in getUserById:", err);
        return reject(err);
      }
      console.log("📊 User found:", results.length > 0 ? "Yes" : "No");
      resolve(results[0]);
    });
  });
};

// Create new user
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    console.log("🆕 Creating new user:", userData.email);
    const { full_name, email, password, mobile_number, role, status } = userData;
    
    const query = `
      INSERT INTO users (full_name, email, password, mobile_number, role, status, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    db.query(query, [full_name, email, password, mobile_number, role, status], (err, result) => {
      if (err) {
        console.error("❌ Database error in createUser:", err);
        return reject(err);
      }
      console.log("✅ User created successfully with ID:", result.insertId);
      resolve(result.insertId);
    });
  });
};

// Update user
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    console.log("✏️ Updating user ID:", id);
    const { full_name, email, mobile_number, role, status } = userData;
    
    let query, params;
    
    if (userData.password) {
      query = `
        UPDATE users 
        SET full_name = ?, email = ?, password = ?, mobile_number = ?, role = ?, status = ?, updated_at = NOW() 
        WHERE id = ?
      `;
      params = [full_name, email, userData.password, mobile_number, role, status, id];
    } else {
      query = `
        UPDATE users 
        SET full_name = ?, email = ?, mobile_number = ?, role = ?, status = ?, updated_at = NOW() 
        WHERE id = ?
      `;
      params = [full_name, email, mobile_number, role, status, id];
    }
    
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("❌ Database error in updateUser:", err);
        return reject(err);
      }
      console.log("✅ User updated successfully");
      resolve(result);
    });
  });
};

// Delete user
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    console.log("🗑️ Deleting user ID:", id);
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("❌ Database error in deleteUser:", err);
        return reject(err);
      }
      console.log("✅ User deleted successfully");
      resolve(result);
    });
  });
};

// Search users
const searchUsers = (searchTerm) => {
  return new Promise((resolve, reject) => {
    console.log("🔍 Searching users with term:", searchTerm);
    const term = `%${searchTerm}%`;
    const query = `
      SELECT id, full_name, email, mobile_number, role, status, created_at, updated_at 
      FROM users 
      WHERE full_name LIKE ? OR email LIKE ? OR mobile_number LIKE ? OR role LIKE ?
      ORDER BY created_at DESC
    `;
    
    db.query(query, [term, term, term, term], (err, results) => {
      if (err) {
        console.error("❌ Database error in searchUsers:", err);
        return reject(err);
      }
      console.log("📊 Search results:", results.length);
      resolve(results);
    });
  });
};

// Check if email exists
const checkEmailExists = (email, excludeId = null) => {
  return new Promise((resolve, reject) => {
    console.log("📧 Checking if email exists:", email);
    let query = "SELECT id FROM users WHERE email = ?";
    let params = [email];
    
    if (excludeId) {
      query += " AND id != ?";
      params.push(excludeId);
    }
    
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("❌ Database error in checkEmailExists:", err);
        return reject(err);
      }
      console.log("📊 Email exists:", results.length > 0);
      resolve(results.length > 0);
    });
  });
};

module.exports = { 
  findUserByEmail, 
  storeUserToken,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  checkEmailExists
};