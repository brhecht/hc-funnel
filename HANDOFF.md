# HANDOFF — HC Funnel
*Last updated: March 30, 2026 ~afternoon ET*

## Project Overview
Quiz-based lead magnet funnel for Humble Conviction's upcoming pitching/fundraising course. 8 scenario-based questions score founders across 4 dimensions, deliver a tier result with scorecard, and gate a personalized action plan behind email capture. Config-driven architecture — all content lives in `src/config/funnel.js`. Part of B-Suite, positioned as a sub-tool under B Marketing.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared `eddy-tracker-82486` project)
- **Email (marketing):** Kit (ConvertKit) V3 API via server-side Vercel proxy (`/api/subscribe`)
- **Email (transactional):** Resend — domain verified, API key configured, sends from results@humbleconviction.com
- **AI:** Anthropic Claude API (Sonnet) — API key configured in Vercel, generates personalized action plans
- **Hosting:** Vercel at quiz.humbleconviction.com (auto-deploy from git push). Also accessible at hc-funnel.vercel.app.
- **Repo:** github.com/brhecht/hc-funnel
- **Local path:** `~/Developer/clients/hc/hc-funnel`

## Folder Structure
```
hc-funnel/
├── src/
│   ├── App.jsx              — Router: / → Landing, /quiz → Quiz, /results → Results
│   ├── firebase.js          — Firestore lead save + Kit proxy + action plan request
│   ├── main.jsx             — React entry
│   ├── index.css            — Tailwind imports
│   ├── components/
│   │   └── Layout.jsx       — Branded shell (header, footer, cool-white bg, Inter font)
│   ├── config/
│   │   └── funnel.js        — ALL content: questions, scoring, results copy, email gate copy, design tokens
│   ├── hooks/
│   │   └── useMetaPixel.js  — Meta Pixel init, SPA PageView tracking, trackPixelEvent() helper. Uses trackCustom for custom events (QuizComplete), track for standard events.
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine (raw → display → tier), UTM capture
│   └── pages/
│       ├── Landing.jsx      — Hero + social proof + CTA
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation
├── ads/                     — Ad creative briefs, copy sheets, campaign setup docs, final ad images
├── research/                — Expert audit memos from March 18 session
├── api/
│   └── action-plan.js       — Vercel serverless: quiz data → Claude API → Resend email
├── index.html               — Inter font, Meta Pixel base code (ID 1407883507304464)
└── package.json
```

## Current Status
**META ADS CAMPAIGN IN DRAFT — AWAITING BRIAN'S APPROVAL ON ADVANTAGE+ OPTIONS (March 30, 2026).**

All 3 ad sets now configured with **QuizComplete** as conversion event. Custom conversion created in Events Manager and confirmed working in Ads Manager dropdown.

**Bug fixed (March 30):** Pixel ID in `index.html` was truncated — `1407883507304` (13 digits) instead of full `1407883507304464` (16 digits). This prevented QuizComplete from registering. Fixed, committed (`ea11058`), and deployed.

**Campaign structure in Meta Ads Manager:**
- **Campaign:** META_Conv_EddyQuiz_Mar26 (Sales objective, CBO OFF — pending Brian's decision)
- **Ad Set 1:** C1-Polite-Pass_Founders_Mar26 — $50/day, QuizComplete, US, 25-45, founder/VC interests
- **Ad Set 2:** C2-Room-Cant-Read_Founders_Mar26 — same targeting/budget, QuizComplete
- **Ad Set 3:** C4-Authority_Founders_Mar26 — same targeting/budget, QuizComplete
- **Total daily budget:** $150/day ($50 × 3)
- **Conversion event:** QuizComplete (all 3 ad sets)
- **Interest keywords:** Venture capital, Startups, Entrepreneurship, Business incubator, Angel investor

**Pending Brian's decisions (email sent March 30):**
1. Advantage+ Audience — use age/interests as suggestions (recommended) vs hard controls
2. Campaign Budget Optimization (CBO) — $150/day auto-distributed (recommended) vs manual $50/day per ad set

**Previous status still applies:** Action plan pipeline live. Still pending: Brian's prompt template (B8), quizAnswers wiring, [INTRO] copy, autoresponder emails in Kit (B7).

## Recent Changes (March 27, 2026 — Meta Ads Campaign Fix + Pixel Deploy)

### Campaign Review & Corrections
- Reviewed all 3 ad sets in Meta Ads Manager against handoff specs
- **Fixed:** C1 had minimum age 18 instead of 25 — corrected to match C4
- **Fixed:** C2 was using saved audience "Eddy Test 01" instead of manual interest targeting — corrected
- Brian flagged: optimization event should be QuizComplete, NOT CompleteRegistration
- Campaign duplicated to change conversion event (can't edit scheduled campaigns)

### Meta Pixel Finally Deployed to Production
- Discovered pixel code was **never committed or pushed** — changes from March 19 were sitting in local files only. Production site had no pixel.
- Committed and pushed: `index.html` (base pixel code with ID 1407883507304464) + `useMetaPixel.js` hook
- **Bug fix:** `trackPixelEvent()` was using `fbq('track', 'QuizComplete')` — Meta silently ignores custom events via `track`. Changed to auto-detect: standard events use `track`, custom events (like QuizComplete) use `trackCustom`.
- **Build fix:** `Landing.jsx`, `Quiz.jsx`, `Results.jsx` had stale imports (`trackPixel` instead of `trackPixelEvent`) — fixed across all three files over 3 commits.
- All events confirmed firing via Meta Pixel Helper after deploy.

### Commits Pushed This Session
1. `5650fcf` — Deploy Meta Pixel base code + event hooks
2. `32b5ce7` — Fix QuizComplete: use trackCustom for non-standard events
3. `d1edc1e` — Fix Landing.jsx import (trackPixel → trackPixelEvent)
4. `3742dd5` — Fix Quiz.jsx + Results.jsx imports (same issue)

## Known Bugs / Issues
- **Action plan prompt is placeholder** — endpoint works but uses a generic prompt. Brian needs to define final content/tone/structure (Task B8).
- **quizAnswers not passed to action plan endpoint** — currently only sends aggregated scores + tier. Brian wants individual answer choices + labels sent. See Brian's Priority 1.
- **No [INTRO] section in email template** — Brian wants a static intro paragraph before the AI-generated action plan. Needs his copy.

## Planned Features / Backlog
- Switch ad set optimization from ViewContent → QuizComplete (as soon as Meta registers the event)
- Wire quizAnswers into action plan endpoint (Brian's Priority 1)
- Drop Brian's final prompt into api/action-plan.js (blocked on Brian — B8)
- Hardcode [INTRO] section in email template (blocked on Brian)
- Set up tier-based Kit automations (blocked on Brian's autoresponder copy — B7)

## Meta Pixel Strategy
Expert research recommends a **two-phase approach:**
1. **Phase 1:** Optimize for QuizComplete. Higher volume, exits learning phase faster (need ~50 events/week).
2. **Phase 2 (after 2-3 weeks):** Shift to Lead (email capture) optimization once stable delivery and enough conversion history.

Do NOT skip Phase 1 — optimizing directly for email capture on a test budget will likely keep Meta stuck in learning phase.

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`.
- **Scenario-based questions:** Not self-assessment. Validated by SJT research.
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 per dimension → display 2/5, 3/5, or 4/5.
- **Tier thresholds:** ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate: partial reveal (trust-first).** Show tier + scorecard on web, gate action plan behind email.
- **No back button:** Research-backed for scenario-based quiz on mobile.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile.
- **Design system:** Navy text (#1A2332) + coral accent (#E8845A) on cool-white (#F8F9FC). Inter font.
- **trackCustom for custom events:** Meta ignores custom events via `fbq('track')`. Must use `fbq('trackCustom')`. The `trackPixelEvent()` helper auto-detects which to use.
- **Ad strategy:** 3 concepts (Concept 3 killed). Concept 2 predicted strongest for cold traffic. Concept 4 for retargeting.

## Environment & Config
- **Production URL:** https://quiz.humbleconviction.com (also https://hc-funnel.vercel.app)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads`
- **Kit account:** Humble Conviction (brhnyc1970@gmail.com). Tag: `quiz-lead` (ID 17618088).
- **Sending email:** results@humbleconviction.com (Resend + Kit verified)
- **Meta Pixel ID:** 1407883507304464 (HC Eddy Pixel)
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16).

## Open Questions / Decisions Pending
- When QuizComplete registers in Meta → switch ad sets and schedule campaign for launch
- Brian still needs to write autoresponder email copy (B7), action plan prompt (B8)
- Add `quiz.humbleconviction.com` domain in Events Manager → Settings → Domains (Brian)
