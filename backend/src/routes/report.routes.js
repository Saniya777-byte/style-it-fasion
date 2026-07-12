const express = require("express");
const { getReports, getReportById } = require("../controllers/report.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getReports);
router.get("/:id", protect, getReportById);

module.exports = router;
