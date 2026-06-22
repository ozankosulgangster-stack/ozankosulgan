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
    focus: "software delivery, release readiness, security review, customer impact",
    checklist: [
      "Confirm product owner priority and target release",
      "Estimate engineering, QA, and security impact",
      "Validate customer value and support readiness",
      "Document rollout, rollback, and communication plan",
      "Capture final decision and owner",
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
  },
};

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
  requests: [
    {
      id: "CR-102",
      title: "Add customer self-service portal",
      owner: "Product",
      status: "Under Review",
      risk: "Medium",
      stageIndex: 1,
      checklistComplete: 60,
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
  checklist: industryPresets.technology.checklist.map((text, index) => ({
    id: `CL-${index + 1}`,
    text,
    complete: index < 2,
  })),
  missions: [
    {
      id: "M-1",
      title: "Clear review queue",
      team: "PMO",
      progress: 72,
      points: 340,
      badge: "Governance Builder",
      detail: "Complete change reviews before the weekly steering meeting.",
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
      title: "Improve checklist quality",
      team: "Delivery",
      progress: 84,
      points: 410,
      badge: "Quality Operator",
      detail: "Complete required controls before requests move to approval.",
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
  "change-requests": "Change Request Center",
  decisions: "Decision Studio",
  checklists: "Checklist Builder",
  gamification: "Team Missions",
  customize: "Customization Studio",
};

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return structuredClone(initialState);
  }

  try {
    return {
      ...structuredClone(initialState),
      ...JSON.parse(stored),
    };
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
  const totalPoints = state.missions.reduce((sum, mission) => sum + mission.points, 0);

  const metrics = [
    {
      label: "Open change requests",
      value: openRequests,
      trend: "2 need owner action",
      detail: "Scope, timeline, budget, and risk tracked in one queue.",
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
      trend: "Reusable controls",
      detail: "Template steps can be reused across departments and industries.",
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
        <article class="record-card">
          <div class="record-meta">
            <span class="status-pill ${statusClass(request.status)}">${request.status}</span>
            <span class="risk-pill ${riskClass(request.risk)}">${request.risk} risk</span>
          </div>
          <h4>${request.id}: ${request.title}</h4>
          <span>Owner: ${request.owner}</span>
          <div class="impact-grid">
            <div><span>Budget</span><strong>${request.impact.budget}</strong></div>
            <div><span>Timeline</span><strong>${request.impact.timeline}</strong></div>
            <div><span>Scope</span><strong>${request.impact.scope}</strong></div>
            <div><span>Risk</span><strong>${request.impact.risk}</strong></div>
          </div>
          <span>Approval checklist: ${request.checklistComplete}%</span>
          <div class="progress-bar" aria-hidden="true"><span style="width: ${request.checklistComplete}%"></span></div>
          <button class="secondary-button compact" data-progress-request="${request.id}">Move Forward</button>
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
      <strong>Reuse strategy</strong>
      <span>Package checklist templates, approval roles, scoring rules, and dashboard metrics as a repeatable operating model per industry.</span>
    </article>
  `;
}

function renderAll() {
  updateWorkspaceChrome();
  renderMetrics();
  renderWorkflow();
  renderQueue();
  renderRequests();
  renderDecisions();
  renderChecklist();
  renderMissions();
  renderCustomSummary();
}

function applyIndustryPreset(industryKey) {
  const preset = industryPresets[industryKey];
  state.industry = industryKey;
  state.checklist = preset.checklist.map((text, index) => ({
    id: `CL-${Date.now()}-${index}`,
    text,
    complete: index < 2,
  }));
  saveState();
  renderAll();
}

function progressRequest(id) {
  const request = state.requests.find((item) => item.id === id);
  if (!request) return;

  request.checklistComplete = Math.min(100, request.checklistComplete + 15);
  request.stageIndex = Math.min(methodologyStages[state.methodology].length - 1, request.stageIndex + 1);

  if (request.checklistComplete >= 90) {
    request.status = "Approved";
  } else if (request.checklistComplete >= 55) {
    request.status = "Under Review";
  }

  state.missions[0].progress = Math.min(100, state.missions[0].progress + 6);
  state.missions[0].points += state.points.review;
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
  state.requests.unshift({
    id: `CR-${nextNumber}`,
    title: "New configurable industry change",
    owner: "Sandbox User",
    status: "Needs Info",
    risk: state.governance >= 4 ? "High" : "Medium",
    stageIndex: 0,
    checklistComplete: 20,
    impact: {
      budget: "TBD",
      timeline: "TBD",
      scope: "Medium",
      risk: state.governance >= 4 ? "High" : "Moderate",
    },
  });
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
    state.missions[2].progress = Math.min(100, state.missions[2].progress + 4);
    state.missions[2].points += event.target.checked ? 10 : -10;
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
