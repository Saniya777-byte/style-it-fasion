const prisma = require("../config/database");

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
    res.json(meetings);
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

      // Create Report
      const report = await prisma.report.create({
        data: {
          meetingId,
          complianceScore,
          transcript: `[00:01] Alex Rivera: Welcome everyone to our monthly compliance audit meeting. We need to go over the data flows and boundary boundaries for our customer database.
[01:15] Elena Rostova: I have checked the EU customer database. We have configured the replica clusters locally within Frankfurt. However, some log configurations are still routing through standard US endpoints.
[02:40] Marcus Vance: That might be an issue under GDPR Article 44 if telemetry logs contain personal IDs. We should enforce DNS binding immediately to restrict telemetry packets.
[04:20] Alex Rivera: Good point. Let's make sure we document this action item and implement the firewall rules before our next external audit.`,
          aiSummary: "The sync focused on verifying boundary compliance settings for the EU database. The team flagged telemetry packet leakage to US routes and proposed DNS binding mitigation rules.",
        },
      });

      // Insert associated Risks
      await prisma.risk.createMany({
        data: [
          {
            reportId: report.id,
            severity: "high",
            clause: "GDPR Article 44",
            description: "Telemetry logs containing user identity coordinates routing through US server boundaries.",
            timestamp: "01:15",
          },
          {
            reportId: report.id,
            severity: "medium",
            clause: "SOC 2 Type II CC6.3",
            description: "No dedicated encryption tags on the telemetry log channels.",
            timestamp: "02:40",
          },
        ],
      });

      // Insert Missing Clauses
      await prisma.missingClause.create({
        data: {
          reportId: report.id,
          clause: "Cross-Border Telemetry Data Boundaries",
          description: "Required under GDPR Article 44 to secure explicit consent or enforce technical isolation.",
          mitigation: "Deploy telemetry boundaries to filter out user personal coordinates before crossing borders.",
        },
      });

      // Insert Speaker Stats
      await prisma.speakerStat.createMany({
        data: [
          { reportId: report.id, name: "Alex Rivera", percentage: 50, sentiment: 82 },
          { reportId: report.id, name: "Elena Rostova", percentage: 30, sentiment: 75 },
          { reportId: report.id, name: "Marcus Vance", percentage: 20, sentiment: 88 },
        ],
      });

      // Insert Topic Dists
      await prisma.topicDist.createMany({
        data: [
          { reportId: report.id, topic: "GDPR boundaries", value: 45 },
          { reportId: report.id, topic: "Log configuration", value: 35 },
          { reportId: report.id, topic: "DNS firewall binding", value: 20 },
        ],
      });

      // Insert Speaking Timelines
      await prisma.speakingTimeline.createMany({
        data: [
          { reportId: report.id, timestamp: "00:00", alex: 30, elena: 0, marcus: 0 },
          { reportId: report.id, timestamp: "01:00", alex: 10, elena: 40, marcus: 0 },
          { reportId: report.id, timestamp: "02:00", alex: 0, elena: 10, marcus: 40 },
          { reportId: report.id, timestamp: "03:00", alex: 20, elena: 0, marcus: 20 },
        ],
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
