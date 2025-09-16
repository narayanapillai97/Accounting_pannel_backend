const jwt = require("jsonwebtoken");

exports.verifyNonTechnicalAccess = (req, res, next) => {
  try {
    console.log("🛂 Starting token verification middleware");
    console.log("📨 Request URL:", req.url);
    console.log("📨 Request Method:", req.method);

    const authHeader = req.headers["authorization"];
    console.log("📩 Raw Authorization Header:", authHeader);
    console.log("📏 Authorization Header Length:", authHeader ? authHeader.length : 0);

    if (!authHeader) {
      console.log("❌ Authorization header missing");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // ✅ Accept Bearer or raw token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("🔑 Extracted Token:", token);
    console.log("📏 Extracted Token Length:", token ? token.length : 0);

    if (!token) {
      console.log("❌ Token missing after extraction");
      return res.status(401).json({ error: "Token missing" });
    }

    // Check JWT format - this is where the error occurs
    const tokenParts = token.split(".");
    console.log("🔍 Token parts count:", tokenParts.length);
    
    if (tokenParts.length !== 3) {
      console.error("❌ Malformed token - expected 3 parts, got:", tokenParts.length);
      console.log("📋 Token parts:", tokenParts);
      
      // Generate a test token to compare
      try {
        const testPayload = { id: 1, email: "test@example.com", role: "admin" };
        const testToken = jwt.sign(testPayload, process.env.SECRET_KEY, { expiresIn: "1h" });
        console.log("🧪 Complete token example:", testToken);
        console.log("🧪 Complete token length:", testToken.length);
        console.log("🧪 Complete token parts:", testToken.split('.').length);
      } catch (testError) {
        console.error("❌ Test token generation failed:", testError.message);
      }
      
      return res.status(401).json({ 
        error: "Malformed token received - token appears to be truncated",
        received_length: token.length,
        expected_length: "~200 characters"
      });
    }

    // Log each part separately
    console.log("📋 Token Header:", tokenParts[0]);
    console.log("📋 Token Payload:", tokenParts[1]);
    console.log("📋 Token Signature (first 20 chars):", tokenParts[2].substring(0, 20) + "...");

    console.log("🔐 Verifying token with secret key...");
    console.log("🔑 SECRET_KEY exists:", !!process.env.SECRET_KEY);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("❌ JWT Verify Error:", err.message);
        console.error("❌ JWT Verify Error name:", err.name);
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      console.log("✅ Token Decoded Successfully:");
      console.log("   👤 User ID:", decoded.id);
      console.log("   📧 Email:", decoded.email);
      console.log("   🎯 Role:", decoded.role);
      console.log("   ⏰ Expires:", new Date(decoded.exp * 1000).toLocaleString());
      
      req.user = decoded;
      console.log("➡️ Proceeding to next middleware/controller");
      next();
    });
  } catch (err) {
    console.error("🔥 Token Middleware Crash:", err);
    console.error("🔥 Stack trace:", err.stack);
    return res.status(500).json({ error: "Server error in token verification" });
  }
};