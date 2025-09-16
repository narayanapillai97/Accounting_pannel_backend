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

module.exports = { findUserByEmail, storeUserToken };