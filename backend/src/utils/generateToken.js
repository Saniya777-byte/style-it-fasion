const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "veritas_secure_audit_secret_key_2026", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
