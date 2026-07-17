const STORAGE_KEY = "ozankosulgan-v3-sandbox";
const SIGNUP_CONVERSION_SEND_TO = "AW-18216813923/uQSjCNja58wcEOOKuu5D";
const SIGNUP_CONVERSION_TIMEOUT_MS = 1000;
const COMMUNITY_API_ENDPOINT = "/api/community";

const methodologyLabels = {
  agile: "Agile",
  waterfall: "Waterfall",
  hybrid: "Hybrid",
};

const methodologyStages = {
  agile: [
    "Backlog",
    "Sprint Review",
    "Product Approval",
    "Released",
  ],
  waterfall: [
    "Intake",
    "Impact Analysis",
    "Change Board",
    "Implementation",
  ],
  hybrid: [
    "Discovery",
    "Sprint or Phase Review",
    "Governance Gate",
    "Release",
  ],
};

const industryPresets = {
  technology: {
    label: "Technology",
    focus: "software delivery, AI product releases, security review, customer impact",
    checklist: [
      "Confirm product owner priority and target release",
      "Estimate engineering, QA, and security impact",
      "Validate customer value and support readiness",
      "Document rollout, rollback, and communication plan",
      "Capture final decision and owner",
    ],
    agileChecklist: [
      "Define the sprint goal and business outcome for the change",
      "Confirm backlog priority, acceptance criteria, and release train fit",
      "Estimate engineering, QA, security, data, and support effort",
      "Identify dependencies across product, platform, analytics, and customer success",
      "Review demo evidence and rollout readiness before release",
    ],
    aiDataChecklist: [
      "Confirm data source ownership, consent, and access path",
      "Validate model or analytics success metrics before build",
      "Review security, privacy, bias, and operational monitoring needs",
      "Define human-in-the-loop escalation and rollback approach",
      "Capture adoption, training, and support owner for launch",
    ],
  },
  healthcare: {
    label: "Healthcare",
    focus: "patient safety, operational controls, compliance review, clinical adoption",
    checklist: [
      "Validate patient or staff safety impact",
      "Confirm policy, privacy, and compliance review",
      "Review training and adoption requirements",
      "Document risk controls and escalation path",
      "Capture final decision and accountable owner",
    ],
    agileChecklist: [
      "Confirm clinical workflow impact and sprint objective",
      "Review patient safety, privacy, accessibility, and compliance constraints",
      "Validate acceptance criteria with clinical and operational owners",
      "Plan pilot cohort, training, and support coverage",
      "Capture go-live readiness and incident escalation route",
    ],
    aiDataChecklist: [
      "Confirm data minimization, access controls, and audit evidence",
      "Review model output limitations with clinical decision owners",
      "Define human review for recommendations or risk scores",
      "Validate fairness, safety, and false-positive impact",
      "Document adoption measures and clinical feedback loop",
    ],
  },
  construction: {
    label: "Construction",
    focus: "site readiness, subcontractor coordination, cost control, schedule impact",
    checklist: [
      "Confirm scope drawing or field condition change",
      "Estimate cost, labor, procurement, and schedule impact",
      "Review safety and permit implications",
      "Confirm client, architect, or engineer approval",
      "Update project baseline and communication log",
    ],
    agileChecklist: [
      "Confirm field constraint, owner, and near-term work package",
      "Estimate cost, labor, procurement, safety, and schedule impact",
      "Validate site readiness and subcontractor dependencies",
      "Review change with client, architect, engineer, or inspector",
      "Update lookahead plan, baseline, and crew communication",
    ],
    aiDataChecklist: [
      "Confirm source of site, sensor, schedule, or cost data",
      "Validate forecast assumptions and confidence thresholds",
      "Review safety, permit, and contractual implications",
      "Define exception workflow for AI schedule or risk alerts",
      "Document field adoption, training, and feedback cadence",
    ],
  },
  finance: {
    label: "Financial Services",
    focus: "risk controls, audit trail, regulatory review, stakeholder approval",
    checklist: [
      "Classify financial, operational, and regulatory impact",
      "Confirm control owner and approval authority",
      "Review audit evidence requirements",
      "Document decision rationale and exception handling",
      "Update stakeholder communication and launch plan",
    ],
    agileChecklist: [
      "Classify customer, financial, operational, and regulatory impact",
      "Confirm control owner, approval authority, and audit evidence",
      "Review data lineage, security, and exception handling",
      "Validate release controls with risk, legal, compliance, and operations",
      "Capture signoff, monitoring, and post-release review owner",
    ],
    aiDataChecklist: [
      "Confirm model purpose, prohibited use boundaries, and data lineage",
      "Review explainability, bias, privacy, and audit traceability",
      "Define human approval for high-impact recommendations",
      "Document model monitoring, drift thresholds, and incident response",
      "Capture regulatory evidence and customer communication path",
    ],
  },
  education: {
    label: "Education",
    focus: "student outcomes, faculty readiness, budget alignment, academic calendar",
    checklist: [
      "Confirm learner, faculty, and administration impact",
      "Review budget, calendar, and resource constraints",
      "Validate accessibility and support needs",
      "Capture approval from academic or operational owner",
      "Document rollout plan and success measures",
    ],
    agileChecklist: [
      "Confirm learning outcome, faculty owner, and academic calendar fit",
      "Review accessibility, privacy, support, and assessment impact",
      "Validate acceptance criteria with learners, faculty, and administration",
      "Plan pilot, training, communications, and helpdesk readiness",
      "Document success measures and improvement feedback loop",
    ],
    aiDataChecklist: [
      "Confirm student data use, consent, privacy, and retention rules",
      "Review AI support boundaries for learning or advising workflows",
      "Validate fairness, accessibility, and transparency requirements",
      "Define faculty review and escalation for AI-generated guidance",
      "Capture adoption metrics, learner feedback, and support process",
    ],
  },
};

const aiGovernanceAssets = [
  {
    gate: "1. Opportunity intake",
    owner: "Business sponsor + product owner",
    deliverable: "AI/data opportunity one-pager",
    checks: [
      "Business problem and target decision are explicit",
      "Expected value, users, and adoption path are named",
      "Risk level and governance owner are assigned",
    ],
  },
  {
    gate: "2. Data readiness",
    owner: "Data owner + analytics lead",
    deliverable: "Data readiness scorecard",
    checks: [
      "Source systems, quality gaps, and access constraints are known",
      "Privacy, consent, retention, and lineage are reviewed",
      "Success metrics and baseline are measurable",
    ],
  },
  {
    gate: "3. Model or analytics design",
    owner: "Technical lead + risk reviewer",
    deliverable: "Solution design and control plan",
    checks: [
      "Model, dashboard, automation, or analytics approach is selected",
      "Bias, explainability, security, and monitoring controls are defined",
      "Human review and exception handling are designed",
    ],
  },
  {
    gate: "4. Pilot and validation",
    owner: "Project manager + user group",
    deliverable: "Pilot report and decision log",
    checks: [
      "Pilot group, test cases, and acceptance threshold are clear",
      "Outcomes are compared against baseline and user feedback",
      "Go, hold, pivot, or stop decision is documented",
    ],
  },
  {
    gate: "5. Launch and adoption",
    owner: "Change lead + operations owner",
    deliverable: "Adoption and operating handover plan",
    checks: [
      "Training, communications, support, and ownership are ready",
      "Monitoring, incident response, and rollback route are live",
      "Value tracking cadence is scheduled after launch",
    ],
  },
];

const reusableAssets = [
  { title: "AI use-case intake form", detail: "A standard way to capture business problem, value, users, data needs, risk, and adoption path." },
  { title: "Data readiness checklist", detail: "A reusable scorecard for source quality, ownership, lineage, access, privacy, and baseline metrics." },
  { title: "Responsible AI RAID log", detail: "A risk, assumption, issue, and dependency log tuned for model, analytics, privacy, and adoption risks." },
  { title: "Pilot decision memo", detail: "A template for documenting pilot results, options, recommendation, and launch decision." },
  { title: "Adoption scoreboard", detail: "A lightweight dashboard for usage, confidence, support volume, value, and improvement actions." },
  { title: "Change-control game rules", detail: "Points, badges, and missions that reward high-quality reviews, fast decisions, and risk reduction." },
];

const notionDatabaseTemplates = [
  {
    key: "projects",
    label: "Projects",
    envKey: "NOTION_PROJECTS_DATABASE_ID",
    target: "Portfolio projects",
    required: ["Name", "Priority", "Status", "Sponsor", "Start", "End"],
    demoRecords: 4,
  },
  {
    key: "resources",
    label: "Resources",
    envKey: "NOTION_RESOURCES_DATABASE_ID",
    target: "People, capacity, roles, and skill profiles",
    required: ["Name", "Role", "Weekly Capacity", "Skills", "Backup Skills"],
    demoRecords: 6,
  },
  {
    key: "allocations",
    label: "Allocations",
    envKey: "NOTION_ALLOCATIONS_DATABASE_ID",
    target: "Multi-project demand and skill consumption",
    required: ["Project", "Resource", "Skill", "Hours", "Week", "Priority"],
    demoRecords: 15,
  },
  {
    key: "changes",
    label: "Change Requests",
    envKey: "NOTION_CHANGES_DATABASE_ID",
    target: "Scope, risk, decision, and approval workflow",
    required: ["Title", "Project", "Owner", "Status", "Scope Impact", "Risk"],
    demoRecords: 3,
  },
  {
    key: "signoffs",
    label: "Sign-offs / Decisions",
    envKey: "NOTION_SIGNOFFS_DATABASE_ID",
    target: "Stakeholder acceptance and decision traceability",
    required: ["Stakeholder", "Project", "Approval Status", "Due", "Decision Notes"],
    demoRecords: 5,
  },
  {
    key: "reports",
    label: "PM Briefs",
    envKey: "NOTION_REPORTS_DATABASE_ID",
    target: "Write-back reports and executive summaries",
    required: ["Name", "Summary", "Generated At", "Risk Level"],
    demoRecords: 0,
  },
];

const notionSetupSteps = [
  {
    title: "Create a Notion internal connection",
    detail: "Use a workspace-owned connection for your first OzzyPM integration. Customer-facing installs can move to OAuth later.",
  },
  {
    title: "Share databases with the connection",
    detail: "Each Notion database must be explicitly shared with the integration before the API can query it.",
  },
  {
    title: "Store secrets on the server",
    detail: "Use NOTION_API_KEY and database ID environment variables. Never place the token in index.html or app.js.",
  },
  {
    title: "Deploy the /api/notion endpoint",
    detail: "The serverless endpoint queries Notion, normalizes rows, and returns only safe project data to the frontend.",
  },
];

const baselineChangeGates = [
  {
    id: "capture",
    title: "1. Baseline capture",
    owner: "Project manager",
    evidence: "Scope package, assumptions, exclusions, schedule, cost, and acceptance criteria are versioned.",
  },
  {
    id: "impact",
    title: "2. Impact analysis",
    owner: "Delivery lead + finance",
    evidence: "Budget, timeline, resource, quality, risk, and dependency impacts are quantified.",
  },
  {
    id: "review",
    title: "3. Change board review",
    owner: "Sponsor + PMO",
    evidence: "Options, recommendation, decision authority, and trade-offs are documented.",
  },
  {
    id: "signoff",
    title: "4. Stakeholder sign-off",
    owner: "Business, technical, customer, and vendor owners",
    evidence: "Required approvers accept the changed baseline before work proceeds.",
  },
  {
    id: "update",
    title: "5. Baseline update",
    owner: "PMO",
    evidence: "Approved change updates the baseline, RAID log, schedule, reporting, and communications.",
  },
];

const criticalSkills = [
  "Architecture",
  "AI Governance",
  "Data Engineering",
  "Integration",
  "Security",
  "Privacy",
  "Business Translation",
  "Change Adoption",
  "Vendor Coordination",
];

function buildChecklistForIndustry(industryKey) {
  const preset = industryPresets[industryKey] ?? industryPresets.technology;
  const sections = [
    ["Agile", preset.agileChecklist],
    ["AI/Data", preset.aiDataChecklist],
  ];

  return sections.flatMap(([type, items]) =>
    items.map((text, index) => ({
      id: `CL-${type.replace(/\W/g, "")}-${index + 1}`,
      text,
      type,
      complete: index < 2,
    })),
  );
}

function enrichRequest(request, index = 0) {
  const defaults = {
    points: Math.max(45, 110 - index * 12),
    qualityScore: request.checklistComplete ?? 25,
    challenge: "Complete impact, owner, and governance review",
    badge: request.risk === "High" ? "Risk Resolver" : "Change Champion",
  };

  return { ...defaults, ...request };
}

const sowLayers = [
  {
    id: "intake",
    title: "1. SOW Intake",
    output: "Clarified scope, assumptions, exclusions, and success measures",
    humanCheck: "PM validates ambiguity, missing scope, and stakeholder intent",
  },
  {
    id: "breakdown",
    title: "2. Work Breakdown",
    output: "Manageable work packages by deliverable, workstream, and owner",
    humanCheck: "Delivery lead confirms the work is small enough to plan and assign",
  },
  {
    id: "analysis",
    title: "3. Dependency Analysis",
    output: "Cross-team dependencies, decision points, constraints, and sequencing logic",
    humanCheck: "PM reviews handoffs, vendor/customer inputs, and critical assumptions",
  },
  {
    id: "schedule",
    title: "4. Schedule Draft",
    output: "Milestone sequence, duration ranges, review gates, and baseline candidate",
    humanCheck: "Sponsor and team validate dates before anything becomes a commitment",
  },
  {
    id: "risk",
    title: "5. Risk Scan",
    output: "Delivery, adoption, data, vendor, compliance, and operational risks",
    humanCheck: "Risk owner accepts response plan and escalation trigger",
  },
  {
    id: "approval",
    title: "6. Human Approval",
    output: "Approved plan baseline with open questions and reusable project assets",
    humanCheck: "Human decision remains the gate before schedule, budget, or scope baseline",
  },
];

const sowPlaybooks = {
  technology: {
    label: "Technology / Software",
    method: "Hybrid agile delivery with release governance",
    sowPrompt: "Launch an AI-enabled customer self-service portal with analytics, integrations, security review, and adoption support.",
    components: [
      { title: "Discovery and scope alignment", owner: "Product + PM", duration: "1-2 wks", dependency: "Sponsor goals", risk: "Unclear acceptance criteria", humanCheck: "Confirm success metrics and exclusions" },
      { title: "Architecture and integration plan", owner: "Engineering", duration: "2-3 wks", dependency: "System access", risk: "API or security constraints", humanCheck: "Review integration assumptions" },
      { title: "AI/data readiness and controls", owner: "Data + Security", duration: "2 wks", dependency: "Data owner approval", risk: "Data quality or privacy gap", humanCheck: "Approve data use and monitoring" },
      { title: "Build, test, and release", owner: "Delivery team", duration: "3-5 wks", dependency: "Backlog readiness", risk: "Regression or support readiness", humanCheck: "Validate demo evidence" },
      { title: "Adoption and support handover", owner: "Customer Success", duration: "1-2 wks", dependency: "Training assets", risk: "Low usage after launch", humanCheck: "Confirm support owner" },
    ],
  },
  healthcare: {
    label: "Healthcare",
    method: "Controlled agile with clinical safety and privacy gates",
    sowPrompt: "Deploy a clinical operations dashboard with data validation, privacy controls, training, and adoption feedback.",
    components: [
      { title: "Clinical workflow discovery", owner: "Clinical Ops + PM", duration: "1-2 wks", dependency: "Clinical sponsor", risk: "Workflow disruption", humanCheck: "Validate patient/staff impact" },
      { title: "Data privacy and access review", owner: "Compliance + Data", duration: "2 wks", dependency: "Data classification", risk: "Privacy or consent gap", humanCheck: "Approve access model" },
      { title: "Dashboard build and validation", owner: "Analytics", duration: "3-4 wks", dependency: "Source data quality", risk: "Incorrect operational signal", humanCheck: "Review metric definitions" },
      { title: "Pilot and training", owner: "Operations", duration: "2 wks", dependency: "Pilot group", risk: "Low clinician adoption", humanCheck: "Approve training readiness" },
      { title: "Launch monitoring", owner: "Support + PMO", duration: "1-2 wks", dependency: "Support process", risk: "Issue escalation delay", humanCheck: "Confirm escalation path" },
    ],
  },
  construction: {
    label: "Construction",
    method: "Phase-gate delivery with field readiness controls",
    sowPrompt: "Coordinate a site technology rollout with subcontractors, schedule constraints, safety review, and client approvals.",
    components: [
      { title: "Scope and site condition review", owner: "PM + Site Lead", duration: "1 wk", dependency: "Drawings and field input", risk: "Hidden site condition", humanCheck: "Confirm field assumptions" },
      { title: "Procurement and vendor coordination", owner: "Procurement", duration: "2-4 wks", dependency: "Vendor quote", risk: "Lead-time delay", humanCheck: "Approve vendor commitments" },
      { title: "Safety and permit checks", owner: "Safety Lead", duration: "1-2 wks", dependency: "Permit requirements", risk: "Non-compliance", humanCheck: "Validate permit path" },
      { title: "Installation schedule", owner: "Field Team", duration: "2-3 wks", dependency: "Site access", risk: "Trade conflict", humanCheck: "Review lookahead plan" },
      { title: "Client handover", owner: "PM", duration: "1 wk", dependency: "Punch list", risk: "Incomplete acceptance", humanCheck: "Confirm acceptance criteria" },
    ],
  },
  finance: {
    label: "Financial Services",
    method: "Governed hybrid delivery with audit evidence",
    sowPrompt: "Implement a risk reporting automation with data lineage, control evidence, compliance review, and executive adoption.",
    components: [
      { title: "Control objective mapping", owner: "Risk + PMO", duration: "1-2 wks", dependency: "Policy owner", risk: "Wrong control scope", humanCheck: "Approve control objective" },
      { title: "Data lineage and access", owner: "Data Governance", duration: "2-3 wks", dependency: "Source owner", risk: "Lineage gap", humanCheck: "Validate audit evidence" },
      { title: "Automation design", owner: "Technology", duration: "3-4 wks", dependency: "Requirements signoff", risk: "Exception handling gap", humanCheck: "Review exception workflow" },
      { title: "Compliance validation", owner: "Compliance", duration: "1-2 wks", dependency: "Test evidence", risk: "Regulatory concern", humanCheck: "Approve release controls" },
      { title: "Executive rollout", owner: "Business Sponsor", duration: "1 wk", dependency: "Reporting pack", risk: "Low trust in output", humanCheck: "Confirm adoption plan" },
    ],
  },
  education: {
    label: "Education",
    method: "Agile rollout aligned to academic calendar and support readiness",
    sowPrompt: "Launch a student success analytics initiative with faculty workflows, data privacy, accessibility, and support planning.",
    components: [
      { title: "Learner and faculty impact review", owner: "Academic Sponsor", duration: "1-2 wks", dependency: "Program goals", risk: "Misaligned learning outcome", humanCheck: "Validate stakeholder impact" },
      { title: "Student data governance", owner: "Data + Privacy", duration: "2 wks", dependency: "Data sharing rules", risk: "Privacy or retention gap", humanCheck: "Approve data use" },
      { title: "Analytics design and pilot", owner: "Analytics", duration: "3-4 wks", dependency: "Data readiness", risk: "Bias or poor actionability", humanCheck: "Review pilot evidence" },
      { title: "Faculty enablement", owner: "Change Lead", duration: "1-2 wks", dependency: "Training content", risk: "Low faculty adoption", humanCheck: "Confirm readiness" },
      { title: "Support and feedback loop", owner: "Student Services", duration: "1 wk", dependency: "Support model", risk: "Unresolved learner issues", humanCheck: "Approve feedback cadence" },
    ],
  },
};

function buildSowState(industryKey = "technology") {
  return {
    industry: industryKey,
    statement: sowPlaybooks[industryKey].sowPrompt,
    approvedLayerIds: ["intake"],
    currentLayerIndex: 1,
    components: sowPlaybooks[industryKey].components.map((component, index) => ({
      id: `WP-${index + 1}`,
      ...component,
    })),
  };
}

function buildScopeBaselineState(industryKey = "technology") {
  const playbook = sowPlaybooks[industryKey] ?? sowPlaybooks.technology;
  const preset = industryPresets[industryKey] ?? industryPresets.technology;

  return {
    industry: industryKey,
    version: "v1.0",
    lastUpdated: "Draft baseline generated from SOW Studio",
    activeGateIndex: 1,
    components: [
      {
        id: "SB-1",
        title: "In-scope deliverables",
        owner: "PM + business sponsor",
        status: "Approved",
        source: playbook.components[0].title,
        control: "Any new deliverable or material acceptance change becomes a change request.",
        evidence: "Deliverable list, acceptance criteria, and explicit exclusions.",
      },
      {
        id: "SB-2",
        title: "Schedule baseline",
        owner: "Delivery lead",
        status: "Under Review",
        source: playbook.method,
        control: "Date movement requires impact analysis across dependency, vendor, and adoption paths.",
        evidence: "Milestone sequence, dependency assumptions, review gates, and critical path risks.",
      },
      {
        id: "SB-3",
        title: "Cost and resource baseline",
        owner: "Finance + PMO",
        status: "Needs Info",
        source: preset.focus,
        control: "Resource or cost movement requires sponsor approval and funding decision capture.",
        evidence: "Role demand, vendor effort, budget range, and contingency assumptions.",
      },
      {
        id: "SB-4",
        title: "Acceptance and governance baseline",
        owner: "Product + risk owner",
        status: "Under Review",
        source: "AI/data and delivery controls",
        control: "Quality, security, privacy, compliance, or adoption criteria cannot be waived silently.",
        evidence: "Definition of done, readiness checklist, governance gates, and sign-off authority.",
      },
    ],
    stakeholders: [
      {
        id: "sponsor",
        name: "Executive sponsor",
        role: "Value, funding, and priority owner",
        status: "Signed Off",
        due: "Baseline review",
        concern: "Business outcome and funding path confirmed.",
      },
      {
        id: "product",
        name: "Product / business owner",
        role: "Scope and acceptance owner",
        status: "Reviewing",
        due: "Next checkpoint",
        concern: "Acceptance criteria and release expectations need final review.",
      },
      {
        id: "delivery",
        name: "Delivery lead",
        role: "Work package, schedule, and dependency owner",
        status: "Reviewing",
        due: "This week",
        concern: "Schedule baseline needs dependency confirmation.",
      },
      {
        id: "risk",
        name: "Data / risk owner",
        role: "Security, privacy, compliance, and AI/data controls",
        status: "Approval Needed",
        due: "Before build starts",
        concern: "Governance evidence must be attached before approval.",
      },
      {
        id: "customer",
        name: "Customer / operations partner",
        role: "Adoption, readiness, and support owner",
        status: "Pending",
        due: "Before launch plan",
        concern: "Training and support readiness need validation.",
      },
    ],
    changeGates: baselineChangeGates.map((gate, index) => ({
      ...gate,
      status: index === 0 ? "Complete" : index === 1 ? "Active" : "Pending",
    })),
  };
}

function buildResourceCapacityState(industryKey = "technology") {
  const preset = industryPresets[industryKey] ?? industryPresets.technology;

  return {
    industry: industryKey,
    planningWindow: "Next 4 weeks",
    lastAction: "Initial multi-project capacity scan created",
    projects: [
      {
        id: "P-1",
        name: "AI customer portal pilot",
        priority: "High",
        outcome: "Customer self-service pilot with governed AI support",
        demand: "Architecture, integration, AI governance, change adoption",
      },
      {
        id: "P-2",
        name: "Data quality remediation",
        priority: "High",
        outcome: "Trusted reporting baseline and source-system fixes",
        demand: "Data engineering, analytics, privacy, business translation",
      },
      {
        id: "P-3",
        name: "Compliance automation rollout",
        priority: "Medium",
        outcome: "Audit-ready workflow automation with risk evidence",
        demand: "Security, privacy, integration, vendor coordination",
      },
      {
        id: "P-4",
        name: `${preset.label} adoption enablement`,
        priority: "Medium",
        outcome: "Training, operating handover, and support readiness",
        demand: "Change adoption, business translation, vendor coordination",
      },
    ],
    resources: [
      {
        id: "R-1",
        name: "Aylin Demir",
        role: "Solution architect",
        capacity: 40,
        skills: ["Architecture", "Integration", "Security"],
        allocations: [
          { project: "AI customer portal pilot", skill: "Architecture", hours: 22, priority: "High" },
          { project: "Data quality remediation", skill: "Integration", hours: 16, priority: "High" },
          { project: "Compliance automation rollout", skill: "Security", hours: 10, priority: "Medium" },
        ],
      },
      {
        id: "R-2",
        name: "Marco Silva",
        role: "Data engineer",
        capacity: 40,
        skills: ["Data Engineering", "Integration", "Analytics"],
        allocations: [
          { project: "Data quality remediation", skill: "Data Engineering", hours: 18, priority: "High" },
          { project: "AI customer portal pilot", skill: "Integration", hours: 14, priority: "High" },
          { project: "Compliance automation rollout", skill: "Analytics", hours: 8, priority: "Medium" },
        ],
      },
      {
        id: "R-3",
        name: "Priya Chen",
        role: "AI and data governance lead",
        capacity: 32,
        skills: ["AI Governance", "Privacy", "Risk"],
        allocations: [
          { project: "AI customer portal pilot", skill: "AI Governance", hours: 14, priority: "High" },
          { project: "Data quality remediation", skill: "Privacy", hours: 14, priority: "High" },
          { project: "Compliance automation rollout", skill: "Risk", hours: 8, priority: "Medium" },
        ],
      },
      {
        id: "R-4",
        name: "Ozan Kosulgan",
        role: "PMO and business translation lead",
        capacity: 36,
        skills: ["PMO", "Business Translation", "Vendor Coordination"],
        allocations: [
          { project: "AI customer portal pilot", skill: "Business Translation", hours: 14, priority: "High" },
          { project: "Data quality remediation", skill: "PMO", hours: 8, priority: "High" },
          { project: "Compliance automation rollout", skill: "Vendor Coordination", hours: 10, priority: "Medium" },
        ],
      },
      {
        id: "R-5",
        name: "Lena Brooks",
        role: "Adoption and readiness lead",
        capacity: 32,
        skills: ["Change Adoption", "Training", "Customer Readiness"],
        allocations: [
          { project: `${preset.label} adoption enablement`, skill: "Change Adoption", hours: 12, priority: "Medium" },
          { project: "AI customer portal pilot", skill: "Training", hours: 10, priority: "High" },
        ],
      },
      {
        id: "R-6",
        name: "Samir Patel",
        role: "Automation engineer",
        capacity: 40,
        skills: ["Automation", "Integration", "QA"],
        allocations: [
          { project: "Compliance automation rollout", skill: "Automation", hours: 20, priority: "Medium" },
          { project: "AI customer portal pilot", skill: "QA", hours: 12, priority: "High" },
        ],
      },
    ],
  };
}

function buildNotionSyncState() {
  return {
    connectionStatus: "Demo mode",
    lastSync: "Not connected yet",
    reportStatus: "No report written yet",
    mode: "Server-side API required for live Notion data",
    mappings: notionDatabaseTemplates.map((template, index) => ({
      ...template,
      status: index < 3 ? "Mapped" : "Ready",
      records: index < 3 ? template.demoRecords : 0,
    })),
    setup: notionSetupSteps.map((step, index) => ({
      ...step,
      status: index < 2 ? "Ready" : "Pending",
    })),
    insights: [
      {
        type: "Capacity",
        status: "Conflict",
        title: "Resource allocations can feed the Capacity view",
        detail: "OzzyPM can convert Notion allocation rows into over-capacity and priority-collision alerts.",
        source: "Allocations database",
      },
      {
        type: "Governance",
        status: "Needs Review",
        title: "Sign-offs can feed baseline readiness",
        detail: "Stakeholder approval rows can update scope baseline readiness and decision queues.",
        source: "Sign-offs / Decisions database",
      },
      {
        type: "Change Control",
        status: "Ready",
        title: "Change requests can become managed workflow cards",
        detail: "Notion change rows can become OzzyPM change cards with scope, risk, owner, and approval status.",
        source: "Change Requests database",
      },
    ],
  };
}

function buildHealthScorecardState() {
  return {
    lastAggregated: "Demo aggregation from OzzyPM sandbox signals",
    staleHours: 6,
    briefStatus: "Executive brief not prepared yet",
    reportingCycle: "Weekly steering committee",
    sourceCount: 6,
  };
}

const initialState = {
  workspace: {
    name: "Project Manager",
    email: "",
    company: "Sandbox Company",
    goal: "change-control",
  },
  methodology: "agile",
  industry: "technology",
  governance: 3,
  points: {
    review: 25,
    risk: 40,
  },
  sow: buildSowState("technology"),
  scopeBaseline: buildScopeBaselineState("technology"),
  resourceCapacity: buildResourceCapacityState("technology"),
  notionSync: buildNotionSyncState(),
  healthScorecard: buildHealthScorecardState(),
  requests: [
    {
      id: "CR-102",
      title: "Add customer self-service portal",
      owner: "Product",
      status: "Under Review",
      risk: "Medium",
      stageIndex: 1,
      checklistComplete: 60,
      points: 90,
      qualityScore: 64,
      challenge: "Close evidence gaps and confirm release readiness",
      badge: "Customer Value Sprint",
      impact: {
        budget: "$18k",
        timeline: "+2 weeks",
        scope: "Medium",
        risk: "Moderate",
      },
    },
    {
      id: "CR-108",
      title: "Move launch date for compliance review",
      owner: "PMO",
      status: "Needs Info",
      risk: "High",
      stageIndex: 0,
      checklistComplete: 35,
      points: 120,
      qualityScore: 42,
      challenge: "Resolve compliance dependency before sprint commitment",
      badge: "Risk Resolver",
      impact: {
        budget: "$4k",
        timeline: "+1 week",
        scope: "Low",
        risk: "High",
      },
    },
    {
      id: "CR-111",
      title: "Standardize executive dashboard metrics",
      owner: "Analytics",
      status: "Approved",
      risk: "Low",
      stageIndex: 2,
      checklistComplete: 92,
      points: 70,
      qualityScore: 88,
      challenge: "Package metric definitions as reusable reporting asset",
      badge: "Data Clarity Builder",
      impact: {
        budget: "$6k",
        timeline: "No change",
        scope: "Low",
        risk: "Low",
      },
    },
  ],
  decisions: [
    {
      id: "D-24",
      title: "Choose approval authority for urgent changes",
      owner: "Steering Committee",
      status: "Pending",
      risk: "Medium",
      stageIndex: 1,
      options: ["PM approval", "Sponsor approval", "Change board approval"],
      due: "This week",
      checklistComplete: 50,
    },
    {
      id: "D-31",
      title: "Confirm rollout strategy by customer tier",
      owner: "Customer Success",
      status: "In Progress",
      risk: "Low",
      stageIndex: 2,
      options: ["Pilot first", "Region first", "Full launch"],
      due: "Next review",
      checklistComplete: 70,
    },
  ],
  checklist: buildChecklistForIndustry("technology"),
  missions: [
    {
      id: "M-1",
      title: "Level up change requests",
      team: "PMO",
      progress: 72,
      points: 340,
      badge: "Change Champion",
      detail: "Earn points by moving requests through impact, owner, and governance checks.",
    },
    {
      id: "M-2",
      title: "Reduce decision latency",
      team: "Leadership",
      progress: 58,
      points: 260,
      badge: "Decision Accelerator",
      detail: "Resolve pending decisions with documented owners and options.",
    },
    {
      id: "M-3",
      title: "Complete Agile + AI controls",
      team: "Delivery",
      progress: 84,
      points: 410,
      badge: "Checklist Architect",
      detail: "Complete reusable Agile and AI/data controls before requests move to approval.",
    },
    {
      id: "M-4",
      title: "Govern AI/data assets",
      team: "AI Governance",
      progress: 46,
      points: 220,
      badge: "Responsible AI Steward",
      detail: "Package intake, data readiness, pilot, and adoption artifacts for reuse.",
    },
    {
      id: "M-5",
      title: "Reduce resource bottlenecks",
      team: "Portfolio PMO",
      progress: 34,
      points: 180,
      badge: "Capacity Balancer",
      detail: "Resolve over-allocation, add backup coverage, and reduce single-person dependency risk.",
    },
  ],
};

let state = loadState();

const elements = {
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  viewTitle: document.querySelector("#view-title"),
  viewContext: document.querySelector("#view-context"),
  workspaceTitle: document.querySelector("#workspace-title"),
  workspaceMeta: document.querySelector("#workspace-meta"),
  methodologySelect: document.querySelector("#methodology-select"),
  metricGrid: document.querySelector("#metric-grid"),
  workflowTitle: document.querySelector("#workflow-title"),
  workflowBoard: document.querySelector("#workflow-board"),
  queueList: document.querySelector("#queue-list"),
  requestList: document.querySelector("#request-list"),
  decisionList: document.querySelector("#decision-list"),
  checklistList: document.querySelector("#checklist-list"),
  presetList: document.querySelector("#preset-list"),
  missionList: document.querySelector("#mission-list"),
  sowLayerList: document.querySelector("#sow-layer-list"),
  sowComponentList: document.querySelector("#sow-component-list"),
  sowRiskList: document.querySelector("#sow-risk-list"),
  sowScheduleList: document.querySelector("#sow-schedule-list"),
  sowStatement: document.querySelector("#sow-statement"),
  sowIndustrySelect: document.querySelector("#sow-industry-select"),
  scopeBaselineSummary: document.querySelector("#scope-baseline-summary"),
  baselineComponentList: document.querySelector("#baseline-component-list"),
  stakeholderSignoffList: document.querySelector("#stakeholder-signoff-list"),
  changeControlGateList: document.querySelector("#change-control-gate-list"),
  resourceSummaryGrid: document.querySelector("#resource-summary-grid"),
  resourceAllocationList: document.querySelector("#resource-allocation-list"),
  skillCoverageList: document.querySelector("#skill-coverage-list"),
  resourceConflictList: document.querySelector("#resource-conflict-list"),
  notionSummaryGrid: document.querySelector("#notion-summary-grid"),
  notionMappingList: document.querySelector("#notion-mapping-list"),
  notionInsightList: document.querySelector("#notion-insight-list"),
  notionSetupList: document.querySelector("#notion-setup-list"),
  notionLastSync: document.querySelector("#notion-last-sync"),
  healthSummaryGrid: document.querySelector("#health-summary-grid"),
  overallHealthPanel: document.querySelector("#overall-health-panel"),
  executiveBriefPanel: document.querySelector("#executive-brief-panel"),
  healthDimensionGrid: document.querySelector("#health-dimension-grid"),
  healthDriverList: document.querySelector("#health-driver-list"),
  steeringActionList: document.querySelector("#steering-action-list"),
  healthFreshnessPill: document.querySelector("#health-freshness-pill"),
  aiGovernanceList: document.querySelector("#ai-governance-list"),
  reusableAssetList: document.querySelector("#reusable-asset-list"),
  customSummary: document.querySelector("#custom-summary"),
  industrySelect: document.querySelector("#industry-select"),
  governanceRange: document.querySelector("#governance-range"),
  pointsReview: document.querySelector("#points-review"),
  pointsRisk: document.querySelector("#points-risk"),
  signupDialog: document.querySelector("#signup-dialog"),
  signupForm: document.querySelector("#signup-form"),
  quickSignup: document.querySelector("#quick-signup"),
  communitySignup: document.querySelector('form[name="ozzypm-community"]'),
  communityFormStatus: document.querySelector("#community-form-status"),
  newChecklistStep: document.querySelector("#new-checklist-step"),
};

const viewTitles = {
  dashboard: "Project Command Dashboard",
  "health-scorecard": "Project Health Scorecard",
  "sow-studio": "SOW Breakdown Studio",
  "scope-baseline": "Scope Baseline Control",
  "resource-capacity": "Resource Capacity Control",
  "notion-sync": "Notion Sync",
  "change-requests": "Change Request Center",
  decisions: "Decision Studio",
  checklists: "Checklist Builder",
  "ai-governance": "AI Governance Assets",
  gamification: "Team Missions",
  customize: "Customization Studio",
};

const viewDescriptions = {
  dashboard: "Start with portfolio health, then open the workstream that needs attention.",
  "health-scorecard": "Aggregate project signals into executive health, drivers, freshness, and steering actions.",
  "sow-studio": "Break down the SOW into work packages, checkpoints, schedule logic, and delivery risks.",
  "scope-baseline": "Confirm what is committed, who signed off, and which changes need formal control.",
  "resource-capacity": "Inspect overloaded people, scarce skills, priority collisions, and backup coverage gaps.",
  "notion-sync": "Map Notion workspaces into OzzyPM so PM signals can become briefs and reusable records.",
  "change-requests": "Review scope, budget, schedule, risk, and approval readiness before changes move.",
  decisions: "Capture options, owners, timing, and decision readiness so teams stop circling.",
  checklists: "Use repeatable delivery, agile, and AI/data controls across industries.",
  "ai-governance": "Review AI/data gates from opportunity intake through launch, monitoring, and adoption.",
  gamification: "Turn good delivery behavior into team missions that reinforce adoption and accountability.",
  customize: "Tune the operating model by industry, governance strictness, and reward behavior.",
};

function normalizeState(nextState) {
  const normalized = {
    ...structuredClone(initialState),
    ...nextState,
  };

  normalized.workspace = {
    ...initialState.workspace,
    ...(nextState.workspace ?? {}),
  };
  normalized.points = {
    ...initialState.points,
    ...(nextState.points ?? {}),
  };
  normalized.industry = industryPresets[normalized.industry] ? normalized.industry : "technology";
  if (!normalized.sow || !sowPlaybooks[normalized.sow.industry]) {
    normalized.sow = buildSowState(normalized.industry);
  } else {
    normalized.sow = {
      ...buildSowState(normalized.sow.industry),
      ...normalized.sow,
    };
  }

  const baselineIndustry = normalized.scopeBaseline?.industry ?? normalized.industry;
  const baselineDefaults = buildScopeBaselineState(sowPlaybooks[baselineIndustry] ? baselineIndustry : normalized.industry);
  normalized.scopeBaseline = {
    ...baselineDefaults,
    ...(normalized.scopeBaseline ?? {}),
    components: baselineDefaults.components.map((component, index) => ({
      ...component,
      ...((normalized.scopeBaseline?.components ?? [])[index] ?? {}),
    })),
    stakeholders: baselineDefaults.stakeholders.map((stakeholder, index) => ({
      ...stakeholder,
      ...((normalized.scopeBaseline?.stakeholders ?? [])[index] ?? {}),
    })),
    changeGates: baselineDefaults.changeGates.map((gate, index) => ({
      ...gate,
      ...((normalized.scopeBaseline?.changeGates ?? [])[index] ?? {}),
    })),
  };

  const resourceIndustry = normalized.resourceCapacity?.industry ?? normalized.industry;
  const resourceDefaults = buildResourceCapacityState(sowPlaybooks[resourceIndustry] ? resourceIndustry : normalized.industry);
  normalized.resourceCapacity = {
    ...resourceDefaults,
    ...(normalized.resourceCapacity ?? {}),
    projects: resourceDefaults.projects.map((project, index) => ({
      ...project,
      ...((normalized.resourceCapacity?.projects ?? [])[index] ?? {}),
    })),
    resources: resourceDefaults.resources.map((resource, index) => {
      const storedResource = (normalized.resourceCapacity?.resources ?? [])[index] ?? {};
      return {
        ...resource,
        ...storedResource,
        skills: storedResource.skills ?? resource.skills,
        allocations: storedResource.allocations ?? resource.allocations,
      };
    }),
  };

  const notionDefaults = buildNotionSyncState();
  normalized.notionSync = {
    ...notionDefaults,
    ...(normalized.notionSync ?? {}),
    mappings: notionDefaults.mappings.map((mapping, index) => ({
      ...mapping,
      ...((normalized.notionSync?.mappings ?? [])[index] ?? {}),
    })),
    setup: notionDefaults.setup.map((step, index) => ({
      ...step,
      ...((normalized.notionSync?.setup ?? [])[index] ?? {}),
    })),
    insights: Array.isArray(normalized.notionSync?.insights) ? normalized.notionSync.insights : notionDefaults.insights,
  };

  normalized.healthScorecard = {
    ...buildHealthScorecardState(),
    ...(normalized.healthScorecard ?? {}),
  };

  normalized.requests = (normalized.requests ?? initialState.requests).map(enrichRequest);
  normalized.missions = initialState.missions.map((mission, index) => ({
    ...mission,
    ...((nextState.missions ?? [])[index] ?? {}),
  }));

  if (!Array.isArray(normalized.checklist) || !normalized.checklist.some((item) => item.type)) {
    normalized.checklist = buildChecklistForIndustry(normalized.industry);
  }

  return normalized;
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return structuredClone(initialState);
  }

  try {
    return normalizeState(JSON.parse(stored));
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setView(viewName) {
  elements.views.forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });

  elements.navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  elements.viewTitle.textContent = viewTitles[viewName] ?? viewTitles.dashboard;
  elements.viewContext.textContent = viewDescriptions[viewName] ?? viewDescriptions.dashboard;
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function riskClass(risk) {
  return risk.toLowerCase();
}

function completePercent(items) {
  if (!items.length) return 0;
  const complete = items.filter((item) => item.complete).length;
  return Math.round((complete / items.length) * 100);
}

function statusPercent(items, completeStatus) {
  if (!items.length) return 0;
  const complete = items.filter((item) => item.status === completeStatus).length;
  return Math.round((complete / items.length) * 100);
}

function scopeBaselineReadiness() {
  const componentApproval = statusPercent(state.scopeBaseline.components, "Approved");
  const stakeholderApproval = statusPercent(state.scopeBaseline.stakeholders, "Signed Off");
  const gateCompletion = statusPercent(state.scopeBaseline.changeGates, "Complete");
  return Math.round((componentApproval + stakeholderApproval + gateCompletion) / 3);
}

function resourceHours(resource) {
  return resource.allocations.reduce((sum, allocation) => sum + allocation.hours, 0);
}

function resourceUtilization(resource) {
  return Math.round((resourceHours(resource) / resource.capacity) * 100);
}

function utilizationRisk(resource) {
  const utilization = resourceUtilization(resource);
  if (utilization > 100) return "High";
  if (utilization >= 85) return "Medium";
  return "Low";
}

function skillCoverage() {
  const resources = state.resourceCapacity.resources;
  const allocationSkills = resources.flatMap((resource) => resource.allocations.map((allocation) => allocation.skill));
  const skills = [...new Set([...criticalSkills, ...allocationSkills])];

  return skills
    .map((skill) => {
      const holders = resources.filter((resource) => resource.skills.includes(skill));
      const demand = resources.flatMap((resource) => resource.allocations).reduce((sum, allocation) => {
        return allocation.skill === skill ? sum + allocation.hours : sum;
      }, 0);
      const risk = holders.length <= 1 ? "Guru Risk" : holders.length === 2 ? "Thin Coverage" : "Covered";

      return {
        skill,
        holders,
        demand,
        risk,
      };
    })
    .sort((a, b) => {
      const riskRank = { "Guru Risk": 0, "Thin Coverage": 1, Covered: 2 };
      return riskRank[a.risk] - riskRank[b.risk] || b.demand - a.demand || a.skill.localeCompare(b.skill);
    });
}

function capacityConflicts() {
  const overloads = state.resourceCapacity.resources
    .filter((resource) => resourceHours(resource) > resource.capacity)
    .map((resource) => ({
      type: "Over-allocation",
      status: "Conflict",
      severity: "High",
      title: `${resource.name} is at ${resourceUtilization(resource)}% capacity`,
      detail: `${resourceHours(resource) - resource.capacity} hours above capacity across ${resource.allocations.length} active assignments.`,
      owner: resource.role,
    }));

  const guruRisks = skillCoverage()
    .filter((skill) => skill.risk === "Guru Risk" && skill.demand > 0)
    .map((skill) => ({
      type: "Guru dependency",
      status: "Guru Risk",
      severity: "Medium",
      title: `${skill.skill} depends on ${skill.holders[0]?.name ?? "one person"}`,
      detail: `${skill.demand} hours of demand with no named backup coverage.`,
      owner: "Portfolio PMO",
    }));

  const hotResources = state.resourceCapacity.resources
    .filter((resource) => resource.allocations.filter((allocation) => allocation.priority === "High").length >= 2)
    .map((resource) => ({
      type: "Priority collision",
      status: "Needs Review",
      severity: utilizationRisk(resource),
      title: `${resource.name} is split across high-priority work`,
      detail: `${resource.allocations.filter((allocation) => allocation.priority === "High").length} high-priority assignments compete for the same skill set.`,
      owner: resource.role,
    }));

  return [...overloads, ...guruRisks, ...hotResources].slice(0, 8);
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function averageScore(values) {
  if (!values.length) return 100;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function scoreStatus(score) {
  if (score >= 85) return { label: "Green", className: "healthy", summary: "On track" };
  if (score >= 70) return { label: "Watch", className: "watch", summary: "Needs monitoring" };
  if (score >= 55) return { label: "At Risk", className: "at-risk", summary: "Needs action" };
  return { label: "Critical", className: "critical", summary: "Executive intervention" };
}

function healthScorecardSnapshot() {
  const baselineReadiness = scopeBaselineReadiness();
  const conflicts = capacityConflicts();
  const coverage = skillCoverage();
  const resources = state.resourceCapacity.resources;
  const openRequests = state.requests.filter((request) => request.status !== "Approved");
  const highRiskRequests = openRequests.filter((request) => request.risk === "High");
  const timelinePressure = openRequests.filter((request) => request.impact?.timeline && request.impact.timeline !== "No change").length;
  const pendingDecisions = state.decisions.filter((decision) => decision.status !== "Approved");
  const pendingSignoffs = state.scopeBaseline.stakeholders.filter((stakeholder) => stakeholder.status !== "Signed Off");
  const openBaselineItems = state.scopeBaseline.components.filter((item) => item.status !== "Approved").length;
  const incompleteSowLayers = sowLayers.length - state.sow.approvedLayerIds.length;
  const overallocated = resources.filter((resource) => resourceHours(resource) > resource.capacity).length;
  const averageUtilization = averageScore(resources.map(resourceUtilization));
  const guruRisks = coverage.filter((skill) => skill.risk === "Guru Risk" && skill.demand > 0).length;
  const checklistCompletion = completePercent(state.checklist);
  const aiReadiness = completePercent(state.checklist.filter((item) => item.type === "AI/Data"));
  const decisionReadiness = averageScore(state.decisions.map((decision) => decision.checklistComplete));
  const syncedMappings = state.notionSync.mappings.filter((mapping) => mapping.status === "Synced").length;
  const staleHours = Math.max(0, Number(state.healthScorecard.staleHours ?? 0));
  const liveDataBonus = syncedMappings > 0 ? 5 : 0;

  const scheduleScore = clampScore(100 - timelinePressure * 7 - pendingDecisions.length * 3 - incompleteSowLayers * 2 - Math.min(conflicts.length, 5) * 2);
  const scopeScore = clampScore(55 + baselineReadiness * 0.45 - openRequests.length * 3 - highRiskRequests.length * 5 + state.governance * 2);
  const resourceScore = clampScore(72 - overallocated * 10 - Math.min(guruRisks, 4) * 4 - Math.max(0, averageUtilization - 90));
  const riskScore = clampScore(82 + Math.round((checklistCompletion + aiReadiness) / 8) - highRiskRequests.length * 8 - conflicts.filter((item) => item.severity === "High").length * 6 - pendingSignoffs.length * 3);
  const decisionScore = clampScore(70 + decisionReadiness * 0.3 - pendingDecisions.length * 8 + baselineReadiness * 0.1);
  const dataFreshnessScore = clampScore(100 - staleHours * 6 + liveDataBonus);

  const dimensions = [
    {
      key: "schedule",
      label: "Schedule Health",
      score: scheduleScore,
      source: "SOW, changes, decisions",
      detail: `${timelinePressure} schedule-impacting request${timelinePressure === 1 ? "" : "s"}; ${incompleteSowLayers} SOW layer${incompleteSowLayers === 1 ? "" : "s"} still need review.`,
    },
    {
      key: "scope",
      label: "Scope Stability",
      score: scopeScore,
      source: "Baseline + change control",
      detail: `${baselineReadiness}% baseline readiness with ${openBaselineItems} open baseline item${openBaselineItems === 1 ? "" : "s"}.`,
    },
    {
      key: "resources",
      label: "Resource Capacity",
      score: resourceScore,
      source: "Multi-project allocation",
      detail: `${overallocated} over-allocated person${overallocated === 1 ? "" : "s"}; ${guruRisks} guru-risk skill${guruRisks === 1 ? "" : "s"}.`,
    },
    {
      key: "risk",
      label: "Risk Exposure",
      score: riskScore,
      source: "RAID, AI/data controls",
      detail: `${highRiskRequests.length} high-risk change${highRiskRequests.length === 1 ? "" : "s"}; ${aiReadiness}% AI/data readiness.`,
    },
    {
      key: "decisions",
      label: "Decision Velocity",
      score: decisionScore,
      source: "Decision studio",
      detail: `${pendingDecisions.length} decision${pendingDecisions.length === 1 ? "" : "s"} still need steering or owner action.`,
    },
    {
      key: "freshness",
      label: "Data Freshness",
      score: dataFreshnessScore,
      source: "OzzyPM + Notion signals",
      detail: `${staleHours} hour${staleHours === 1 ? "" : "s"} since aggregation; ${syncedMappings} synced source${syncedMappings === 1 ? "" : "s"}.`,
    },
  ].map((dimension) => ({
    ...dimension,
    status: scoreStatus(dimension.score),
  }));

  const overall = clampScore(
    scheduleScore * 0.17 +
      scopeScore * 0.18 +
      resourceScore * 0.22 +
      riskScore * 0.18 +
      decisionScore * 0.15 +
      dataFreshnessScore * 0.1,
  );
  const overallStatus = scoreStatus(overall);
  const drivers = [];

  if (staleHours >= 4) {
    drivers.push({
      severity: "Medium",
      type: "Data freshness",
      title: `Status data is ${staleHours} hours old`,
      detail: "Refresh aggregation before steering so the committee sees current scope, capacity, decision, and change signals.",
      owner: "Project manager",
    });
  }

  conflicts.slice(0, 3).forEach((conflict) => {
    drivers.push({
      severity: conflict.severity,
      type: conflict.type,
      title: conflict.title,
      detail: conflict.detail,
      owner: conflict.owner,
    });
  });

  pendingSignoffs.slice(0, 2).forEach((stakeholder) => {
    drivers.push({
      severity: "Medium",
      type: "Sign-off gap",
      title: `${stakeholder.name} has not signed off`,
      detail: `${stakeholder.concern} Due: ${stakeholder.due}.`,
      owner: stakeholder.role,
    });
  });

  highRiskRequests.slice(0, 2).forEach((request) => {
    drivers.push({
      severity: "High",
      type: "Change risk",
      title: `${request.id}: ${request.title}`,
      detail: `${request.challenge} Timeline impact: ${request.impact.timeline}.`,
      owner: request.owner,
    });
  });

  pendingDecisions.slice(0, 2).forEach((decision) => {
    drivers.push({
      severity: decision.risk,
      type: "Decision needed",
      title: `${decision.id}: ${decision.title}`,
      detail: `Owner: ${decision.owner}. Due: ${decision.due}. Options: ${decision.options.join(" / ")}.`,
      owner: decision.owner,
    });
  });

  if (!drivers.length) {
    drivers.push({
      severity: "Low",
      type: "Stable",
      title: "No major blockers detected",
      detail: "Current scope, capacity, change, decision, and governance signals are inside the demo tolerance.",
      owner: "PMO",
    });
  }

  const actions = [
    {
      title: "Confirm the top blocker owner",
      ask: drivers[0]?.title ?? "Confirm project owner alignment",
      owner: drivers[0]?.owner ?? "Project manager",
      due: "Before next steering review",
    },
    {
      title: "Approve or defer pending decisions",
      ask: pendingDecisions.length ? `${pendingDecisions.length} decision path${pendingDecisions.length === 1 ? "" : "s"} need closure.` : "No decision escalation needed right now.",
      owner: pendingDecisions[0]?.owner ?? "Steering committee",
      due: pendingDecisions[0]?.due ?? "Monitor",
    },
    {
      title: "Refresh project data before publishing",
      ask: staleHours >= 4 ? "Run aggregation so the status view is current." : "Aggregation is fresh enough for the demo steering view.",
      owner: "Project manager",
      due: state.healthScorecard.reportingCycle,
    },
  ];

  return {
    overall,
    overallStatus,
    dimensions,
    drivers: drivers.slice(0, 7),
    actions,
    signals: {
      openRequests: openRequests.length,
      pendingDecisions: pendingDecisions.length,
      pendingSignoffs: pendingSignoffs.length,
      conflicts: conflicts.length,
      staleHours,
      sourceCount: state.healthScorecard.sourceCount,
    },
  };
}

function buildCurrentNotionInsights() {
  const resourceSignals = capacityConflicts().slice(0, 3).map((conflict) => ({
    type: conflict.type,
    status: conflict.status,
    title: conflict.title,
    detail: conflict.detail,
    source: "Allocations database",
  }));
  const signoffSignals = state.scopeBaseline.stakeholders
    .filter((stakeholder) => stakeholder.status !== "Signed Off")
    .slice(0, 2)
    .map((stakeholder) => ({
      type: "Sign-off",
      status: stakeholder.status,
      title: `${stakeholder.name} has not accepted the baseline`,
      detail: `${stakeholder.role}. Due: ${stakeholder.due}. ${stakeholder.concern}`,
      source: "Sign-offs / Decisions database",
    }));
  const changeSignals = state.requests
    .filter((request) => request.status !== "Approved")
    .slice(0, 2)
    .map((request) => ({
      type: "Change Control",
      status: request.status,
      title: `${request.id}: ${request.title}`,
      detail: `${request.challenge} Scope impact: ${request.impact.scope}; risk: ${request.impact.risk}.`,
      source: "Change Requests database",
    }));

  return [...resourceSignals, ...signoffSignals, ...changeSignals].slice(0, 7);
}

async function fetchLiveNotionSync() {
  try {
    const response = await fetch("/api/notion", { cache: "no-store" });
    if (!response.ok) return null;

    const payload = await response.json();
    return payload.mode === "notion-live-sync" ? payload : null;
  } catch {
    return null;
  }
}

function updateWorkspaceChrome() {
  const industry = industryPresets[state.industry];
  elements.workspaceTitle.textContent = state.workspace.company || "Sandbox Company";
  elements.workspaceMeta.textContent = `${methodologyLabels[state.methodology]} approach | ${industry.label}`;
  elements.methodologySelect.value = state.methodology;
  elements.industrySelect.value = state.industry;
  elements.governanceRange.value = state.governance;
  elements.pointsReview.value = state.points.review;
  elements.pointsRisk.value = state.points.risk;
}

function renderMetrics() {
  const openRequests = state.requests.filter((request) => request.status !== "Approved").length;
  const pendingDecisions = state.decisions.filter((decision) => decision.status !== "Approved").length;
  const baselineReadiness = scopeBaselineReadiness();
  const conflicts = capacityConflicts();
  const guruRiskCount = skillCoverage().filter((skill) => skill.risk === "Guru Risk" && skill.demand > 0).length;
  const checklistCompletion = completePercent(state.checklist);
  const aiControls = state.checklist.filter((item) => item.type === "AI/Data");
  const aiReadiness = completePercent(aiControls);
  const totalPoints = state.missions.reduce((sum, mission) => sum + mission.points, 0);

  const metrics = [
    {
      label: "Open change requests",
      value: openRequests,
      trend: "Gamified queue",
      detail: "Scope, timeline, budget, risk, and point rewards tracked together.",
    },
    {
      label: "Pending decisions",
      value: pendingDecisions,
      trend: "Decision log active",
      detail: "Options, owner, due date, and rationale remain visible.",
    },
    {
      label: "Scope baseline readiness",
      value: `${baselineReadiness}%`,
      trend: state.scopeBaseline.version,
      detail: "Baseline components, sign-offs, and change gates are tracked together.",
    },
    {
      label: "Resource conflicts",
      value: conflicts.length,
      trend: `${guruRiskCount} guru risks`,
      detail: "Over-allocation, priority collisions, and single-person skill dependencies are visible.",
    },
    {
      label: "Checklist completion",
      value: `${checklistCompletion}%`,
      trend: "Agile + AI controls",
      detail: "Reusable industry templates combine delivery and governance checks.",
    },
    {
      label: "AI governance readiness",
      value: `${aiReadiness}%`,
      trend: `${aiGovernanceAssets.length} gates`,
      detail: "Use-case, data, model, pilot, and adoption gates are packaged for reuse.",
    },
    {
      label: "Mission points",
      value: totalPoints,
      trend: `+${state.points.review} per review`,
      detail: "Teams earn points for speed, quality, and risk reduction.",
    },
  ];

  elements.metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
          <div class="metric-trend">${metric.trend}</div>
          <span>${metric.detail}</span>
        </article>
      `,
    )
    .join("");
}


function renderWorkflow() {
  const stages = methodologyStages[state.methodology];
  const items = [
    ...state.requests.map((request) => ({
      id: request.id,
      title: request.title,
      stageIndex: request.stageIndex,
      meta: `${request.status} | ${request.risk} risk`,
    })),
    ...state.decisions.map((decision) => ({
      id: decision.id,
      title: decision.title,
      stageIndex: decision.stageIndex,
      meta: `${decision.status} | due ${decision.due}`,
    })),
  ];

  elements.workflowTitle.textContent = `${methodologyLabels[state.methodology]} delivery flow`;
  elements.workflowBoard.innerHTML = stages
    .map((stage, index) => {
      const stageItems = items.filter((item) => item.stageIndex === index);
      const itemHtml =
        stageItems
          .map(
            (item) => `
              <div class="stage-item">
                <strong>${item.id}</strong>
                <span>${item.title}</span>
                <span>${item.meta}</span>
              </div>
            `,
          )
          .join("") || `<div class="stage-item"><span>No active work in this stage</span></div>`;

      return `
        <section class="workflow-stage">
          <h4>${index + 1}. ${stage}</h4>
          ${itemHtml}
        </section>
      `;
    })
    .join("");
}

function renderQueue() {
  const queueItems = [
    ...capacityConflicts().slice(0, 2).map((conflict) => ({
      id: "RESOURCE",
      title: conflict.title,
      type: conflict.type,
      status: conflict.status,
    })),
    ...state.scopeBaseline.stakeholders
      .filter((stakeholder) => stakeholder.status !== "Signed Off")
      .map((stakeholder) => ({
        id: "SIGN-OFF",
        title: stakeholder.name,
        type: stakeholder.role,
        status: stakeholder.status,
      })),
    ...state.requests
      .filter((request) => request.status !== "Approved")
      .map((request) => ({
        id: request.id,
        title: request.title,
        type: "Change request",
        status: request.status,
      })),
    ...state.decisions.map((decision) => ({
      id: decision.id,
      title: decision.title,
      type: "Decision",
      status: decision.status,
    })),
  ].slice(0, 5);

  elements.queueList.innerHTML = queueItems
    .map(
      (item) => `
        <article class="queue-item">
          <div>
            <strong>${item.id}: ${item.title}</strong>
            <span>${item.type}</span>
          </div>
          <span class="status-pill ${statusClass(item.status)}">${item.status}</span>
        </article>
      `,
    )
    .join("");
}

function renderRequests() {
  elements.requestList.innerHTML = state.requests
    .map(
      (request) => `
        <article class="record-card change-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(request.status)}">${request.status}</span>
            <span class="risk-pill ${riskClass(request.risk)}">${request.risk} risk</span>
            <span class="score-pill">${request.points} pts</span>
          </div>
          <h4>${request.id}: ${request.title}</h4>
          <span>Owner: ${request.owner}</span>
          <div class="challenge-box">
            <strong>${request.badge}</strong>
            <span>${request.challenge}</span>
          </div>
          <div class="impact-grid">
            <div><span>Budget</span><strong>${request.impact.budget}</strong></div>
            <div><span>Timeline</span><strong>${request.impact.timeline}</strong></div>
            <div><span>Scope</span><strong>${request.impact.scope}</strong></div>
            <div><span>Risk</span><strong>${request.impact.risk}</strong></div>
          </div>
          <div class="score-grid">
            <div><span>Approval checklist</span><strong>${request.checklistComplete}%</strong></div>
            <div><span>Quality score</span><strong>${request.qualityScore}%</strong></div>
          </div>
          <div class="progress-bar" aria-hidden="true"><span style="width: ${request.checklistComplete}%"></span></div>
          <button class="secondary-button compact" data-progress-request="${request.id}">Advance +${request.points} pts</button>
        </article>
      `,
    )
    .join("");
}

function renderScopeBaseline() {
  const baseline = state.scopeBaseline;
  const componentApproval = statusPercent(baseline.components, "Approved");
  const stakeholderApproval = statusPercent(baseline.stakeholders, "Signed Off");
  const gateCompletion = statusPercent(baseline.changeGates, "Complete");
  const openBaselineItems = baseline.components.filter((item) => item.status !== "Approved").length;

  elements.scopeBaselineSummary.innerHTML = [
    {
      label: "Baseline readiness",
      value: `${scopeBaselineReadiness()}%`,
      detail: `${baseline.version} | ${baseline.lastUpdated}`,
    },
    {
      label: "Component approval",
      value: `${componentApproval}%`,
      detail: `${openBaselineItems} baseline components still need human review.`,
    },
    {
      label: "Stakeholder sign-off",
      value: `${stakeholderApproval}%`,
      detail: `${baseline.stakeholders.length} stakeholder groups tracked before commitment.`,
    },
    {
      label: "Change gate completion",
      value: `${gateCompletion}%`,
      detail: "A deviation cannot move forward without impact, decision, and sign-off evidence.",
    },
  ]
    .map(
      (item) => `
        <article class="baseline-summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.baselineComponentList.innerHTML = baseline.components
    .map(
      (component) => `
        <article class="baseline-component-card">
          <div class="record-meta">
            <span class="score-pill">${component.id}</span>
            <span class="status-pill ${statusClass(component.status)}">${component.status}</span>
          </div>
          <h4>${component.title}</h4>
          <span>Owner: ${component.owner}</span>
          <span>Source: ${component.source}</span>
          <div class="challenge-box">
            <strong>Control rule</strong>
            <span>${component.control}</span>
          </div>
          <span>Evidence: ${component.evidence}</span>
          <button class="secondary-button compact" data-approve-baseline="${component.id}">Approve Component</button>
        </article>
      `,
    )
    .join("");

  elements.stakeholderSignoffList.innerHTML = baseline.stakeholders
    .map(
      (stakeholder) => `
        <article class="stakeholder-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(stakeholder.status)}">${stakeholder.status}</span>
            <span class="check-type">Due: ${stakeholder.due}</span>
          </div>
          <h4>${stakeholder.name}</h4>
          <span>${stakeholder.role}</span>
          <p>${stakeholder.concern}</p>
          <button class="secondary-button compact" data-signoff-stakeholder="${stakeholder.id}">Capture Sign-off</button>
        </article>
      `,
    )
    .join("");

  elements.changeControlGateList.innerHTML = baseline.changeGates
    .map(
      (gate) => `
        <article class="change-gate-card ${gate.status === "Active" ? "active" : ""}">
          <div class="record-meta">
            <span class="status-pill ${statusClass(gate.status)}">${gate.status}</span>
            <span class="check-type">${gate.owner}</span>
          </div>
          <h4>${gate.title}</h4>
          <p>${gate.evidence}</p>
        </article>
      `,
    )
    .join("");
}

function renderResourceCapacity() {
  const resources = state.resourceCapacity.resources;
  const conflicts = capacityConflicts();
  const coverage = skillCoverage();
  const overallocated = resources.filter((resource) => resourceHours(resource) > resource.capacity).length;
  const averageUtilization = Math.round(
    resources.reduce((sum, resource) => sum + resourceUtilization(resource), 0) / resources.length,
  );
  const guruRisks = coverage.filter((skill) => skill.risk === "Guru Risk" && skill.demand > 0).length;
  const backupCandidates = resources.filter((resource) => resourceUtilization(resource) < 85).length;

  elements.resourceSummaryGrid.innerHTML = [
    {
      label: "Average utilization",
      value: `${averageUtilization}%`,
      detail: `${state.resourceCapacity.planningWindow} portfolio view across ${state.resourceCapacity.projects.length} projects.`,
    },
    {
      label: "Over-allocated people",
      value: overallocated,
      detail: "People above capacity need level loading, scope trade-offs, or a sequencing decision.",
    },
    {
      label: "Guru-risk skills",
      value: guruRisks,
      detail: "Critical skills with demand and only one named holder create single points of failure.",
    },
    {
      label: "Backup candidates",
      value: backupCandidates,
      detail: state.resourceCapacity.lastAction,
    },
  ]
    .map(
      (item) => `
        <article class="resource-summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.resourceAllocationList.innerHTML = resources
    .map((resource) => {
      const utilization = resourceUtilization(resource);
      const hours = resourceHours(resource);
      const risk = utilizationRisk(resource);
      return `
        <article class="resource-card">
          <div class="record-meta">
            <span class="risk-pill ${riskClass(risk)}">${risk} load</span>
            <span class="score-pill">${hours}/${resource.capacity} hrs</span>
          </div>
          <h4>${resource.name}</h4>
          <span>${resource.role}</span>
          <div class="skill-chip-list">
            ${resource.skills.map((skill) => `<span class="check-type">${skill}</span>`).join("")}
          </div>
          <div class="progress-bar resource-load ${risk.toLowerCase()}" aria-hidden="true"><span style="width: ${Math.min(utilization, 100)}%"></span></div>
          <span>${utilization}% allocated across ${resource.allocations.length} assignments</span>
          <div class="allocation-list">
            ${resource.allocations
              .map(
                (allocation) => `
                  <div class="allocation-item">
                    <strong>${allocation.project}</strong>
                    <span>${allocation.skill} | ${allocation.hours} hrs | ${allocation.priority}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
          <button class="secondary-button compact" data-level-resource="${resource.id}">Level Load</button>
        </article>
      `;
    })
    .join("");

  elements.skillCoverageList.innerHTML = coverage
    .filter((skill) => skill.demand > 0 || criticalSkills.includes(skill.skill))
    .slice(0, 9)
    .map(
      (skill) => `
        <article class="skill-card ${statusClass(skill.risk)}">
          <div class="record-meta">
            <span class="status-pill ${statusClass(skill.risk)}">${skill.risk}</span>
            <span class="check-type">${skill.holders.length} holder${skill.holders.length === 1 ? "" : "s"}</span>
          </div>
          <h4>${skill.skill}</h4>
          <span>Demand: ${skill.demand} hrs in ${state.resourceCapacity.planningWindow}</span>
          <span>Coverage: ${skill.holders.map((holder) => holder.name).join(" / ") || "No named owner"}</span>
          <button class="secondary-button compact" data-add-skill-backup="${skill.skill}">Add Backup</button>
        </article>
      `,
    )
    .join("");

  elements.resourceConflictList.innerHTML = conflicts.length
    ? conflicts
        .map(
          (conflict) => `
            <article class="resource-conflict-card">
              <div class="record-meta">
                <span class="status-pill ${statusClass(conflict.status)}">${conflict.status}</span>
                <span class="risk-pill ${riskClass(conflict.severity)}">${conflict.severity}</span>
                <span class="check-type">${conflict.type}</span>
              </div>
              <h4>${conflict.title}</h4>
              <span>Owner: ${conflict.owner}</span>
              <p>${conflict.detail}</p>
            </article>
          `,
        )
        .join("")
    : `<article class="resource-conflict-card"><h4>No active conflicts</h4><p>Capacity and backup coverage are inside the current tolerance.</p></article>`;
}

function renderNotionSync() {
  const notion = state.notionSync;
  const mappedCount = notion.mappings.filter((mapping) => ["Mapped", "Synced"].includes(mapping.status)).length;
  const recordCount = notion.mappings.reduce((sum, mapping) => sum + (mapping.records ?? 0), 0);
  const liveReady = notion.setup.filter((step) => step.status === "Ready").length;

  elements.notionLastSync.textContent = notion.lastSync;
  elements.notionSummaryGrid.innerHTML = [
    {
      label: "Connection mode",
      value: notion.connectionStatus,
      detail: notion.mode,
    },
    {
      label: "Mapped databases",
      value: `${mappedCount}/${notion.mappings.length}`,
      detail: "Projects, resources, allocations, changes, sign-offs, and PM briefs are supported.",
    },
    {
      label: "Records previewed",
      value: recordCount,
      detail: "Demo rows are shaped like the data OzzyPM expects from Notion.",
    },
    {
      label: "Generated insights",
      value: notion.insights.length,
      detail: notion.reportStatus,
    },
  ]
    .map(
      (item) => `
        <article class="notion-summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.notionMappingList.innerHTML = notion.mappings
    .map(
      (mapping) => `
        <article class="notion-mapping-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(mapping.status)}">${mapping.status}</span>
            <span class="score-pill">${mapping.records ?? 0} rows</span>
          </div>
          <h4>${mapping.label}</h4>
          <span>Target: ${mapping.target}</span>
          <span>Env: ${mapping.envKey}</span>
          <div class="skill-chip-list">
            ${mapping.required.map((property) => `<span class="check-type">${property}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");

  elements.notionInsightList.innerHTML = notion.insights
    .map(
      (insight) => `
        <article class="notion-insight-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(insight.status)}">${insight.status}</span>
            <span class="check-type">${insight.type}</span>
          </div>
          <h4>${insight.title}</h4>
          <span>Source: ${insight.source}</span>
          <p>${insight.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.notionSetupList.innerHTML = notion.setup
    .map(
      (step, index) => `
        <article class="notion-setup-card">
          <div class="record-meta">
            <span class="score-pill">${index + 1}</span>
            <span class="status-pill ${statusClass(step.status)}">${step.status}</span>
          </div>
          <h4>${step.title}</h4>
          <p>${step.detail}</p>
        </article>
      `,
    )
    .join("");
}

function renderHealthScorecard() {
  const snapshot = healthScorecardSnapshot();
  const worstDimension = [...snapshot.dimensions].sort((a, b) => a.score - b.score)[0];
  const readyForSteering = snapshot.overall >= 70 && snapshot.signals.staleHours < 4;

  elements.healthFreshnessPill.textContent = `${snapshot.signals.staleHours}h data age`;
  elements.healthSummaryGrid.innerHTML = [
    {
      label: "Overall health",
      value: `${snapshot.overall}%`,
      detail: `${snapshot.overallStatus.label} | ${snapshot.overallStatus.summary}`,
    },
    {
      label: "Auto signals",
      value: snapshot.signals.sourceCount,
      detail: "Scope, schedule, risk, capacity, decisions, and data freshness are aggregated.",
    },
    {
      label: "Executive drivers",
      value: snapshot.drivers.length,
      detail: `${worstDimension.label} is the current weakest dimension at ${worstDimension.score}%.`,
    },
    {
      label: "Steering readiness",
      value: readyForSteering ? "Ready" : "Review",
      detail: state.healthScorecard.briefStatus,
    },
  ]
    .map(
      (item) => `
        <article class="health-summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.overallHealthPanel.innerHTML = `
    <div class="health-ring ${snapshot.overallStatus.className}" style="--score: ${snapshot.overall}%">
      <strong>${snapshot.overall}</strong>
      <span>${snapshot.overallStatus.label}</span>
    </div>
    <div class="health-overall-copy">
      <p class="eyebrow">Aggregated project health</p>
      <h3>${state.workspace.company || "Sandbox Company"} needs ${snapshot.overallStatus.summary.toLowerCase()}.</h3>
      <p>
        OzzyPM is reading ${snapshot.signals.sourceCount} delivery signal groups and replacing manual status compilation with visible drivers, data freshness, and steering actions.
      </p>
      <div class="health-signal-row">
        <span>${snapshot.signals.openRequests} open changes</span>
        <span>${snapshot.signals.conflicts} capacity alerts</span>
        <span>${snapshot.signals.pendingDecisions} pending decisions</span>
      </div>
    </div>
  `;

  elements.executiveBriefPanel.innerHTML = `
    <article class="executive-brief-card">
      <span class="health-status ${snapshot.overallStatus.className}">${snapshot.overallStatus.label}</span>
      <h4>${state.workspace.company || "Sandbox Company"} is at ${snapshot.overall}% health.</h4>
      <p><strong>What changed:</strong> ${snapshot.drivers[0].title}</p>
      <p><strong>Why it matters:</strong> ${snapshot.drivers[0].detail}</p>
      <p><strong>Decision needed:</strong> ${snapshot.actions[0].ask}</p>
      <p><strong>Publish state:</strong> ${state.healthScorecard.lastAggregated}</p>
    </article>
  `;

  elements.healthDimensionGrid.innerHTML = snapshot.dimensions
    .map(
      (dimension) => `
        <article class="health-dimension-card ${dimension.status.className}">
          <div class="record-meta">
            <span class="health-status ${dimension.status.className}">${dimension.status.label}</span>
            <span class="check-type">${dimension.source}</span>
          </div>
          <h4>${dimension.label}</h4>
          <strong>${dimension.score}%</strong>
          <div class="progress-bar health-bar ${dimension.status.className}" aria-hidden="true"><span style="width: ${dimension.score}%"></span></div>
          <p>${dimension.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.healthDriverList.innerHTML = snapshot.drivers
    .map(
      (driver) => `
        <article class="health-driver-card ${riskClass(driver.severity)}">
          <div class="record-meta">
            <span class="risk-pill ${riskClass(driver.severity)}">${driver.severity}</span>
            <span class="check-type">${driver.type}</span>
          </div>
          <h4>${driver.title}</h4>
          <span>Owner: ${driver.owner}</span>
          <p>${driver.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.steeringActionList.innerHTML = snapshot.actions
    .map(
      (action) => `
        <article class="steering-action-card">
          <span class="score-pill">${action.due}</span>
          <h4>${action.title}</h4>
          <p>${action.ask}</p>
          <span>Owner: ${action.owner}</span>
        </article>
      `,
    )
    .join("");
}


function renderDecisions() {
  elements.decisionList.innerHTML = state.decisions
    .map(
      (decision) => `
        <article class="record-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(decision.status)}">${decision.status}</span>
            <span class="risk-pill ${riskClass(decision.risk)}">${decision.risk} risk</span>
          </div>
          <h4>${decision.id}: ${decision.title}</h4>
          <span>Owner: ${decision.owner}</span>
          <span>Due: ${decision.due}</span>
          <div>
            <span>Options</span>
            <strong>${decision.options.join(" / ")}</strong>
          </div>
          <span>Decision readiness: ${decision.checklistComplete}%</span>
          <div class="progress-bar" aria-hidden="true"><span style="width: ${decision.checklistComplete}%"></span></div>
          <button class="secondary-button compact" data-progress-decision="${decision.id}">Advance Decision</button>
        </article>
      `,
    )
    .join("");
}

function renderChecklist() {
  elements.checklistList.innerHTML = state.checklist
    .map(
      (item) => `
        <label class="checklist-item">
          <input type="checkbox" data-checklist="${item.id}" ${item.complete ? "checked" : ""} />
          <span class="check-type">${item.type ?? "Delivery"}</span>
          <strong>${item.text}</strong>
          <span>${item.complete ? "Complete" : "Open"}</span>
        </label>
      `,
    )
    .join("");

  elements.presetList.innerHTML = Object.entries(industryPresets)
    .map(
      ([key, preset]) => `
        <article class="preset-item">
          <strong>${preset.label}</strong>
          <span>${preset.focus}</span>
          <span class="template-meta">${preset.agileChecklist.length} Agile controls | ${preset.aiDataChecklist.length} AI/data controls</span>
          <button class="secondary-button compact" data-preset="${key}">Use Template</button>
        </article>
      `,
    )
    .join("");
}


function renderMissions() {
  elements.missionList.innerHTML = state.missions
    .map(
      (mission) => `
        <article class="mission-card">
          <span class="badge success">${mission.badge}</span>
          <h4>${mission.title}</h4>
          <span>Team: ${mission.team}</span>
          <span>${mission.detail}</span>
          <strong>${mission.points} points</strong>
          <div class="progress-bar" aria-hidden="true"><span style="width: ${mission.progress}%"></span></div>
          <span>${mission.progress}% mission progress</span>
          <button class="secondary-button compact" data-complete-mission="${mission.id}">Add Progress</button>
        </article>
      `,
    )
    .join("");
}


function renderCustomSummary() {
  const industry = industryPresets[state.industry];
  const stages = methodologyStages[state.methodology];
  const strictnessLabels = ["Light", "Guided", "Balanced", "Controlled", "Strict"];

  elements.customSummary.innerHTML = `
    <article class="summary-item">
      <strong>Industry playbook</strong>
      <span>${industry.label}: ${industry.focus}</span>
    </article>
    <article class="summary-item">
      <strong>Methodology</strong>
      <span>${methodologyLabels[state.methodology]} workflow: ${stages.join(" -> ")}</span>
    </article>
    <article class="summary-item">
      <strong>Governance</strong>
      <span>${strictnessLabels[state.governance - 1]} controls with ${state.points.review} review points and ${state.points.risk} risk-reduction points.</span>
    </article>
    <article class="summary-item">
      <strong>Reusable assets</strong>
      <span>${industry.agileChecklist.length} Agile controls, ${industry.aiDataChecklist.length} AI/data controls, ${aiGovernanceAssets.length} AI governance gates, and ${reusableAssets.length} reusable asset templates.</span>
    </article>
  `;
}


function renderAiGovernance() {
  elements.aiGovernanceList.innerHTML = aiGovernanceAssets
    .map(
      (asset) => `
        <article class="governance-card">
          <div>
            <span class="badge success">${asset.deliverable}</span>
            <h4>${asset.gate}</h4>
            <span>Owner: ${asset.owner}</span>
          </div>
          <ul>
            ${asset.checks.map((check) => `<li>${check}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");

  elements.reusableAssetList.innerHTML = reusableAssets
    .map(
      (asset) => `
        <article class="asset-card">
          <strong>${asset.title}</strong>
          <span>${asset.detail}</span>
        </article>
      `,
    )
    .join("");
}

function renderSowStudio() {
  const sow = state.sow;
  const playbook = sowPlaybooks[sow.industry] ?? sowPlaybooks.technology;
  elements.sowStatement.value = sow.statement;
  elements.sowIndustrySelect.value = sow.industry;

  elements.sowLayerList.innerHTML = sowLayers
    .map((layer, index) => {
      const approved = sow.approvedLayerIds.includes(layer.id);
      const active = index === sow.currentLayerIndex;
      return `
        <article class="sow-layer ${approved ? "approved" : ""} ${active ? "active" : ""}">
          <div>
            <span class="status-pill ${approved ? "approved" : active ? "under-review" : "needs-info"}">${approved ? "Approved" : active ? "Human Review" : "Pending"}</span>
            <h4>${layer.title}</h4>
            <p>${layer.output}</p>
          </div>
          <strong>${layer.humanCheck}</strong>
        </article>
      `;
    })
    .join("");

  elements.sowComponentList.innerHTML = sow.components
    .map(
      (component) => `
        <article class="work-package-card">
          <div class="record-meta">
            <span class="score-pill">${component.id}</span>
            <span class="check-type">${playbook.method}</span>
          </div>
          <h4>${component.title}</h4>
          <span>Owner: ${component.owner}</span>
          <span>Duration: ${component.duration}</span>
          <span>Dependency: ${component.dependency}</span>
          <div class="challenge-box">
            <strong>Human checkpoint</strong>
            <span>${component.humanCheck}</span>
          </div>
        </article>
      `,
    )
    .join("");

  elements.sowRiskList.innerHTML = sow.components
    .map(
      (component) => `
        <article class="risk-card">
          <span class="risk-pill ${component.risk.toLowerCase().includes("gap") || component.risk.toLowerCase().includes("delay") ? "high" : "medium"}">Risk</span>
          <strong>${component.risk}</strong>
          <span>${component.title}</span>
          <span>Response: ${component.humanCheck}</span>
        </article>
      `,
    )
    .join("");

  elements.sowScheduleList.innerHTML = sow.components
    .map(
      (component, index) => `
        <article class="schedule-item">
          <span>Phase ${index + 1}</span>
          <strong>${component.title}</strong>
          <span>${component.duration}</span>
        </article>
      `,
    )
    .join("");
}

function rebuildSowFromInputs() {
  const industryKey = elements.sowIndustrySelect.value;
  state.sow = buildSowState(industryKey);
  state.sow.statement = elements.sowStatement.value.trim() || sowPlaybooks[industryKey].sowPrompt;
  state.industry = industryKey;
  state.scopeBaseline = buildScopeBaselineState(industryKey);
  state.resourceCapacity = buildResourceCapacityState(industryKey);
  state.notionSync = buildNotionSyncState();
  saveState();
  renderAll();
}

function approveSowLayer() {
  const layer = sowLayers[state.sow.currentLayerIndex];
  if (!layer) return;

  if (!state.sow.approvedLayerIds.includes(layer.id)) {
    state.sow.approvedLayerIds.push(layer.id);
  }
  state.sow.currentLayerIndex = Math.min(sowLayers.length - 1, state.sow.currentLayerIndex + 1);
  state.missions[2].progress = Math.min(100, state.missions[2].progress + 5);
  state.missions[2].points += state.points.review;
  saveState();
  renderAll();
}

function resetSowLayers() {
  state.sow.approvedLayerIds = ["intake"];
  state.sow.currentLayerIndex = 1;
  saveState();
  renderAll();
}

function currentTimestamp() {
  return new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function refreshHealthAggregation() {
  state.healthScorecard.lastAggregated = `Fresh aggregation ${currentTimestamp()}`;
  state.healthScorecard.staleHours = 0;
  state.healthScorecard.briefStatus = "Fresh scorecard is ready for PM review.";
  saveState();
  renderAll();
}

function prepareExecutiveBrief() {
  const snapshot = healthScorecardSnapshot();
  state.healthScorecard.briefStatus = `${snapshot.overallStatus.label} executive brief prepared from ${snapshot.signals.sourceCount} signal groups.`;
  state.healthScorecard.lastAggregated = `Executive brief prepared ${currentTimestamp()}`;
  state.notionSync.insights = [
    {
      type: "Health Scorecard",
      status: snapshot.overallStatus.label,
      title: `${state.workspace.company || "Sandbox Company"} is at ${snapshot.overall}% project health`,
      detail: `${snapshot.drivers[0].title}. Steering ask: ${snapshot.actions[0].ask}`,
      source: "OzzyPM health scorecard",
    },
    ...buildCurrentNotionInsights(),
  ].slice(0, 8);
  state.missions[1].progress = Math.min(100, state.missions[1].progress + 6);
  state.missions[1].points += state.points.review;
  saveState();
  renderAll();
}

function renderAll() {
  updateWorkspaceChrome();
  renderMetrics();
  renderWorkflow();
  renderQueue();
  renderSowStudio();
  renderScopeBaseline();
  renderResourceCapacity();
  renderNotionSync();
  renderHealthScorecard();
  renderRequests();
  renderDecisions();
  renderChecklist();
  renderMissions();
  renderAiGovernance();
  renderCustomSummary();
}

function applyIndustryPreset(industryKey) {
  const preset = industryPresets[industryKey];
  state.industry = industryKey;
  state.checklist = buildChecklistForIndustry(industryKey);
  state.scopeBaseline = buildScopeBaselineState(industryKey);
  state.resourceCapacity = buildResourceCapacityState(industryKey);
  state.notionSync = buildNotionSyncState();
  state.missions[2].progress = Math.max(state.missions[2].progress, 35);
  state.missions[3].progress = Math.max(state.missions[3].progress, 35);
  saveState();
  renderAll();
}

function approveBaselineComponent(id) {
  const component = state.scopeBaseline.components.find((item) => item.id === id);
  if (!component) return;

  component.status = "Approved";
  state.scopeBaseline.lastUpdated = `${component.id} approved by human review`;
  state.missions[2].progress = Math.min(100, state.missions[2].progress + 4);
  state.missions[2].points += state.points.review;
  saveState();
  renderAll();
}

function signOffStakeholder(id) {
  const stakeholder = state.scopeBaseline.stakeholders.find((item) => item.id === id);
  if (!stakeholder) return;

  stakeholder.status = "Signed Off";
  stakeholder.concern = "Baseline accepted. Any deviation now routes through change control.";
  state.scopeBaseline.lastUpdated = `${stakeholder.name} signed off baseline`;
  state.missions[1].progress = Math.min(100, state.missions[1].progress + 5);
  state.missions[1].points += state.points.review;
  saveState();
  renderAll();
}

function advanceChangeGate() {
  const baseline = state.scopeBaseline;
  const currentGate = baseline.changeGates[baseline.activeGateIndex];
  if (!currentGate) return;

  currentGate.status = "Complete";
  baseline.activeGateIndex = Math.min(baseline.changeGates.length - 1, baseline.activeGateIndex + 1);
  baseline.changeGates.forEach((gate, index) => {
    if (index < baseline.activeGateIndex) gate.status = "Complete";
    if (index === baseline.activeGateIndex && gate.status !== "Complete") gate.status = "Active";
  });
  baseline.lastUpdated = `${currentGate.title} completed`;
  state.missions[0].progress = Math.min(100, state.missions[0].progress + 5);
  state.missions[0].points += state.points.review;
  saveState();
  renderAll();
}

function resetBaselineSignoffs() {
  state.scopeBaseline.stakeholders = buildScopeBaselineState(state.industry).stakeholders;
  state.scopeBaseline.lastUpdated = "Stakeholder sign-offs reset for baseline review";
  saveState();
  renderAll();
}

function routeBaselineChange() {
  const nextNumber = 112 + state.requests.length;
  state.requests.unshift(enrichRequest({
    id: `CR-${nextNumber}`,
    title: "Baseline scope change assessment",
    owner: "PMO",
    status: "Needs Info",
    risk: state.governance >= 4 ? "High" : "Medium",
    stageIndex: 0,
    checklistComplete: 30,
    qualityScore: 35,
    points: state.governance >= 4 ? 140 : 100,
    challenge: "Attach baseline delta, stakeholder impact, and approval evidence before work moves.",
    badge: "Baseline Guardian",
    impact: {
      budget: "TBD",
      timeline: "TBD",
      scope: "Baseline",
      risk: state.governance >= 4 ? "High" : "Moderate",
    },
  }, 0));
  state.scopeBaseline.activeGateIndex = 1;
  state.scopeBaseline.changeGates = buildScopeBaselineState(state.scopeBaseline.industry).changeGates;
  state.scopeBaseline.lastUpdated = "Baseline deviation routed to change control";
  saveState();
  renderAll();
  setView("change-requests");
}

function rewardCapacityWork(points = 20, progress = 6) {
  const mission = state.missions.find((item) => item.id === "M-5");
  if (!mission) return;

  mission.progress = Math.min(100, mission.progress + progress);
  mission.points += points;
}

function levelLoadResource(resourceId) {
  const resource = state.resourceCapacity.resources.find((item) => item.id === resourceId);
  if (!resource) return;

  const overage = resourceHours(resource) - resource.capacity;
  if (overage <= 0) {
    state.resourceCapacity.lastAction = `${resource.name} is within capacity; no load shift needed.`;
    saveState();
    renderAll();
    return;
  }

  const movableAllocation = [...resource.allocations]
    .filter((allocation) => allocation.hours > 4)
    .sort((a, b) => (a.priority === "High") - (b.priority === "High") || b.hours - a.hours)[0];

  if (!movableAllocation) return;

  const target = state.resourceCapacity.resources
    .filter((candidate) => candidate.id !== resource.id && resourceUtilization(candidate) < 90)
    .sort((a, b) => resourceUtilization(a) - resourceUtilization(b))[0];

  const movedHours = Math.min(6, overage, movableAllocation.hours - 2);
  movableAllocation.hours -= movedHours;
  resource.allocations = resource.allocations.map((allocation) =>
    allocation.project === movableAllocation.project && allocation.skill === movableAllocation.skill
      ? movableAllocation
      : allocation,
  );

  if (target) {
    if (!target.skills.includes(movableAllocation.skill)) {
      target.skills.push(movableAllocation.skill);
    }
    target.allocations.push({
      project: movableAllocation.project,
      skill: movableAllocation.skill,
      hours: movedHours,
      priority: "Shared support",
    });
    state.resourceCapacity.lastAction = `${movedHours} hours moved from ${resource.name} to ${target.name} for ${movableAllocation.skill}.`;
  } else {
    state.resourceCapacity.lastAction = `${movedHours} hours removed from ${resource.name}; PM review should resequence the work.`;
  }

  rewardCapacityWork(state.points.risk, 8);
  saveState();
  renderAll();
}

function levelLoadConflicts() {
  const overloaded = state.resourceCapacity.resources
    .filter((resource) => resourceHours(resource) > resource.capacity)
    .sort((a, b) => resourceUtilization(b) - resourceUtilization(a))[0];

  if (!overloaded) {
    state.resourceCapacity.lastAction = "No over-allocation remains in the current planning window.";
    saveState();
    renderAll();
    return;
  }

  levelLoadResource(overloaded.id);
}

function addBackupCoverage(skillName) {
  const targetSkill = skillName || skillCoverage().find((skill) => skill.risk !== "Covered" && skill.demand > 0)?.skill;
  if (!targetSkill) return;

  const candidate = state.resourceCapacity.resources
    .filter((resource) => !resource.skills.includes(targetSkill))
    .sort((a, b) => resourceUtilization(a) - resourceUtilization(b))[0];

  if (!candidate) {
    state.resourceCapacity.lastAction = `${targetSkill} already has named coverage across the current resource pool.`;
    saveState();
    renderAll();
    return;
  }

  candidate.skills.push(targetSkill);
  state.resourceCapacity.lastAction = `${candidate.name} added as backup coverage for ${targetSkill}.`;
  rewardCapacityWork(state.points.review, 6);
  saveState();
  renderAll();
}

async function previewNotionSync() {
  const now = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  const livePayload = await fetchLiveNotionSync();

  state.notionSync.connectionStatus = livePayload ? "Live sync complete" : "Demo sync complete";
  state.notionSync.lastSync = livePayload ? `Live sync ${now}` : `Preview synced ${now}`;
  state.notionSync.reportStatus = "PM brief is ready to review before write-back.";
  state.notionSync.mappings = state.notionSync.mappings.map((mapping) => ({
    ...mapping,
    status: "Synced",
    records: livePayload?.databases?.[mapping.key]?.length ?? mapping.demoRecords,
  }));
  state.notionSync.setup = state.notionSync.setup.map((step) => ({
    ...step,
    status: "Ready",
  }));
  state.notionSync.insights = buildCurrentNotionInsights();
  saveState();
  renderAll();
}

function generateNotionBrief() {
  const conflicts = capacityConflicts();
  const pendingSignoffs = state.scopeBaseline.stakeholders.filter((stakeholder) => stakeholder.status !== "Signed Off").length;
  const openRequests = state.requests.filter((request) => request.status !== "Approved").length;
  state.notionSync.insights = [
    {
      type: "Executive Brief",
      status: conflicts.length ? "Needs Review" : "Ready",
      title: "Portfolio delivery risk summary",
      detail: `${conflicts.length} resource or knowledge risks, ${pendingSignoffs} pending baseline sign-offs, and ${openRequests} open change requests need PM attention.`,
      source: "OzzyPM generated brief",
    },
    ...buildCurrentNotionInsights(),
  ].slice(0, 8);
  state.notionSync.reportStatus = "Brief generated from current OzzyPM signals.";
  saveState();
  renderAll();
}

async function writeNotionReport() {
  const now = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  let liveReportWritten = false;

  try {
    const response = await fetch("/api/notion", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "create-report",
        title: "OzzyPM portfolio brief",
        summary: state.notionSync.insights.map((insight) => insight.title).join(" | "),
        riskLevel: capacityConflicts().length ? "High" : "Medium",
      }),
    });
    const payload = await response.json().catch(() => ({}));
    liveReportWritten = response.ok && Boolean(payload.id);
  } catch {
    liveReportWritten = false;
  }

  state.notionSync.connectionStatus = liveReportWritten ? "Live report written" : "Demo write-back queued";
  state.notionSync.lastSync = `Report prepared ${now}`;
  state.notionSync.reportStatus = liveReportWritten
    ? "Report created in NOTION_REPORTS_DATABASE_ID."
    : "Demo report would be created in NOTION_REPORTS_DATABASE_ID by /api/notion.";
  state.notionSync.mappings = state.notionSync.mappings.map((mapping) =>
    mapping.key === "reports"
      ? { ...mapping, status: liveReportWritten ? "Synced" : "Ready", records: (mapping.records ?? 0) + 1 }
      : mapping,
  );
  saveState();
  renderAll();
}


function progressRequest(id) {
  const request = state.requests.find((item) => item.id === id);
  if (!request) return;

  request.checklistComplete = Math.min(100, request.checklistComplete + 15);
  request.qualityScore = Math.min(100, (request.qualityScore ?? request.checklistComplete) + 12);
  request.stageIndex = Math.min(methodologyStages[state.methodology].length - 1, request.stageIndex + 1);

  if (request.checklistComplete >= 90) {
    request.status = "Approved";
  } else if (request.checklistComplete >= 55) {
    request.status = "Under Review";
  }

  state.missions[0].progress = Math.min(100, state.missions[0].progress + 8);
  state.missions[0].points += request.points;
  state.missions[3].progress = Math.min(100, state.missions[3].progress + (request.risk === "High" ? 6 : 3));
  state.missions[3].points += request.risk === "High" ? state.points.risk : Math.round(state.points.risk / 2);
  saveState();
  renderAll();
}


function progressDecision(id) {
  const decision = state.decisions.find((item) => item.id === id);
  if (!decision) return;

  decision.checklistComplete = Math.min(100, decision.checklistComplete + 20);
  decision.stageIndex = Math.min(methodologyStages[state.methodology].length - 1, decision.stageIndex + 1);
  decision.status = decision.checklistComplete >= 90 ? "Approved" : "In Progress";

  state.missions[1].progress = Math.min(100, state.missions[1].progress + 8);
  state.missions[1].points += state.points.review;
  saveState();
  renderAll();
}

function addRequest() {
  const nextNumber = 112 + state.requests.length;
  state.requests.unshift(enrichRequest({
    id: `CR-${nextNumber}`,
    title: "New AI/data governance change",
    owner: "Sandbox User",
    status: "Needs Info",
    risk: state.governance >= 4 ? "High" : "Medium",
    stageIndex: 0,
    checklistComplete: 20,
    qualityScore: 25,
    points: state.governance >= 4 ? 130 : 95,
    challenge: "Classify AI/data impact, assign owner, and complete readiness controls",
    badge: state.governance >= 4 ? "AI Risk Resolver" : "Governance Sprint",
    impact: {
      budget: "TBD",
      timeline: "TBD",
      scope: "Medium",
      risk: state.governance >= 4 ? "High" : "Moderate",
    },
  }, 0));
  saveState();
  renderAll();
}


function addDecision() {
  const nextNumber = 32 + state.decisions.length;
  state.decisions.unshift({
    id: `D-${nextNumber}`,
    title: "Select best path for new request",
    owner: "Sandbox User",
    status: "Pending",
    risk: "Medium",
    stageIndex: 0,
    options: ["Approve", "Defer", "Reject"],
    due: "Next checkpoint",
    checklistComplete: 25,
  });
  saveState();
  renderAll();
}

function addChecklistItem(itemText) {
  state.checklist.push({
    id: `CL-${Date.now()}`,
    text: itemText.trim(),
    complete: false,
  });
  saveState();
  renderAll();
}

function updateSignupFields() {
  document.querySelector("#signup-name").value = state.workspace.name;
  document.querySelector("#signup-email").value = state.workspace.email;
  document.querySelector("#signup-company").value = state.workspace.company;
  document.querySelector("#signup-goal").value = state.workspace.goal;
}

function trackSignupConversion(callback) {
  let callbackCompleted = false;
  const complete = () => {
    if (callbackCompleted) return;
    callbackCompleted = true;
    if (callback) callback();
  };

  if (typeof window.gtag !== "function") {
    complete();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: SIGNUP_CONVERSION_SEND_TO,
    event_callback: complete,
    event_timeout: SIGNUP_CONVERSION_TIMEOUT_MS,
  });

  window.setTimeout(complete, SIGNUP_CONVERSION_TIMEOUT_MS + 250);
}

function setCommunityFormStatus(message, isError = false) {
  if (!elements.communityFormStatus) return;

  elements.communityFormStatus.textContent = message;
  elements.communityFormStatus.classList.toggle("error", isError);
}

function communitySignupPayload() {
  const formData = new FormData(elements.communitySignup);

  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    focus: String(formData.get("focus") || "").trim(),
    newsletterConsent: formData.get("newsletter-consent") === "on",
    source: "ozzypm.com community form",
  };
}

async function saveCommunitySignup() {
  const response = await fetch(COMMUNITY_API_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(communitySignupPayload()),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || "Community database is not available yet.");
  }

  return payload;
}

async function handleCommunitySignupSubmit() {
  setCommunityFormStatus("Saving your community signup...");

  try {
    await saveCommunitySignup();
    elements.communitySignup.reset();
    delete elements.communitySignup.dataset.conversionSubmitting;
    setCommunityFormStatus("You are in. We will send practical PM notes and community updates.");
  } catch (error) {
    delete elements.communitySignup.dataset.conversionSubmitting;
    setCommunityFormStatus("We could not save your signup yet. Please try again or email ozzy@ozzypm.com.", true);
  }
}

function bindEvents() {
  elements.navItems.forEach((item) => {
    item.addEventListener("click", () => setView(item.dataset.view));
  });

  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewTarget));
  });

  elements.methodologySelect.addEventListener("change", (event) => {
    state.methodology = event.target.value;
    saveState();
    renderAll();
  });

  document.querySelector("#demo-reset").addEventListener("click", () => {
    state = structuredClone(initialState);
    saveState();
    renderAll();
    setView("dashboard");
  });

  document.querySelector("#open-signup").addEventListener("click", () => {
    updateSignupFields();
    elements.signupDialog.showModal();
  });

  elements.signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.workspace = {
      name: document.querySelector("#signup-name").value.trim(),
      email: document.querySelector("#signup-email").value.trim(),
      company: document.querySelector("#signup-company").value.trim(),
      goal: document.querySelector("#signup-goal").value,
    };
    saveState();
    renderAll();
    elements.signupDialog.close();
    trackSignupConversion();
  });

  document.querySelector("#close-signup").addEventListener("click", () => {
    elements.signupDialog.close();
  });

  document.querySelector("#cancel-signup").addEventListener("click", () => {
    elements.signupDialog.close();
  });

  elements.quickSignup.addEventListener("submit", (event) => {
    event.preventDefault();
    state.workspace.email = document.querySelector("#quick-email").value.trim();
    state.workspace.company = document.querySelector("#quick-company").value.trim();
    saveState();
    renderAll();
    trackSignupConversion();
  });

  if (elements.communitySignup) {
    elements.communitySignup.addEventListener("submit", (event) => {
      if (elements.communitySignup.dataset.conversionSubmitting === "true") return;

      event.preventDefault();
      trackSignupConversion(() => {
        elements.communitySignup.dataset.conversionSubmitting = "true";
        handleCommunitySignupSubmit();
      });
    });
  }

  document.querySelector("#add-request").addEventListener("click", addRequest);
  document.querySelector("#add-decision").addEventListener("click", addDecision);
  document.querySelector("#sow-generate").addEventListener("click", rebuildSowFromInputs);
  document.querySelector("#sow-approve-layer").addEventListener("click", approveSowLayer);
  document.querySelector("#sow-reset-layers").addEventListener("click", resetSowLayers);
  document.querySelector("#route-baseline-change").addEventListener("click", routeBaselineChange);
  document.querySelector("#reset-baseline-signoffs").addEventListener("click", resetBaselineSignoffs);
  document.querySelector("#advance-change-gate").addEventListener("click", advanceChangeGate);
  document.querySelector("#level-load-conflicts").addEventListener("click", levelLoadConflicts);
  document.querySelector("#add-backup-coverage").addEventListener("click", () => addBackupCoverage());
  document.querySelector("#refresh-health-scorecard").addEventListener("click", refreshHealthAggregation);
  document.querySelector("#prepare-executive-brief").addEventListener("click", prepareExecutiveBrief);
  document.querySelector("#preview-notion-sync").addEventListener("click", previewNotionSync);
  document.querySelector("#generate-notion-brief").addEventListener("click", generateNotionBrief);
  document.querySelector("#write-notion-report").addEventListener("click", writeNotionReport);
  document.querySelector("#focus-checklist-step").addEventListener("click", () => {
    setView("checklists");
    elements.newChecklistStep.focus();
  });

  document.querySelector("#checklist-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const itemText = elements.newChecklistStep.value.trim();
    if (!itemText) return;
    addChecklistItem(itemText);
    elements.newChecklistStep.value = "";
  });

  document.body.addEventListener("click", (event) => {
    const requestId = event.target.dataset.progressRequest;
    const decisionId = event.target.dataset.progressDecision;
    const preset = event.target.dataset.preset;
    const missionId = event.target.dataset.completeMission;
    const baselineComponentId = event.target.dataset.approveBaseline;
    const stakeholderId = event.target.dataset.signoffStakeholder;
    const levelResourceId = event.target.dataset.levelResource;
    const backupSkill = event.target.dataset.addSkillBackup;

    if (requestId) progressRequest(requestId);
    if (decisionId) progressDecision(decisionId);
    if (preset) applyIndustryPreset(preset);
    if (baselineComponentId) approveBaselineComponent(baselineComponentId);
    if (stakeholderId) signOffStakeholder(stakeholderId);
    if (levelResourceId) levelLoadResource(levelResourceId);
    if (backupSkill) addBackupCoverage(backupSkill);

    if (missionId) {
      const mission = state.missions.find((item) => item.id === missionId);
      if (!mission) return;
      mission.progress = Math.min(100, mission.progress + 10);
      mission.points += state.points.risk;
      saveState();
      renderAll();
    }
  });

  document.body.addEventListener("change", (event) => {
    const checklistId = event.target.dataset.checklist;
    if (!checklistId) return;

    const checklistItem = state.checklist.find((item) => item.id === checklistId);
    if (!checklistItem) return;

    checklistItem.complete = event.target.checked;
    const missionIndex = checklistItem.type === "AI/Data" ? 3 : 2;
    state.missions[missionIndex].progress = Math.min(100, state.missions[missionIndex].progress + 4);
    state.missions[missionIndex].points += event.target.checked ? 10 : -10;
    saveState();
    renderAll();
  });

  document.querySelector("#customize-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.industry = elements.industrySelect.value;
    state.governance = Number(elements.governanceRange.value);
    state.points.review = Number(elements.pointsReview.value);
    state.points.risk = Number(elements.pointsRisk.value);
    applyIndustryPreset(state.industry);
    setView("dashboard");
  });
}

bindEvents();
renderAll();

const initialHashView = window.location?.hash?.slice(1);
if (initialHashView && viewTitles[initialHashView]) {
  setView(initialHashView);
}
