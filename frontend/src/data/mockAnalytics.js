export const mockAnalytics = {
  complianceOverTime: [
    { month: "Jan", score: 82, risksResolved: 12 },
    { month: "Feb", score: 85, risksResolved: 15 },
    { month: "Mar", score: 84, risksResolved: 18 },
    { month: "Apr", score: 88, risksResolved: 22 },
    { month: "May", score: 89, risksResolved: 26 },
    { month: "Jun", score: 91, risksResolved: 31 },
    { month: "Jul", score: 94, risksResolved: 35 }
  ],
  riskDistribution: [
    { name: "Critical Risks", value: 2, color: "#EF4444" },
    { name: "High Risks", value: 5, color: "#F97316" },
    { name: "Medium Risks", value: 12, color: "#EAB308" },
    { name: "Low Risks", value: 24, color: "#3B82F6" }
  ],
  categoryCompliance: [
    { category: "Access Control", score: 88 },
    { category: "Data Residency", score: 94 },
    { category: "Encryption", score: 92 },
    { category: "Audit Trails", score: 85 },
    { category: "Vendor Risk", score: 90 },
    { category: "HR Policies", score: 100 }
  ],
  topicDistribution: [
    { name: "Financial Audit", value: 35, color: "#6366F1" },
    { name: "Data Protection", value: 25, color: "#3B82F6" },
    { name: "System Architecture", value: 20, color: "#10B981" },
    { name: "Legal/Contractual", value: 12, color: "#F59E0B" },
    { name: "Others", value: 8, color: "#6B7280" }
  ],
  speakerContribution: [
    { speaker: "Alex Rivera", speakingPercentage: 40, positiveSentiment: 85, wordsPerMinute: 135 },
    { speaker: "Sarah Chen", speakingPercentage: 30, positiveSentiment: 78, wordsPerMinute: 145 },
    { speaker: "David K.", speakingPercentage: 20, positiveSentiment: 72, wordsPerMinute: 128 },
    { speaker: "Elena Rostova", speakingPercentage: 10, positiveSentiment: 92, wordsPerMinute: 120 }
  ],
  speakerTimeline: [
    { time: "00:00", speaker: "Alex Rivera", energy: 65 },
    { time: "05:00", speaker: "David K.", energy: 70 },
    { time: "10:00", speaker: "Sarah Chen", energy: 80 },
    { time: "15:00", speaker: "Alex Rivera", energy: 75 },
    { time: "20:00", speaker: "Elena Rostova", energy: 85 },
    { time: "25:00", speaker: "David K.", energy: 68 },
    { time: "30:00", speaker: "Sarah Chen", energy: 78 },
    { time: "35:00", speaker: "Alex Rivera", energy: 72 },
    { time: "40:00", speaker: "Elena Rostova", energy: 80 }
  ]
};
