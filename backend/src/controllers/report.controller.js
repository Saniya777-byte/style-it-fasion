const prisma = require("../config/database");
const { generateKeyDecisions, generateActionItems } = require("../utils/meetingDataGenerator");

const formatReportResponse = (report, meetingData = null) => {
  if (!report && !meetingData) return null;

  const meeting = meetingData || report.meeting || {};
  const reportId = report ? report.id : null;
  const meetingId = meeting.id;

  // Parse transcript
  const transcriptLines = [];
  if (report && report.transcript) {
    const lines = report.transcript.split("\n");
    lines.forEach((line, idx) => {
      const match = line.match(/^\[(\d{2}:\d{2})\]\s+([^:]+):\s+(.*)$/);
      if (match) {
        transcriptLines.push({
          id: idx + 1,
          time: match[1],
          speaker: match[2],
          text: match[3]
        });
      } else {
        // Fallback for non-standard lines
        transcriptLines.push({
          id: idx + 1,
          time: "00:00",
          speaker: "Speaker",
          text: line
        });
      }
    });
  }

  // Generate keyDecisions and actionItems based on meeting-specific data
  const keyDecisions = generateKeyDecisions(meeting);
  const actionItems = generateActionItems(meeting);

  // Format speakers
  const speakers = (report?.speakerStats || []).map((s, idx) => ({
    id: s.id,
    name: s.name,
    talkTime: `${Math.round(s.percentage * 0.4)}m`,
    percentage: s.percentage,
    role: idx === 0 ? "Compliance Officer" : idx === 1 ? "VP Operations" : "Principal Architect",
    avatar: idx === 0
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      : idx === 1
      ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  }));

  // Format complianceDetails
  const risks = (report?.risks || []).map(r => ({
    severity: r.severity.charAt(0).toUpperCase() + r.severity.slice(1),
    category: r.clause,
    description: r.description,
    recommendation: r.severity === "high" ? "Configure region-binding routes on DNS endpoints." : "Deploy monitoring rules."
  }));

  const missingClauses = (report?.missingClauses || []).map(m => ({
    clause: m.clause,
    description: m.description,
    mitigation: m.mitigation
  }));

  const complianceScore = report ? report.complianceScore : null;

  const complianceDetails = report ? {
    score: complianceScore,
    status: complianceScore >= 90 ? "High Compliance" : complianceScore >= 75 ? "Medium Compliance Risk" : "Action Required",
    checkedClauses: 24,
    passedClauses: Math.round(24 * (complianceScore / 100)),
    failedClauses: 24 - Math.round(24 * (complianceScore / 100)),
    risks,
    missingClauses,
    recommendations: [
      "Enforce automated audit log rotation every 90 days instead of the current 180-day cycle.",
      "Implement Multi-Factor Authentication (MFA) enforce-policies for all customer service dashboard admins immediately."
    ]
  } : null;

  return {
    id: reportId || meeting.id, // Fallback to meeting ID for route parameter resolved links
    meetingId,
    title: meeting.title,
    date: meeting.date,
    duration: meeting.duration,
    status: meeting.status,
    complianceScore,
    company: meeting.company,
    country: meeting.country,
    language: meeting.language,
    confidentiality: "Confidential",
    meetingType: "Executive Board",
    summary: report ? report.aiSummary : "AI is currently transcribing and compiling the summary for this session...",
    keyDecisions,
    actionItems,
    speakers,
    complianceDetails,
    transcript: transcriptLines
  };
};

// @desc    Get all compliance reports for the user (including processing meetings)
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    const meetings = await prisma.meeting.findMany({
      where: { userId: req.user.id },
      include: {
        report: {
          include: {
            risks: true,
            missingClauses: true,
            speakerStats: true,
            topicDists: true,
            timelines: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedReports = meetings.map(meeting => {
      if (meeting.report) {
        return formatReportResponse(meeting.report, meeting);
      } else {
        return formatReportResponse(null, meeting);
      }
    });

    res.json({ reports: formattedReports });
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ message: "Server error while fetching reports" });
  }
};

// @desc    Get a single compliance report by ID (Report ID or Meeting ID)
// @route   GET /api/reports/:id
// @access  Private
const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findFirst({
      where: {
        OR: [
          { id },
          { meetingId: id }
        ]
      },
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
      // Check if it's a processing meeting
      const meeting = await prisma.meeting.findFirst({
        where: { id, userId: req.user.id }
      });

      if (meeting) {
        return res.json({ report: formatReportResponse(null, meeting) });
      }

      return res.status(404).json({ message: "Compliance report not found" });
    }

    // Verify ownership
    if (report.meeting.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view this report" });
    }

    res.json({ report: formatReportResponse(report) });
  } catch (error) {
    console.error("Get report by ID error:", error);
    res.status(500).json({ message: "Server error while fetching report details" });
  }
};

module.exports = {
  getReports,
  getReportById,
};
