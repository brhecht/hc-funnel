# HANDOFF — HC Funnel
*Last updated: March 24, 2026 ~afternoon ET*

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
│       ├── Landing.jsx      — Hero + social proof + CTA. Mobile-first. Social proof needs "coached" → "analyzed" update.
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation with authority section + videos + waitlist re-ask
├── ads/
│   ├── AD-CREATIVE-BRIEF-V3-FINAL.md  — ⭐ CANONICAL execution doc for ads. Only use this.
│   ├── reference-comps/               — 6 visual reference PNGs (3 concepts × Feed + Story)
│   ├── NANO-BANANA-PROMPTS.md         — Image generation prompts for reference images
│   ├── phase1-references/             — Source Nano Banana images (Polite Pass, Room You Can't Read, Built From the Other Side)
│   └── archive/                       — Deprecated briefs (CREATIVE-BRIEF.md, REVISED-CREATIVE-BRIEF-2026-03-18.md)
├── research/                          — Expert audit memos from March 18–19 sessions
│   ├── quiz-design-audit-march-2026.md
│   ├── quiz-substance-audit-march-2026.md
│   ├── landing-page-audit-march-2026.md
│   ├── results-page-audit-march-2026.md
│   ├── autoresponder-email-audit-march-2026.md
│   ├── ad-system-audit-march-2026.md
│   ├── ad-copy-final-review-march-2026.md
│   ├── action-plan-expert-review-march-2026.md
│   └── waitlist-email-drip-strategy.md
├── ACTION-PLAN-PROMPT.md    — Claude prompt template for personalized action plan email
├── NICO-SPEC-ACTION-PLAN-LAUNCH.md — Comprehensive spec for Nico's action plan pipeline build
├── QA-PROTOCOL.md           — 7 test scenarios for end-to-end QA
├── index.html               — Inter font loaded via Google Fonts
└── package.json
```

## Current Status
**Round 2 creative review complete. Three refinement-level changes sent to Nico. Pipeline and app code are launch-ready.**

**The full pipeline is built and deployed:** Ad → quiz.humbleconviction.com → quiz → email capture → Firestore + Kit + Claude action plan email via Resend.

**Ad creative status:** Nico rebuilt all 6 creatives in Canva from the V3 FINAL brief (March 23). Brian reviewed the Round 2 builds on March 24 and identified 3 refinement issues: C1 line 2 styling (em-dash too heavy, weight/size/color wrong), C2 overlay line 2 kerning compression (42 chars too long for bold weight), and C4 CTA redundancy (overlay and CTA said the same thing). All three fixes are documented in the updated V3 brief and in a detailed email to Nico.

**Emails to Nico (March 24):** Two Gmail drafts created:
1. **Tracking/infrastructure checklist** — LAUNCH_STATUS env var, GA4 measurement ID (not set yet), Meta Pixel domain verification, Pixel test confirmation
2. **Creative changes (Round 2)** — C1 line 2 restyle, C2 overlay line 2 replacement, C4 CTA change, with detailed kerning/typography specs

## Recent Changes (March 24, 2026 — Round 2 Creative Review)

### Round 2 Overlay/CTA Refinements
Brian reviewed Nico's Canva rebuilds (Round 2). Three changes identified and locked:

| # | Change | Before | After | Why |
|---|--------|--------|-------|-----|
| 1 | C1 line 2 styling | "— Sound familiar?" (same weight/size as line 1, heavy em-dash) | "Sound familiar?" — Inter Regular 400, 32px, muted white #DCDCDC | Line 2 must read as quiet follow-up, not competing headline. Drop em-dash. |
| 2 | C2 overlay line 2 | "The investor tuned out five minutes ago." (42 chars — kerning compressed) | "The investor is already out." (28 chars) | 42 chars at bold weight forced Canva to compress letter-spacing. 28 chars fits clean with normal kerning. Echoes Shark Tank's "I'm out." |
| 3 | C4 CTA | "See What Investors See" (same as overlay) | "How Do You Score?" | Overlay already says "See what investors see." — repeating in CTA is redundant. New CTA creates curiosity + personal challenge. |

### Brief Updated
- `ads/AD-CREATIVE-BRIEF-V3-FINAL.md` updated with all three changes (pushed to GitHub as commit `443b241`)
- C2 kerning note added: "do NOT compress tracking to fit text"
- C4 CTA note added: "C4's CTA is intentionally different from C1/C2"

### Reference Comps Regenerated
- All 6 PNGs in `ads/reference-comps/` regenerated with final locked text
- **Need to push to GitHub** — VM git lock files prevent commit from Cowork. Brian should run `cd ~/Developer/B-Suite/hc-funnel && git add ads/reference-comps/ && git commit -m "Update reference comps with final locked text" && git push` from Terminal.

### Tracking Audit (March 24)
- **Meta Pixel:** Wired and firing 4 events (PageView, ViewContent, CompleteRegistration, Lead). Pixel ID: `1407883507304464`.
- **GA4:** `src/utils/analytics.js` is wired with event helpers, but `VITE_GA_MEASUREMENT_ID` is **not set** in .env or Vercel. GA4 is effectively dead code until the measurement ID is configured. Asked Nico about this in infrastructure email.
- **LP social proof:** Already says "pitches analyzed" in `funnel.js`. Done.

## Previous Changes (March 23, 2026 — Ad Creative Audit Session)

### Ad Creative Brief V3 FINAL Created
- **Root cause identified:** March 19 compliance review changes were written as a research memo but never patched back into the execution brief. Nico built from a stale brief — not his fault.
- **`ads/AD-CREATIVE-BRIEF-V3-FINAL.md` created** — single canonical execution doc. Supersedes all previous briefs.
- Old briefs moved to `ads/archive/` with deprecation headers.

### Key V2 → V3 Changes (Historical)

| Element | V2 Brief | V3 Final |
|---------|----------|----------|
| In-image CTA (all) | "Take the Assessment" | "See What Investors See" |
| Headline on image | Baked in by AdCreative.ai | Removed — Meta field only |
| C2 overlay line 2 | Missing in execution | Both lines restored |
| All headlines | Over 40 chars (truncated on IG) | Shortened to under 40 chars |
| C4 overlay | "2,500 founder pitches reviewed." | "2,500+ founder pitches analyzed." |
| Credibility language | Mixed | "analyzed" everywhere |
| Build tool | AdCreative.ai | Canva |

## Known Bugs / Issues
- **`LAUNCH_STATUS=pre_launch` env var not yet set in Vercel** — controls PS text in action plan email. Asked Nico in infrastructure email.
- **GA4 `VITE_GA_MEASUREMENT_ID` not configured** — analytics.js utility exists but env var is not set in .env or Vercel. GA4 tracking is dead until this is added. Asked Nico in infrastructure email.
- **Meta Pixel domain verification status unknown** — `quiz.humbleconviction.com` subdomain. Asked Nico for status.
- ~~**LP social proof says "pitches coached"**~~ — **DONE.** Already says "pitches analyzed" in `funnel.js`.
- **VM git lock files** — Cowork VM cannot remove `.git/HEAD.lock` on mounted volumes (EPERM). Workaround: commit/push from Mac Terminal.

## Planned Features / Backlog
- Kit nurture drip (Emails 2-5 after action plan) — **OUT OF SCOPE for launch**. No course to sell yet.
- Kit tier-based automations — **cancelled for launch**. Leads go to newsletter manually.
- Autoresponder email copy — **postponed**. Drafts exist in `research/autoresponder-email-audit-march-2026.md`.
- Brian's headshot for email header — placeholder "B" circle is fine for launch.
- Firebase console access for Brian — nice-to-have, not a launch blocker.

## Action Plan Email Pipeline
**Architecture:** Two-tier email system. Resend handles the instant transactional email (personalized results). Kit handles marketing/nurture (out of scope for launch).

```
User completes quiz → enters email → Results.jsx fires:
  1. saveLead() → Firestore (working)
  2. subscribeToKit() → Kit with quiz-lead tag + custom fields (working)
  3. requestActionPlan() → /api/action-plan → Claude Sonnet → Resend email (working)
```

Full prompt template in `ACTION-PLAN-PROMPT.md`. Nico's implementation spec in `NICO-SPEC-ACTION-PLAN-LAUNCH.md`.

## Meta Pixel Strategy
Two-phase approach:
1. **Phase 1:** Optimize for quiz completion (ViewContent/QuizComplete event). Higher volume, exits learning phase faster (~50 events/week needed).
2. **Phase 2 (after 2-3 weeks):** Shift to email capture (Lead event) optimization once stable delivery.

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. SJT research validated (less prone to Dunning-Kruger faking).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** Monte Carlo validated. ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate: partial reveal (trust-first).** Show tier + scorecard, gate action plan behind email. Monitor: below 20% capture → tighten gate.
- **No back button:** Research-backed for scenario-based quiz on mobile.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile. All elements sized for 375px viewport.
- **Design system:** Navy (#1A2332) + coral (#E8845A) on cool-white (#F8F9FC). Inter font throughout.
- **Ad strategy:** 3 concepts (Concept 3 killed). C2 (Dunning-Kruger) predicted strongest for cold. C4 (authority) for retargeting. All ad specs in `ads/AD-CREATIVE-BRIEF-V3-FINAL.md`.
- **Ad creatives built in Canva** — AdCreative.ai's template engine was producing weak typography. Canva gives full control.

## Environment & Config
- **Production URL:** https://quiz.humbleconviction.com (also https://hc-funnel.vercel.app)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads`
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Tag: `quiz-lead` (ID 17618088). Custom fields: tier, friction_area, waitlist, UTMs.
- **Kit account:** Humble Conviction (brhnyc1970@gmail.com). Auto-confirm ON.
- **Sending email:** results@humbleconviction.com (Resend verified, Kit verified)
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16). Channel: @humbleconvictionstartups.

## Next Steps

### NICO — Active Tasks

| # | Task | Details | Status |
|---|------|---------|--------|
| N1 | Round 2 creative refinements (3 changes) | C1 line 2 restyle, C2 line 2 replacement, C4 CTA change. Detailed specs in creative email + V3 brief. | **Waiting on Brian's emails** |
| N2 | Set `LAUNCH_STATUS=pre_launch` env var in Vercel | Controls PS text in action plan email | Asked in infrastructure email |
| N3 | Configure GA4 `VITE_GA_MEASUREMENT_ID` in Vercel | analytics.js is wired but env var not set — GA4 is dead until this is added | Asked in infrastructure email |
| N4 | Meta Pixel domain verification | `quiz.humbleconviction.com` subdomain | Asked for status |
| N5 | Meta Pixel test (Chrome extension) | Confirm all 4 events fire: PageView, ViewContent, CompleteRegistration, Lead | Asked in infrastructure email |
| N6 | End-to-end testing (all 3 tiers) | Screenshots to Brian | After N2 |
| N7 | Meta Ads Manager setup instructions for Brian | What Brian needs to do in FB | Ready to do |
| N8 | Final Meta Ads Manager setup + launch | After Brian approves Round 2 creatives | Blocked on N1 |

### BRIAN — Active Tasks

| # | Task | Details | Status |
|---|------|---------|--------|
| B1 | Push updated reference comps to GitHub | `cd ~/Developer/B-Suite/hc-funnel && git add ads/reference-comps/ && git commit -m "Update reference comps with final locked text" && git push` | **Ready now** |
| B2 | Send both Nico emails (Gmail drafts ready) | 1) Tracking/infrastructure checklist 2) Creative changes with specs | **Ready now** |
| B3 | Review + approve Round 2 creatives | After Nico makes the 3 refinements | Blocked on N1 |
| B4 | Review action plan email screenshots | After Nico deploys + tests all 3 tiers | Blocked on N6 |
| B5 | Follow Nico's Meta Ads Manager setup instructions | After Nico writes them | Blocked on N7 |

## Final Locked Ad Copy (March 24)

```
C1: "We're going to pass." / Sound familiar? / [See What Investors See]
C2: He thinks the pitch is going well. / The investor is already out. / [See What Investors See]
C4: 2,500+ founder pitches analyzed. / See what investors see. / [How Do You Score?]
```

## Open Questions / Decisions Pending
- **Meta campaign structure:** Single campaign with 3 ad sets? Or separate for cold (C1+C2) vs retargeting (C4)?
- **Kit `weakestDimension` custom field:** Add to subscriber data for personalization? (~15 min change)
- **Launch date:** Was March 24, now depends on Nico's Round 2 turnaround (3 refinement changes — should be fast).
