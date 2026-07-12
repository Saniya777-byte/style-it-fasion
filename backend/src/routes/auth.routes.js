const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { limitRequests } = require("../middleware/rateLimit.middleware");

const router = express.Router();

// Strict limits on signup and signin actions (15 actions per 15 minutes)
router.post("/register", limitRequests(15, 15), registerUser);
router.post("/login", limitRequests(15, 15), loginUser);
router.get("/me", protect, getMe);

module.exports = router;
