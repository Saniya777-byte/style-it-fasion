export const mockReports = [
  {
    id: "rep-1",
    title: "Q3 Financial Performance & Risk Review",
    date: "2026-07-10T14:30:00Z",
    duration: "42m 15s",
    status: "Completed",
    complianceScore: 94,
    company: "Aether Technologies",
    country: "United States",
    language: "English (US)",
    confidentiality: "Highly Confidential",
    meetingType: "Executive Board",
    summary: "The executive team met to review Q3 financial performance, audit regulatory compliance metrics for the upcoming SEC filing, and address potential risk exposure in the overseas markets. While overall revenue grew by 14.2% year-over-year, rising operations costs in Europe and new EU data privacy directives require immediate compliance adjustments. The board finalized the capital allocation plan for Q4 and approved a mitigation budget for GDPR compliance enhancements.",
    keyDecisions: [
      {
        id: "dec-1",
        text: "Approved the allocation of $1.2M capital budget for EU data sovereignty infrastructure and compliance tooling.",
        agreedBy: "Executive Board"
      },
      {
        id: "dec-2",
        text: "Authorized the legal department to finalize and sign the amended vendor agreements under the updated HIPAA frameworks by next Friday.",
        agreedBy: "Legal & Ops"
      },
      {
        id: "dec-3",
        text: "Postponed the APAC branch launch from Q4 2026 to Q2 2027 to ensure local cybersecurity licensing requirements are fully satisfied.",
        agreedBy: "CEO & Board"
      }
    ],
    actionItems: [
      {
        id: "act-1",
        task: "Draft amended data storage agreements for EU customers reflecting localized cloud hosting.",
        owner: "Sarah Chen (Legal)",
        dueDate: "2026-07-20",
        status: "Pending"
      },
      {
        id: "act-2",
        task: "Update compliance dashboard to monitor real-time server residency metrics.",
        owner: "David K. (Infra)",
        dueDate: "2026-07-25",
        status: "In Progress"
      },
      {
        id: "act-3",
        task: "Schedule training session for sales staff on updated customer data privacy policies.",
        owner: "Elena Rostova (HR)",
        dueDate: "2026-08-05",
        status: "Pending"
      }
    ],
    speakers: [
      { id: "spk-1", name: "Alex Rivera", talkTime: "16m 40s", percentage: 40, role: "Compliance Officer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-2", name: "Sarah Chen", talkTime: "12m 30s", percentage: 30, role: "Product Manager", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-3", name: "David K.", talkTime: "8m 20s", percentage: 20, role: "Principal Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-4", name: "Elena Rostova", talkTime: "4m 45s", percentage: 10, role: "VP Operations", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" }
    ],
    complianceDetails: {
      score: 94,
      status: "High Compliance",
      checkedClauses: 24,
      passedClauses: 22,
      failedClauses: 2,
      risks: [
        { severity: "High", category: "Data Residency", description: "EU customer telemetry data is currently routed through North American fallback servers during peak traffic.", recommendation: "Configure region-binding routes on DNS endpoints to enforce strict European borders." },
        { severity: "Medium", category: "Vendor Risk", description: "Third-party analytics provider has not signed the revised Data Processing Addendum (DPA) conforming to GDPR v2.", recommendation: "Suspend non-critical logs routing to this vendor until the DPA is signed." }
      ],
      missingClauses: [
        { clause: "Sec. 4.2 - Cross-Border Transmissions", description: "Missing explicit consent clause for cross-border support inquiries in standard service agreements.", mitigation: "Inject standard model clauses (SCCs) in Exhibit B of service agreements." }
      ],
      recommendations: [
        "Enforce automated audit log rotation every 90 days instead of the current 180-day cycle.",
        "Implement Multi-Factor Authentication (MFA) enforce-policies for all customer service dashboard admins immediately."
      ]
    },
    transcript: [
      { id: 1, speaker: "Alex Rivera", time: "00:12", text: "Good afternoon everyone. Let's begin the Q3 financial and compliance review. We have a packed agenda today, starting with our latest GDPR and HIPAA audit findings." },
      { id: 2, speaker: "Sarah Chen", time: "01:45", text: "Thanks Alex. On the product side, we've successfully integrated the data encryption-at-rest modules. However, we did notice some latency during database queries when compliance flags are fully enabled." },
      { id: 3, speaker: "David K.", time: "03:10", text: "I can speak to that. The latency is caused by our cross-region telemetry pipeline. During peak traffic in Europe, we fallback to US-East. This triggers compliance flags because EU customer data crosses boundaries." },
      { id: 4, speaker: "Alex Rivera", time: "05:00", text: "That is a major risk. Cross-border telemetry violates our EU data privacy policy. We need to lock that down. Can we force local residency?" },
      { id: 5, speaker: "David K.", time: "06:45", text: "Yes, we can. I can provision localized clusters in Frankfurt. It will cost an extra $10k per month, but it guarantees that telemetry data never leaves the EU boundaries." },
      { id: 6, speaker: "Sarah Chen", time: "08:15", text: "The cost is fully justified. If we violate the data residency laws, the potential fines would be order of magnitude higher. Let's make that change. I'll need board approval for the budget." },
      { id: 7, speaker: "Alex Rivera", time: "09:30", text: "Approved. Let's formalize this. I'll mark the EU data sovereignty project as high priority. Next, let's look at the third-party vendor contracts. Elena, did we get the HIPAA addendum from our billing partner?" },
      { id: 8, speaker: "Elena Rostova", time: "11:00", text: "They've reviewed it, but they are asking for modifications in the indemnification clause. Our legal team is reviewing it right now. We expect to resolve this by next Friday." },
      { id: 9, speaker: "Alex Rivera", time: "12:50", text: "Okay, let's hold off on routing any telemetry to them until they sign it. Safety first." }
    ]
  },
  {
    id: "rep-2",
    title: "Project Aether Architecture & Cybersecurity Alignment",
    date: "2026-07-08T09:00:00Z",
    duration: "30m 40s",
    status: "Completed",
    complianceScore: 78,
    company: "Aether Technologies",
    country: "United Kingdom",
    language: "English (UK)",
    confidentiality: "Confidential",
    meetingType: "Technical Alignment",
    summary: "The technical architecture team held a alignment session to discuss Project Aether's upcoming beta deployment. A security audit highlighted key vulnerabilities in the token validation system and API gateway configuration, which currently score below compliance thresholds. Action items were assigned to remediate credential rotation and database access privileges before the public preview.",
    keyDecisions: [
      {
        id: "dec-4",
        text: "Migrate token authorization from custom JWT claims to OAuth 2.0 with short-lived tokens and refresh tokens.",
        agreedBy: "Architecture Committee"
      },
      {
        id: "dec-5",
        text: "Decommission the legacy testing endpoints by the end of this sprint to eliminate unsecured access pathways.",
        agreedBy: "Security Lead"
      }
    ],
    actionItems: [
      {
        id: "act-4",
        task: "Enable secret rotation in AWS Secrets Manager for database keys.",
        owner: "David K. (Infra)",
        dueDate: "2026-07-15",
        status: "Pending"
      },
      {
        id: "act-5",
        task: "Run comprehensive penetration testing on the new auth gateway.",
        owner: "External Auditor",
        dueDate: "2026-07-22",
        status: "Pending"
      }
    ],
    speakers: [
      { id: "spk-3", name: "David K.", talkTime: "15m 20s", percentage: 50, role: "Principal Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-2", name: "Sarah Chen", talkTime: "9m 12s", percentage: 30, role: "Product Manager", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-1", name: "Alex Rivera", talkTime: "6m 08s", percentage: 20, role: "Compliance Officer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
    ],
    complianceDetails: {
      score: 78,
      status: "Medium Compliance Risk",
      checkedClauses: 18,
      passedClauses: 14,
      failedClauses: 4,
      risks: [
        { severity: "Critical", category: "Access Control", description: "Database master password is hardcoded inside legacy config files.", recommendation: "Move all sensitive credentials to standard secret vault with automatic rotation policies." },
        { severity: "High", category: "Encryption", description: "Internal microservice traffic is currently unencrypted HTTP.", recommendation: "Enforce mTLS across all Kubernetes pods using Linkerd or Istio service mesh." }
      ],
      missingClauses: [
        { clause: "Sec. 9.1 - Audit Trails", description: "Database mutations do not record the initiating user ID or IP address in audit tables.", mitigation: "Implement transaction-level logging middleware in Prisma hooks." }
      ],
      recommendations: [
        "Update the SSL configuration on external load balancers to disable TLS 1.0 and 1.1.",
        "Set up centralized logs forwarding to Datadog with automated anomaly alerts."
      ]
    },
    transcript: [
      { id: 1, speaker: "David K.", time: "00:05", text: "Thanks for coming. We are reviewing the security report for Project Aether. Frankly, our audit score is 78%, which is below our release threshold of 90%." },
      { id: 2, speaker: "Sarah Chen", time: "01:30", text: "What are the main issues? We need this ready for the preview next month." },
      { id: 3, speaker: "David K.", time: "02:15", text: "The biggest culprit is database credentials. They are hardcoded in the legacy repository config. We also lack audit trails for mutations in the database, and we need mTLS between internal microservices." },
      { id: 4, speaker: "Alex Rivera", time: "04:10", text: "The lack of audit trails is a major compliance issue for SOC 2 Type II. We must resolve this. Let's build a middleware that records the user context for every database mutation." }
    ]
  },
  {
    id: "rep-3",
    title: "HR Policy Updates & Annual Employee Alignment",
    date: "2026-07-05T11:00:00Z",
    duration: "25m 10s",
    status: "Completed",
    complianceScore: 100,
    company: "Aether Technologies",
    country: "Canada",
    language: "English (US)",
    confidentiality: "Internal",
    meetingType: "HR Planning",
    summary: "The HR team met to review annual policy updates, including standard remote work guidelines and compliance with Canadian labor laws. The session yielded 100% compliance alignment with no active risks identified. A follow-up info session is planned for all staff next month.",
    keyDecisions: [
      {
        id: "dec-6",
        text: "Approved the new Canadian remote work stipend scheme effective August 1st.",
        agreedBy: "HR & CEO"
      }
    ],
    actionItems: [
      {
        id: "act-6",
        task: "Distribute the updated remote work handbook via Slack.",
        owner: "Elena Rostova (HR)",
        dueDate: "2026-07-12",
        status: "Completed"
      }
    ],
    speakers: [
      { id: "spk-4", name: "Elena Rostova", talkTime: "18m 50s", percentage: 75, role: "VP Operations", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
      { id: "spk-1", name: "Alex Rivera", talkTime: "6m 20s", percentage: 25, role: "Compliance Officer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
    ],
    complianceDetails: {
      score: 100,
      status: "Fully Compliant",
      checkedClauses: 12,
      passedClauses: 12,
      failedClauses: 0,
      risks: [],
      missingClauses: [],
      recommendations: [
        "Continue periodic reviews of labor guidelines on a bi-annual schedule."
      ]
    },
    transcript: [
      { id: 1, speaker: "Elena Rostova", time: "00:10", text: "Let's review the final draft of the remote work guidelines. We've ensured that all Canadian provincial guidelines are fully integrated." },
      { id: 2, speaker: "Alex Rivera", time: "03:40", text: "I've reviewed the documents against federal rules as well, and everything looks pristine. No compliance violations detected." }
    ]
  },
  {
    id: "rep-4",
    title: "Global Supply Chain Logistics & Tariff Adjustments",
    date: "2026-07-11T10:00:00Z",
    duration: "55m 20s",
    status: "Processing",
    complianceScore: null,
    company: "Aether Technologies",
    country: "Germany",
    language: "English (US)",
    confidentiality: "Confidential",
    meetingType: "Logistics Sync",
    summary: "AI is currently transcribing and compiling the summary for this session...",
    keyDecisions: [],
    actionItems: [],
    speakers: [],
    complianceDetails: null,
    transcript: []
  }
];
