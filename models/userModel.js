const db = require("../config/db");

// Check user by email/username
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Store token in user_access table
const storeUserToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO user_access (user_id, token, created_at) VALUES (?, ?, NOW())";
    db.query(query, [userId, token], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { findUserByEmail, storeUserToken };
