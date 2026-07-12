const prisma = require("../config/database");
const {
  generateTranscript,
  generateAISummary,
  generateRisks,
  generateMissingClauses,
  generateSpeakerStats,
  generateTopicDists,
  generateSpeakingTimeline
} = require("../utils/meetingDataGenerator");

// helper to format file size
const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// @desc    Upload a meeting recording or document
// @route   POST /api/meetings/upload
// @access  Private
const uploadMeeting = async (req, res) => {
  const { title, company, country, complianceFramework, language, date } = req.body;

  if (!title || !company || !complianceFramework) {
    return res.status(400).json({ message: "Please provide title, company, and framework options" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Please upload a valid audio/video/document file" });
  }

  try {
    const meetingDate = date ? new Date(date) : new Date();
    const durationString = "12m 45s"; // default mock duration
    const sizeString = formatBytes(req.file.size);

    const meeting = await prisma.meeting.create({
      data: {
        title,
        company,
        date: meetingDate,
        duration: durationString,
        fileSize: sizeString,
        fileName: req.file.originalname,
        filePath: req.file.path,
        status: "Processing",
        language: language || "English",
        country: country || "United States",
        complianceFramework,
        userId: req.user.id,
      },
    });

    // Start background simulation to populate reports and risks after a 15-second delay
    triggerBackgroundAIJob(meeting.id);

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Meeting upload error:", error);
    res.status(500).json({ message: "Server error during meeting upload" });
  }
};

// @desc    Get all meetings for the logged-in user
// @route   GET /api/meetings
// @access  Private
const getMeetings = async (req, res) => {
  try {
    const meetings = await prisma.meeting.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: { report: true },
    });
    res.json({ meetings });
  } catch (error) {
    console.error("Fetch meetings error:", error);
    res.status(500).json({ message: "Server error while fetching meetings" });
  }
};

// @desc    Get a single meeting detail
// @route   GET /api/meetings/:id
// @access  Private
const getMeetingById = async (req, res) => {
  const { id } = req.params;

  try {
    const meeting = await prisma.meeting.findFirst({
      where: { id, userId: req.user.id },
      include: { report: true },
    });

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(meeting);
  } catch (error) {
    console.error("Fetch meeting error:", error);
    res.status(500).json({ message: "Server error while fetching meeting" });
  }
};

// SIMULATE AI WORKER
const triggerBackgroundAIJob = (meetingId) => {
  setTimeout(async () => {
    try {
      // Find the meeting to see details
      const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
      if (!meeting) return;

      const complianceScore = Math.floor(Math.random() * 25) + 75; // 75% to 100%

      // Generate meeting-specific data
      const transcript = generateTranscript(meeting);
      const aiSummary = generateAISummary(meeting);
      const risks = generateRisks(meeting);
      const missingClause = generateMissingClauses(meeting);
      const speakerStats = generateSpeakerStats(meeting);
      const topicDists = generateTopicDists(meeting);
      const speakingTimeline = generateSpeakingTimeline(meeting);

      // Create Report
      const report = await prisma.report.create({
        data: {
          meetingId,
          complianceScore,
          transcript,
          aiSummary,
        },
      });

      // Insert associated Risks
      await prisma.risk.createMany({
        data: risks.map(risk => ({
          reportId: report.id,
          severity: risk.severity,
          clause: risk.clause,
          description: risk.description,
          timestamp: risk.timestamp,
        })),
      });

      // Insert Missing Clauses
      await prisma.missingClause.create({
        data: {
          reportId: report.id,
          clause: missingClause.clause,
          description: missingClause.description,
          mitigation: missingClause.mitigation,
        },
      });

      // Insert Speaker Stats
      await prisma.speakerStat.createMany({
        data: speakerStats.map(stat => ({
          reportId: report.id,
          name: stat.name,
          percentage: stat.percentage,
          sentiment: stat.sentiment,
        })),
      });

      // Insert Topic Dists
      await prisma.topicDist.createMany({
        data: topicDists.map(topic => ({
          reportId: report.id,
          topic: topic.topic,
          value: topic.value,
        })),
      });

      // Insert Speaking Timelines
      await prisma.speakingTimeline.createMany({
        data: speakingTimeline.map(timeline => ({
          reportId: report.id,
          timestamp: timeline.timestamp,
          alex: timeline.alex,
          elena: timeline.elena,
          marcus: timeline.marcus,
        })),
      });

      // Update Meeting Status to complete
      await prisma.meeting.update({
        where: { id: meetingId },
        data: { status: "Completed" },
      });

      console.log(`[AI Worker] Finished parsing and compliance audit for Meeting ID: ${meetingId}`);
    } catch (err) {
      console.error("[AI Worker] Error simulating meeting analysis:", err);
    }
  }, 15000); // 15 seconds delay
};

module.exports = {
  uploadMeeting,
  getMeetings,
  getMeetingById,
};
