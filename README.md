# Ozankosulgan.com V3 Project Sandbox

This static sandbox prototypes a configurable project management platform for:

- Agile, Waterfall, and Hybrid ways of working
- Change request dashboards
- Decision tracking
- Reusable checklist templates
- Professional gamification with missions, points, and badges
- Industry-specific operating models

## Local Preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Website Integration

To add it as version 3 on Ozankosulgan.com, place these files under a route such as:

```text
/v3/
  index.html
  styles.css
  app.js
```

The current version stores sandbox signup and configuration data in browser `localStorage`.
For a production release, replace that with account authentication, a database-backed workspace
model, and company-level templates.

## Current Version

The site now combines two layers:

- A consulting front door for AI, data, PMO, governance, and partnership delivery services.
- An interactive project sandbox that demonstrates change request control, decision tracking, reusable checklists, methodology switching, industry presets, and team missions.

This gives potential customers a clearer story and a tangible preview of the operating model you can bring into their environment.

## Latest Additions

The sandbox now includes stronger reusable delivery assets:

- Gamified change requests with point rewards, quality scores, challenge badges, and risk-reduction missions.
- Industry playbooks that combine Agile delivery controls with AI/data governance controls.
- A dedicated AI Governance tab with reusable gates from opportunity intake through launch and adoption.
- A reusable asset library for AI use-case intake, data readiness, responsible AI RAID, pilot decisions, adoption scoreboards, and change-control game rules.

## About Section

The website now includes an About Me section that frames Ozan's journey from telecom delivery discipline into more software-centric AI and data project work. It highlights AI project management, data project delivery, PMO and governance, business-to-technical translation, adoption and change management, and vendor/customer/partnership execution.

## SOW Breakdown Studio

The sandbox now includes a layered statement-of-work planning workflow for common project-manager pain points:

- Intake and clarify the SOW with a human checkpoint before planning starts.
- Break the SOW into manageable work packages by industry playbook.
- Analyze dependencies, assumptions, schedule sequence, and ownership.
- Create a first-pass schedule with phase-level duration ranges.
- Identify risks and connect each risk to a human review action.
- Keep a human in the loop before scope, schedule, or risk is treated as a baseline.

The approach is designed to be reusable across industries, including technology/software, healthcare, construction, financial services, and education.
