const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is missing in production!");
  }
  return jwt.sign({ id: userId }, secret || "veritas_secure_audit_secret_key_2026", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
