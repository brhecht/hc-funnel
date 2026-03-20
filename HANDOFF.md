# HANDOFF — HC Funnel
*Last updated: March 20, 2026 ~4:30pm ET*

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
- **Local path:** `~/Developer/B-Suite/hc-funnel`

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
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine (raw → display → tier), UTM capture
│   └── pages/
│       ├── Landing.jsx      — Hero + social proof + CTA. Tightened for mobile.
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation
├── api/
│   ├── action-plan.js       — Claude Sonnet generates personalized action plan → HC-branded HTML → Resend
│   └── subscribe.js         — Kit proxy (server-side to bypass ad blockers)
├── ads/
│   ├── CREATIVE-BRIEF.md         — Original creative brief (March 16). Superseded by revised brief.
│   ├── REVISED-CREATIVE-BRIEF-2026-03-18.md — CURRENT execution doc for ads. Read this first.
│   ├── NANO-BANANA-PROMPTS.md    — Image generation prompts for reference images
│   ├── ad-template-generator.html — Local HTML tool for generating ad mockups
│   └── phase1-references/        — 4 locked Nano Banana reference images + 1 alt
├── research/                     — Expert audit memos from March 18 session
├── ACTION-PLAN-PROMPT.md    — Claude prompt template + email design spec + voice rules
├── NICO-SPEC-ACTION-PLAN-LAUNCH.md — Brian's full spec (source of truth for remaining work)
├── QA-PROTOCOL.md           — 7 test scenarios for pre-launch QA
└── package.json
```

## Current Status

**WORKSTREAM 1 (Action Plan Email Pipeline): ✅ COMPLETE — deployed, live, needs end-to-end testing.**

All 4 tasks from Brian's spec are done (shipped by Claude Code on March 20):
- Task 1.1 ✅ Quiz answers with labels, second-weakest, strongest, scorecard copy, waitlist status all wired through pipeline
- Task 1.2 ✅ Brian's final prompt from `ACTION-PLAN-PROMPT.md` integrated into `api/action-plan.js`, max_tokens bumped to 2048, system parameter used
- Task 1.3 ✅ HTML email template rebuilt with section marker parser (`[HOLISTIC]`, `[WEAKEST]`, etc.), hardcoded intro, coral contrast closers (#E8845A left border), Brian header, unsubscribe footer
- Task 1.4 ⏳ End-to-end test pending (take quiz all 3 tiers, screenshots for Brian)

**Commits deployed (all on main, auto-deployed to Vercel):**
```
e5ef222 — frictionArea fixed (weakest dimension, not tier ID), error feedback on capture fail, /results redirect to /quiz
4e0010d — Unsubscribe link added to action plan email footer
52d2001 — Answer labels passed to action plan (full option text, not just letter IDs)
7e4be77 — Meta Pixel ID fixed (1407883507304464), events wired: ViewContent, CompleteRegistration, Lead
9cc5e39 — Brian's final prompt integrated, section parser, hardcoded intro, redesigned email
abeb30b — Quiz answers + rawDimensions wired through pipeline + Meta Pixel base
```

**Expert audit ran — system scored 6.2/10, 16 open loops identified, 9 resolved.**

**WORKSTREAM 2 (Ad Launch Prep): IN PROGRESS**

| Task | Status | Notes |
|------|--------|-------|
| Meta Pixel code | ✅ Deployed | ViewContent (landing + quiz start), CompleteRegistration (quiz finish), Lead (email capture). Pixel ID: 1407883507304464 |
| Meta domain verification | ✅ Done | `humbleconviction.com` verified via DNS TXT in GoDaddy (ClaimFame portfolio = HC's Meta account) |
| Meta Events Manager config | ❌ TODO | Need: (a) Allowlist `quiz.humbleconviction.com` in Pixel Settings → Permisos de tráfico, (b) Configure event priorities via Herramienta de configuración de eventos |
| `LAUNCH_STATUS` env var | ❌ TODO | Add `pre_launch` to Vercel env vars |
| Concept 2 ad creatives | ❌ TODO | Create in AdCreative.ai with Gemini image (`Gemini_Generated_Image_sbrow6sbrow6sbro.png` in ~/Downloads, 928×1152px). Feed 4:5 + Story 9:16. Existing projects "Dunning-Kruger Angle" from 18/3 have OLD image. |
| HC color re-template (all 3 concepts) | ❌ TODO | Navy #1A2332 / Coral #E8845A / Cool-white #F8F9FC. Replace AdCreative.ai blue template. |
| Feed versions of C1 + C2 | ❌ TODO | Only Story (9:16) versions exist for C1 and C2 |
| URL updates in ad copy | ❌ TODO | All ads → quiz.humbleconviction.com |
| "coached/reviewed" → "analyzed" | ⚠️ Partial | Done on the site (landing page, post-capture). Still needed in ad copy in AdCreative.ai. |
| Meta Ads Manager instructions for Brian | ❌ TODO | Brian asked Nico to send setup instructions |

## What's Left — Priority Order

### Priority 1: Testing (Monday March 23)
1. Add `LAUNCH_STATUS=pre_launch` env var in Vercel
2. End-to-end test action plan email — all 3 tiers, check Gmail/Apple Mail/Outlook rendering, verify Claude output references quiz answers, screenshot each tier for Brian
3. Follow `QA-PROTOCOL.md` for full QA pass

### Priority 2: Meta Events Manager
4. Allowlist `quiz.humbleconviction.com` in Pixel Settings → Permisos de tráfico → Crear lista de autorizados
5. Configure event priorities: optimize for QuizComplete first (higher volume, exits learning phase faster), shift to Lead after 2-3 weeks. Via Configuración de eventos → Abrir herramienta de configuración de eventos.

### Priority 3: Ad Creatives (can run in parallel with testing)
6. Create new Concept 2 projects in AdCreative.ai with Gemini image — Feed (4:5) + Story (9:16)
7. Create Feed (4:5) versions of Concept 1
8. Re-template ALL concepts in HC colors (navy/coral)
9. Update all ad copy: URLs → quiz.humbleconviction.com, "coached/reviewed" → "analyzed"
10. Export final package for Brian's review

### Priority 4: For Brian
11. Write Meta Ads Manager setup instructions (what Brian needs to configure in FB Business Manager)

### Blocked on Brian
- B5: Final approve all 3 ad concepts (after HC colors applied)
- B7: Autoresponder email copy for Kit drip (Emails 2-5) — **OUT OF SCOPE for launch per Brian**
- B8: Brian's own end-to-end test of action plan email
- B9: End-to-end expert audit (after everything finalized)

## Known Bugs / Issues
- **Python-generated mockups in hc-ads-mockups/ are NOT final** — they're fallback files (`concept2-room-FEED-4x5.jpg`, `concept2-room-STORY-9x16.jpg`). Final ads must be created in AdCreative.ai.
- **Headshot in action plan email:** Scaffolded without it per Brian's instruction. Placeholder or omitted. Will add after full pipeline audit.
- **Unsubscribe link:** Currently `mailto:results@humbleconviction.com?subject=Unsubscribe` — not a proper unsubscribe mechanism. Fine for launch volume.

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`
- **Scenario-based questions:** Not self-assessment. SJT format (less prone to Dunning-Kruger faking).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 → display 2-5/5. Self-Awareness floors at 3.
- **Tier thresholds:** ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts
- **Email gate: partial reveal (trust-first).** Scorecard on web, action plan behind email. Monitor: below 20% capture → tighten gate.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile.
- **Design system:** Navy (#1A2332) + coral (#E8845A) on cool-white (#F8F9FC). Inter font.
- **Post-capture authority framing:** Brian = "the investor behind the assessment"
- **Ad strategy:** 3 concepts (C3 killed). C2 (Dunning-Kruger) strongest for cold. C4 (authority) for retargeting.
- **Meta Pixel strategy:** Phase 1 optimize for QuizComplete (higher volume), Phase 2 shift to Lead after 2-3 weeks.
- **Action plan email design:** Looks like a personal email, not marketing blast. White bg, 600px max, no banners/buttons/social icons.

## Environment & Config
- **Production URL:** https://quiz.humbleconviction.com (also https://hc-funnel.vercel.app)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads`
- **Kit tag:** `quiz-lead` (ID 17618088)
- **Kit account:** brhnyc1970@gmail.com. Auto-confirm ON.
- **Sending email:** results@humbleconviction.com (Resend + Kit verified)
- **AdCreative.ai:** Humble Conviction brand, logged in via admin@humbleconviction.com
- **Meta Business:** ClaimFame portfolio (business_id: 366041656924817). Pixel ID: 1407883507304464
- **Gemini image (Concept 2):** `/Users/nmejia/Downloads/Gemini_Generated_Image_sbrow6sbrow6sbro.png` (928×1152px)
- **Ad mockups guide:** `/Users/nmejia/Developer/B-Suite/hc-ads-mockups/GUIA-ADCREATIVE-PASO-A-PASO.md`

## Ad Creative Copy Reference (Final — March 19 updates)

### Concept 1 — "The Polite Pass"
- Overlay: "What your investor said vs. what they meant."
- Headline: "What Investors See (But Won't Say)" (34 chars)
- CTA: Take the Assessment
- URL: quiz.humbleconviction.com

### Concept 2 — "The Room You Can't Read"
- Overlay: "He thinks the pitch is going well. / The investor tuned out five minutes ago."
- Headline: "Do You Misread Investor Signals?" (32 chars)
- CTA: Take the Assessment
- URL: quiz.humbleconviction.com
- NEW IMAGE: Gemini_Generated_Image_sbrow6sbrow6sbro.png

### Concept 4 — "Built From the Other Side"
- Overlay: "2,500+ founder pitches analyzed."
- Headline: "See What Investors Really See" (28 chars)
- CTA: Take the Assessment
- URL: quiz.humbleconviction.com

### Universal changes applied:
- "coached"/"reviewed" → "analyzed" everywhere
- "2-minute" → "3-minute" everywhere
- All URLs → quiz.humbleconviction.com

## Out of Scope for Launch
- Kit nurture drip (Emails 2-5) — no course to sell yet
- Kit tier-based automations — Kit just captures with quiz-lead tag
- Autoresponder email copy — drafts in research/ for future
- Firebase console access for Nico — nice-to-have, not blocker

## Open Questions / Decisions Pending
- **Feed versions priority:** Create Feed (4:5) for all 3 concepts, or just C2 + C1 initially?
- **Meta campaign structure:** Single campaign with 3 ad sets? Or separate for cold (1+2) vs retargeting (4)?
- **Meta Ads Manager:** Brian still needs Nico's instructions for what to set up in FB Business Manager
