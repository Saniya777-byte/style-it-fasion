const express = require("express");
const { uploadMeeting, getMeetings, getMeetingById } = require("../controllers/meeting.controller");
const { protect } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadMeeting);
router.get("/", protect, getMeetings);
router.get("/:id", protect, getMeetingById);

module.exports = router;
