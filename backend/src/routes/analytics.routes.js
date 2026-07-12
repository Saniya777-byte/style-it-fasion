const express = require("express");
const { getWorkspaceAnalytics } = require("../controllers/analytics.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getWorkspaceAnalytics);

module.exports = router;
