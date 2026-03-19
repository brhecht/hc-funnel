# HANDOFF — HC Funnel
*Last updated: March 19, 2026 ~afternoon ET*

## Project Overview
Quiz-based lead magnet funnel for Humble Conviction's upcoming pitching/fundraising course ("Eddy"). 8 scenario-based questions score founders across 4 dimensions, deliver a tier result with scorecard, and gate full recommendations behind email capture. Config-driven architecture — all content lives in `src/config/funnel.js`. Part of B-Suite, positioned as a sub-tool under B Marketing.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared `eddy-tracker-82486` project)
- **Email:** Kit (ConvertKit) V3 API via server-side Vercel proxy (`/api/subscribe`)
- **Hosting:** Vercel at hc-funnel.vercel.app (auto-deploy from git push)
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
│   │   ├── Layout.jsx       — Branded shell (header, footer, cool-white bg, Inter font)
│   │   └── AppSwitcher.jsx  — B Suite nav (HC Funnel removed from list)
│   ├── config/
│   │   └── funnel.js        — ALL content: questions, scoring, results copy, design tokens
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine (raw → display → tier)
│   └── pages/
│       ├── Landing.jsx      — "Investor-Tested Insights" hero + feature cards → /quiz CTA
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier badge → scorecard → email gate
├── HC-PHASE1-DISCOVERY.md   — Strategy/content bible (819 lines, all decisions + copy)
├── index.html               — Inter font loaded via Google Fonts
└── package.json
```

## Current Status
**Quiz funnel fully built and deployed. Now in email/ads/campaign prep phase.**

Live at hc-funnel.vercel.app with:
- 8 scenario-based questions (not self-assessment) following emotional arc: easy entry → uncomfortable middle → mirror → aspirational close
- 4-dimension scoring: Clarity, Investor Fluency, Self-Awareness, Persuasion Instincts
- 3-level display system (2/5, 3/5, 4/5 — no 5/5 exists; Self-Awareness floors at 3/5)
- 3 tiers: Lost in the Noise (raw 0-3) / The Pieces Are There (raw 4-9) / So Close It Hurts (raw 10+)
- Calculating pause animation (2.5s) before results
- Scorecard with filled-dot visualization + explanation + cracked door line per dimension
- Email gate with coral CTA card ("Send My Recommendations") + waitlist checkbox
- Firestore lead capture + Kit subscription working
- Design system: navy/orange palette (#F8F9FC bg, #1A2332 text, #E8845A accent), Inter font throughout

## Recent Changes (March 19, 2026)
No code changes to hc-funnel this session. All work was in the Eddy Tracker — rewriting tasks and timeline to align with the HC-PHASE1-DISCOVERY.md business memo. The business memo (HC-PHASE1-DISCOVERY.md) was referenced as the source of truth for what's been done and what remains.

## Known Bugs / Issues
None reported. Brian noted he has design/wording tweaks to make — expected polish pass.

## Planned Features / Backlog
- **Email results logic + content** (Brian, this week) — Define how each user's quiz answers in Firestore generate personalized results email content. Full recommendations + Brian's interpretation + concrete next steps. Rich HTML via Kit (not PDF).
- **Wire results email delivery** (Nico, this week → next) — Firestore lead data → Zapier → Kit. Trigger personalized results email based on tier + dimension scores.
- **5-email nurture/drip sequence** (Brian, W4) — Each email: one insight, one story, one CTA. Newsletter suppressed during drip.
- **Kit drip automation** (Nico, W4-W5) — Wire nurture sequence in Kit Visual Automation.
- **Meta Pixel** (Nico, this week) — tracking integration for ad attribution
- **Ad creatives** (Brian revising today, Nico production + upload) — for Meta campaign launch
- **Campaign launch** (W4) — $30-50/day, Pancake Principle: first 2-3 weeks for data collection
- **Post-launch optimization** — Metrics: CPC, CPL, quiz completion rate, email capture rate, waitlist check rate, score distribution

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. Founders choose how they'd respond in real investor situations. Reveals blind spots without requiring self-awareness (Dunning-Kruger is core ICP trait).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 per dimension → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** Validated via Monte Carlo (see `HC-PHASE1-DISCOVERY.md` Appendix F). Target distribution: ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate (Option C):** Show tier + scorecard on web, gate full results and recommendations behind email. Diagnosis on-page, prescription in email.
- **No back button:** Research-backed — back buttons increase abandonment, not completion.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile. All elements sized for 375px viewport. 56px min tap targets.
- **Design system:** Navy text (#1A2332) + orange accent (#E8845A) on cool-white (#F8F9FC). Inter font (single family, fast load). Research-backed for B2B trust and mobile readability.
- **Server-side Kit proxy** to bypass ad blockers (`/api/subscribe` Vercel serverless function).
- **"Conversation, Not Pitch"** is a core HC principle — threads through methodology, results copy, and future email content.
- **HC-PHASE1-DISCOVERY.md** is the strategy/content bible (819 lines). Contains all architecture decisions, quiz questions with scoring and aha reveals, results copy, Monte Carlo methodology, ICP profiles, brand voice registers.

## Environment & Config
- **Production URL:** https://hc-funnel.vercel.app
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Kit API key is server-side env var.
- **Firebase env vars:** `VITE_FIREBASE_*` in `.env` locally and Vercel dashboard

## Open Questions / Decisions Pending
- Brian's design/wording tweaks (will review live site)
- Email content architecture: how quiz answers map to personalized results email (Brian working on this now)
- When to start Meta ad campaign (depends on email wiring being ready + Pixel installed)
