const prisma = require("../config/database");

// @desc    Get aggregated compliance statistics and charts data
// @route   GET /api/analytics
// @access  Private
const getWorkspaceAnalytics = async (req, res) => {
  try {
    const meetings = await prisma.meeting.findMany({
      where: { userId: req.user.id },
      select: { id: true },
    });

    const meetingIds = meetings.map((m) => m.id);

    const reports = await prisma.report.findMany({
      where: {
        meetingId: { in: meetingIds },
      },
      include: {
        risks: true,
        speakerStats: true,
        topicDists: true,
      },
    });

    // Calculate aggregations
    const totalMeetings = meetings.length;
    const completedReports = reports.filter((r) => r.complianceScore !== null);
    
    const averageCompliance = completedReports.length > 0
      ? Math.round(completedReports.reduce((acc, r) => acc + r.complianceScore, 0) / completedReports.length)
      : 0;

    // Count severities
    let highRisks = 0;
    let mediumRisks = 0;
    let lowRisks = 0;

    reports.forEach((r) => {
      r.risks.forEach((risk) => {
        if (risk.severity === "high") highRisks++;
        else if (risk.severity === "medium") mediumRisks++;
        else if (risk.severity === "low") lowRisks++;
      });
    });

    // Consolidate Speaker Contributions
    const speakerContributions = {};
    reports.forEach((r) => {
      r.speakerStats.forEach((stat) => {
        if (!speakerContributions[stat.name]) {
          speakerContributions[stat.name] = { totalPercentage: 0, count: 0 };
        }
        speakerContributions[stat.name].totalPercentage += stat.percentage;
        speakerContributions[stat.name].count += 1;
      });
    });

    const formattedSpeakerContributions = Object.keys(speakerContributions).map((name) => ({
      name,
      percentage: Math.round(speakerContributions[name].totalPercentage / speakerContributions[name].count),
    }));

    res.json({
      summary: {
        totalMeetings,
        averageCompliance,
        totalIssues: highRisks + mediumRisks + lowRisks,
        transcribedMinutes: totalMeetings * 12, // assuming 12m average duration
      },
      riskDistribution: [
        { name: "High Severity", value: highRisks, color: "#ef4444" },
        { name: "Medium Severity", value: mediumRisks, color: "#f59e0b" },
        { name: "Low Severity", value: lowRisks, color: "#3b82f6" },
      ],
      speakerContributions: formattedSpeakerContributions,
    });
  } catch (error) {
    console.error("Get workspace analytics error:", error);
    res.status(500).json({ message: "Server error while compiling workspace analytics" });
  }
};

module.exports = {
  getWorkspaceAnalytics,
};
