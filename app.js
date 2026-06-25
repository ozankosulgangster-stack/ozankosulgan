const STORAGE_KEY = "ozankosulgan-v3-sandbox";

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
  ],
};

let state = loadState();

const elements = {
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  viewTitle: document.querySelector("#view-title"),
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
  newChecklistStep: document.querySelector("#new-checklist-step"),
};

const viewTitles = {
  dashboard: "Project Command Dashboard",
  "sow-studio": "SOW Breakdown Studio",
  "change-requests": "Change Request Center",
  decisions: "Decision Studio",
  checklists: "Checklist Builder",
  "ai-governance": "AI Governance Assets",
  gamification: "Team Missions",
  customize: "Customization Studio",
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

function renderAll() {
  updateWorkspaceChrome();
  renderMetrics();
  renderWorkflow();
  renderQueue();
  renderSowStudio();
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
  state.missions[2].progress = Math.max(state.missions[2].progress, 35);
  state.missions[3].progress = Math.max(state.missions[3].progress, 35);
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
  });

  document.querySelector("#add-request").addEventListener("click", addRequest);
  document.querySelector("#add-decision").addEventListener("click", addDecision);
  document.querySelector("#sow-generate").addEventListener("click", rebuildSowFromInputs);
  document.querySelector("#sow-approve-layer").addEventListener("click", approveSowLayer);
  document.querySelector("#sow-reset-layers").addEventListener("click", resetSowLayers);
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

    if (requestId) progressRequest(requestId);
    if (decisionId) progressDecision(decisionId);
    if (preset) applyIndustryPreset(preset);

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
