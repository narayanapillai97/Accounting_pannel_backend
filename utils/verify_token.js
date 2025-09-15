const jwt = require("jsonwebtoken");
const db = require("../config/db");

// const verifyTechnicalAccess = (token) => {
//   return new Promise((resolve, reject) => {
//     // Step 1: Check if token exists in the user_access table
//     const query = "SELECT * FROM user_access WHERE token = ?";
//     db.query(query, [token], (err, results) => {
//       if (err) {
//         return reject({ status: 500, message: "Internal server error" });
//       }

//       // Step 2: If token doesn't exist, reject
//       if (results.length === 0) {
//         return reject({
//           status: 401,
//           message: "Unauthorized access: Token not found in database",
//         });
//       }

//       // Step 3: Token exists, proceed with JWT verification
//       jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//           return reject({
//             status: 401,
//             message: "Unauthorized access: Invalid or expired token",
//           });
//         }

//         // Step 4: Verification successful
//         resolve(decoded);
//       });
//     });
//   });
// };

// module.exports = { verifyTechnicalAccess };

// const jwt = require("jsonwebtoken");
// const db = require("../config/db");

const verifyNonTechnicalAccess = (token) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user_access WHERE token = ?";
    db.query(query, [token], (err, results) => {
      if (err) {
        return reject({ status: 500, message: "Internal server error" });
      }

      if (results.length === 0) {
        return reject({
          status: 401,
          message: "Token not found in user access",
        });
      }

      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return reject({ status: 401, message: "Invalid or expired token" });
        }
        resolve(decoded);
      });
    });
  });
};

// const verifyTechnicalAccess = (token) => {
//   return new Promise((resolve, reject) => {
//     const query = "SELECT * FROM technical_access WHERE token = ?";
//     db.query(query, [token], (err, results) => {
//       if (err) {
//         return reject({ status: 500, message: "Internal server error" });
//       }

//       if (results.length === 0) {
//         return reject({
//           status: 401,
//           message: "Token not found in technical access",
//         });
//       }

//       jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//           return reject({ status: 401, message: "Invalid or expired token" });
//         }
//         resolve(decoded);
//       });
//     });
//   });
// };

module.exports = { verifyNonTechnicalAccess };
