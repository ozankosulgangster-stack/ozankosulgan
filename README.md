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
