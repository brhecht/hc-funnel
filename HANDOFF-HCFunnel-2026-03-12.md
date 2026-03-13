# HANDOFF — HC Funnel
*Last updated: March 12, 2026 ~9:30 PM ET*

## Project Overview
Marketing funnel for Humble Conviction's course on pitching/fundraising. Interactive 8-question quiz for lead generation and waitlist signup. Config-driven architecture — all content lives in src/config/funnel.js. Now positioned as a sub-tool under B Marketing (not a peer app in AppSwitcher). Part of B-Suite.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared eddy-tracker-82486 project with B Marketing)
- **Email:** Kit (ConvertKit) V3 API via server-side Vercel proxy
- **Hosting:** Vercel at hc-funnel.vercel.app
- **Repo:** github.com/brhecht/hc-funnel
- **Local path:** `~/Developer/B-Suite/hc-funnel`

## Folder Structure
```
hc-funnel/
├── src/
│   ├── App.jsx              — Router: / → Landing, /quiz → Quiz, /results → Results
│   ├── firebase.js          — Firestore lead save + Kit proxy calls
│   ├── main.jsx             — React entry
│   ├── index.css            — Tailwind imports
│   ├── components/
│   │   ├── Layout.jsx       — Branded shell (header, footer, cream bg)
│   │   └── AppSwitcher.jsx  — B Suite nav (HC Funnel removed from list)
│   ├── config/
│   │   └── funnel.js        — ALL content, scoring logic, copy (config-driven)
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine, deep dive state
│   └── pages/
│       ├── Landing.jsx      — Hero + feature cards → /quiz CTA
│       ├── Quiz.jsx         — 8 MC questions, progress bar, multi-select
│       └── Results.jsx      — Tier + friction + email capture + deep dive + waitlist
└── package.json
```

## Current Status
Fully working quiz funnel with 8-question scoring, 4-dimension readiness assessment, email capture via Kit, and waitlist signup. Firestore lead tracking with custom fields.

## Recent Changes (March 8–10, 2026)
- Removed HC Funnel from AppSwitcher (March 10) — now a sub-tool under Marketing

## Known Bugs / Issues
None reported

## Planned Features / Backlog
None explicitly queued

## Design Decisions & Constraints
- Config-driven: all quiz content, scoring, and copy in src/config/funnel.js
- Server-side Kit proxy to bypass ad blockers
- 4-dimension scoring system for readiness tiers
- Warm light theme: cream/coral palette, Playfair Display + DM Sans
- Positioned as sub-tool under B Marketing (not peer app)

## Environment & Config
- **Production URL:** https://hc-funnel.vercel.app
- **GitHub:** github.com/brhecht/hc-funnel
- **Firebase project:** eddy-tracker-82486 (shared with B Marketing)

## Open Questions / Decisions Pending
None
