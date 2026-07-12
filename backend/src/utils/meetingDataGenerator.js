/**
 * Generate realistic meeting-specific data based on meeting details
 * This simulates AI processing of the uploaded meeting
 */

const generateTranscript = (meeting) => {
  const { title, company, complianceFramework, country } = meeting;
  
  // Generate speakers based on company name
  const speakers = [
    `Alex from ${company}`,
    `Sarah from ${company}`,
    `Marcus from ${company}`
  ];

  // Generate content based on compliance framework
  let topics = [];
  if (complianceFramework.includes('GDPR')) {
    topics = [
      'data residency requirements',
      'EU customer data boundaries',
      'cross-border data transfers',
      'user consent management',
      'data subject rights'
    ];
  } else if (complianceFramework.includes('HIPAA')) {
    topics = [
      'PHI encryption standards',
      'access control policies',
      'audit trail requirements',
      'business associate agreements',
      'breach notification protocols'
    ];
  } else if (complianceFramework.includes('SOC 2')) {
    topics = [
      'access control monitoring',
      'change management procedures',
      'incident response protocols',
      'data encryption at rest',
      'network security controls'
    ];
  } else {
    topics = [
      'compliance framework alignment',
      'risk assessment procedures',
      'policy documentation',
      'training requirements',
      'audit preparation'
    ];
  }

  // Generate transcript lines
  const transcriptLines = [];
  const baseTime = 0;
  
  transcriptLines.push(`[00:00] ${speakers[0]}: Welcome everyone to our ${title.toLowerCase()}. We need to review our compliance posture under ${complianceFramework}.`);
  transcriptLines.push(`[00:45] ${speakers[1]}: I've completed the initial assessment for ${country} operations. We have some gaps in ${topics[0]}.`);
  transcriptLines.push(`[01:30] ${speakers[2]}: That's concerning. We need to address ${topics[1]} before the next audit cycle.`);
  transcriptLines.push(`[02:15] ${speakers[0]}: Agreed. Let's prioritize ${topics[2]} and establish a timeline for remediation.`);
  transcriptLines.push(`[03:00] ${speakers[1]}: I'll draft the updated policy for ${topics[3]} and circulate it for review.`);
  transcriptLines.push(`[03:45] ${speakers[2]}: We should also implement automated monitoring for ${topics[4]} to ensure ongoing compliance.`);
  transcriptLines.push(`[04:30] ${speakers[0]}: Excellent. Let's document these action items and set up a follow-up meeting next week.`);

  return transcriptLines.join('\n');
};

const generateAISummary = (meeting) => {
  const { title, complianceFramework, company } = meeting;
  const frameworks = {
    'GDPR': 'data protection and privacy',
    'HIPAA': 'healthcare information security',
    'SOC 2': 'security and availability controls',
    'ISO 27001': 'information security management'
  };

  const frameworkKey = Object.keys(frameworks).find(key => complianceFramework.includes(key)) || 'compliance';
  const frameworkDesc = frameworks[frameworkKey] || 'regulatory requirements';

  return `The ${title} focused on reviewing ${company}'s ${frameworkDesc} posture under ${complianceFramework}. The team identified key gaps in current implementation and established remediation timelines. Action items were assigned to address policy updates, technical controls, and monitoring procedures before the upcoming audit cycle.`;
};

const generateRisks = (meeting) => {
  const { complianceFramework, country } = meeting;
  const risks = [];

  if (complianceFramework.includes('GDPR')) {
    risks.push({
      severity: 'high',
      clause: 'GDPR Article 44',
      description: `Cross-border data transfers from ${country} may lack adequate safeguards as per GDPR requirements.`,
      timestamp: '01:30'
    });
    risks.push({
      severity: 'medium',
      clause: 'GDPR Article 32',
      description: 'Encryption standards for data at rest do not meet current industry best practices.',
      timestamp: '02:15'
    });
  } else if (complianceFramework.includes('HIPAA')) {
    risks.push({
      severity: 'high',
      clause: 'HIPAA §164.312(a)(1)',
      description: 'Access control mechanisms for PHI lack proper authentication verification.',
      timestamp: '01:30'
    });
    risks.push({
      severity: 'medium',
      clause: 'HIPAA §164.312(e)(1)',
      description: 'Transmission security for PHI does not implement required encryption protocols.',
      timestamp: '02:15'
    });
  } else if (complianceFramework.includes('SOC 2')) {
    risks.push({
      severity: 'high',
      clause: 'SOC 2 CC6.1',
      description: 'Logical access controls do not properly restrict access based on job responsibilities.',
      timestamp: '01:30'
    });
    risks.push({
      severity: 'medium',
      clause: 'SOC 2 CC7.2',
      description: 'System monitoring does not detect anomalous activity in real-time.',
      timestamp: '02:15'
    });
  } else {
    risks.push({
      severity: 'high',
      clause: `${complianceFramework} - General Controls`,
      description: 'Key control deficiencies identified in access management and change control processes.',
      timestamp: '01:30'
    });
    risks.push({
      severity: 'medium',
      clause: `${complianceFramework} - Documentation`,
      description: 'Policy documentation lacks specific implementation procedures.',
      timestamp: '02:15'
    });
  }

  return risks;
};

const generateMissingClauses = (meeting) => {
  const { complianceFramework } = meeting;
  
  if (complianceFramework.includes('GDPR')) {
    return {
      clause: 'Data Protection Impact Assessment (DPIA)',
      description: 'Required under GDPR Article 35 for high-risk processing activities involving personal data.',
      mitigation: 'Conduct DPIA for all data processing activities that may result in high risk to individuals rights and freedoms.'
    };
  } else if (complianceFramework.includes('HIPAA')) {
    return {
      clause: 'Security Risk Analysis',
      description: 'Required under HIPAA Security Rule to conduct accurate and thorough risk assessment.',
      mitigation: 'Implement comprehensive risk analysis process covering all ePHI systems and update annually.'
    };
  } else if (complianceFramework.includes('SOC 2')) {
    return {
      clause: 'Incident Response Procedure',
      description: 'Required under SOC 2 CC6.6 to have documented incident response procedures.',
      mitigation: 'Develop and test incident response procedures with defined roles, communication protocols, and recovery steps.'
    };
  } else {
    return {
      clause: 'Continuous Monitoring Program',
      description: 'Required to ensure ongoing compliance with regulatory requirements.',
      mitigation: 'Implement automated monitoring and alerting system for key compliance controls.'
    };
  }
};

const generateSpeakerStats = (meeting) => {
  const { company } = meeting;
  
  // Generate slightly different stats each time
  const basePercentage = 50;
  const variance1 = Math.floor(Math.random() * 20) - 10;
  const variance2 = Math.floor(Math.random() * 15) - 5;
  
  return [
    { name: `Alex from ${company}`, percentage: basePercentage, sentiment: 75 + Math.floor(Math.random() * 15) },
    { name: `Sarah from ${company}`, percentage: 30 + variance1, sentiment: 70 + Math.floor(Math.random() * 20) },
    { name: `Marcus from ${company}`, percentage: 20 + variance2, sentiment: 80 + Math.floor(Math.random() * 10) }
  ];
};

const generateTopicDists = (meeting) => {
  const { complianceFramework } = meeting;
  
  if (complianceFramework.includes('GDPR')) {
    return [
      { topic: 'Data Residency', value: 40 },
      { topic: 'Consent Management', value: 30 },
      { topic: 'Cross-Border Transfers', value: 20 },
      { topic: 'Data Subject Rights', value: 10 }
    ];
  } else if (complianceFramework.includes('HIPAA')) {
    return [
      { topic: 'PHI Encryption', value: 35 },
      { topic: 'Access Control', value: 30 },
      { topic: 'Audit Trails', value: 20 },
      { topic: 'Breach Notification', value: 15 }
    ];
  } else if (complianceFramework.includes('SOC 2')) {
    return [
      { topic: 'Access Monitoring', value: 35 },
      { topic: 'Change Management', value: 25 },
      { topic: 'Incident Response', value: 25 },
      { topic: 'Network Security', value: 15 }
    ];
  } else {
    return [
      { topic: 'Policy Compliance', value: 40 },
      { topic: 'Risk Assessment', value: 30 },
      { topic: 'Training', value: 20 },
      { topic: 'Documentation', value: 10 }
    ];
  }
};

const generateSpeakingTimeline = (meeting) => {
  const { company } = meeting;
  const speakers = ['alex', 'elena', 'marcus'];
  
  return [
    { timestamp: '00:00', alex: 40, elena: 0, marcus: 0 },
    { timestamp: '01:00', alex: 10, elena: 35, marcus: 0 },
    { timestamp: '02:00', alex: 0, elena: 15, marcus: 35 },
    { timestamp: '03:00', alex: 20, elena: 25, marcus: 0 },
    { timestamp: '04:00', alex: 30, elena: 0, marcus: 20 }
  ];
};

const generateKeyDecisions = (meeting) => {
  const { title, company, complianceFramework } = meeting;
  
  return [
    {
      id: `dec-${Date.now()}-1`,
      text: `Approved the compliance remediation plan for ${title} under ${complianceFramework} framework.`,
      agreedBy: `${company} Executive Team`
    },
    {
      id: `dec-${Date.now()}-2`,
      text: `Authorized immediate implementation of required controls identified in the risk assessment.`,
      agreedBy: 'Compliance & Security Committee'
    }
  ];
};

const generateActionItems = (meeting) => {
  const { company, complianceFramework } = meeting;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  
  return [
    {
      id: `act-${Date.now()}-1`,
      task: `Update ${complianceFramework} compliance policies based on identified gaps.`,
      owner: `Compliance Officer at ${company}`,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'Pending'
    },
    {
      id: `act-${Date.now()}-2`,
      task: 'Implement automated monitoring for key compliance controls.',
      owner: 'Security Engineering Team',
      dueDate: new Date(dueDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'In Progress'
    }
  ];
};

module.exports = {
  generateTranscript,
  generateAISummary,
  generateRisks,
  generateMissingClauses,
  generateSpeakerStats,
  generateTopicDists,
  generateSpeakingTimeline,
  generateKeyDecisions,
  generateActionItems
};
