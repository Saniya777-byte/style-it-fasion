const prisma = require("../config/database");

// @desc    Get all compliance reports for the user
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    // Get all user meeting IDs first
    const meetings = await prisma.meeting.findMany({
      where: { userId: req.user.id },
      select: { id: true },
    });

    const meetingIds = meetings.map((m) => m.id);

    // Fetch reports belonging to those meetings
    const reports = await prisma.report.findMany({
      where: {
        meetingId: { in: meetingIds },
      },
      include: {
        meeting: true,
        risks: true,
        missingClauses: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reports);
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ message: "Server error while fetching reports" });
  }
};

// @desc    Get a single compliance report by ID
// @route   GET /api/reports/:id
// @access  Private
const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        meeting: true,
        risks: true,
        missingClauses: true,
        speakerStats: true,
        topicDists: true,
        timelines: true,
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Compliance report not found" });
    }

    // Verify ownership
    if (report.meeting.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view this report" });
    }

    res.json(report);
  } catch (error) {
    console.error("Get report by ID error:", error);
    res.status(500).json({ message: "Server error while fetching report details" });
  }
};

module.exports = {
  getReports,
  getReportById,
};
