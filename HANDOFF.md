# HANDOFF — HC Funnel
*Last updated: March 23, 2026 ~3:30pm ET*

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
**Ad creatives need a rebuild pass; pipeline and app code are launch-ready.** Launch target slipped from March 24 — ads are the blocker.

**The full pipeline is built and deployed:** Ad → quiz.humbleconviction.com → quiz → email capture → Firestore + Kit + Claude action plan email via Resend.

**Ad creative status:** Nico built V1 creatives from the March 18 revised brief, but that brief was stale — a compliance review on March 19 changed headlines, overlay text, and CTA but the changes were written into a research memo instead of patched back into the brief. Additionally, AdCreative.ai's template engine produced weak typography and cramped layouts. Brian reviewed the V1 batch on March 23, identified the gaps, and a V3 FINAL brief was created with exact specs, corrected copy, and 6 visual reference comps. Nico needs to rebuild all 6 creatives in Canva (not AdCreative.ai) matching the reference comps.

**Email to Nico:** Gmail draft created (March 23) explaining the process error, what changed, and pointing to V3 brief + comps. Brian sending a heads-up Slack DM first.

## Recent Changes (March 23, 2026 — Ad Creative Audit Session)

### Ad Creative Brief V3 FINAL
- **Root cause identified:** March 19 compliance review changes (shortened headlines, C2 overlay update, C1 truncation fix, CTA alignment) were written as a research memo but never patched back into the execution brief. Nico built from a stale brief — not his fault.
- **`ads/AD-CREATIVE-BRIEF-V3-FINAL.md` created** — single canonical execution doc. Supersedes all previous briefs. Includes:
  - Exact typography specs: Inter Semi-Bold/Bold, specific pixel sizes per element, hex colors
  - Corrected overlay text (C2 gets both lines back, C4 gets "+" and "analyzed")
  - In-image CTA changed from "Take the Assessment" → "See What Investors See" (matches LP)
  - Headline removed from image — goes in Meta Ads Manager headline field only
  - All 3 headlines shortened to under 40 chars for Instagram compliance
  - Build tool: Canva (not AdCreative.ai)
  - "Analyzed" as universal credibility language across all ads + LP

### Visual Reference Comps
- **`ads/reference-comps/`** — 6 PNGs created (C1/C2/C4 × Feed/Story) showing exact text positioning, sizing, hierarchy, gradient wash, and CTA button placement. These are the "make it look like this" targets for Nico.
- C2 comps use the old reference image for layout purposes — Nico uses the new image Brian sent (founder facing VC in Patagonia vest).

### Brief Cleanup
- Old briefs (`CREATIVE-BRIEF.md`, `REVISED-CREATIVE-BRIEF-2026-03-18.md`) moved to `ads/archive/` with deprecation headers. Preserves decision history without ambiguity about which doc is current.

### Key Ad Creative Changes (V2 → V3 Summary)

| Element | V2 Brief | V3 Final |
|---------|----------|----------|
| In-image CTA (all) | "Take the Assessment" | "See What Investors See" |
| Headline on image | Baked in by AdCreative.ai | Removed — Meta field only |
| C2 overlay line 2 | Missing in execution | "The investor tuned out five minutes ago." |
| C1 headline | 54 chars (truncates) | "What Investors See (But Won't Say)" (34) |
| C2 headline | 47 chars (truncates) | "Do You Misread Investor Signals?" (32) |
| C4 headline | Stale | "See What Investors Really See" (28) |
| C4 overlay | "2,500 founder pitches reviewed." | "2,500+ founder pitches analyzed." |
| Credibility language | Mixed | "analyzed" everywhere |
| Build tool | AdCreative.ai | Canva |

## Known Bugs / Issues
- **`LAUNCH_STATUS=pre_launch` env var not yet set in Vercel** — controls PS text in action plan email. Nico needs to add this.
- **Meta Pixel domain verification pending** — `humbleconviction.com` added, `quiz.humbleconviction.com` subdomain still needs verification. Nico handling.
- **LP social proof says "pitches coached"** — needs code change in `Landing.jsx` to "pitches analyzed" for consistency with all ad copy. Minor.
- **VM git lock files** — Cowork VM cannot remove `.git/HEAD.lock` on mounted volumes (EPERM). Workaround: clone to `/tmp/` for pushes.

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
| N1 | Rebuild all 6 ad creatives in Canva | Match `ads/reference-comps/` visual targets. Use V3 FINAL brief for exact specs. | **Waiting on Brian's email** |
| N2 | Set `LAUNCH_STATUS=pre_launch` env var in Vercel | Controls PS text in action plan email | Ready to do |
| N3 | Meta Pixel domain verification | `quiz.humbleconviction.com` subdomain | In progress |
| N4 | End-to-end testing (all 3 tiers) | Screenshots to Brian | After N2 |
| N5 | Update LP social proof | "pitches coached" → "pitches analyzed" in `Landing.jsx` | Ready to do |
| N6 | Meta Ads Manager setup instructions for Brian | What Brian needs to do in FB | Ready to do |
| N7 | Final Meta Ads Manager setup + launch | After Brian approves rebuilt creatives | Blocked on N1 |

### BRIAN — Active Tasks

| # | Task | Details | Status |
|---|------|---------|--------|
| B1 | Send Nico heads-up Slack DM | Before the email lands | Ready now |
| B2 | Send Nico the email (Gmail draft ready) | V3 brief context, change summary, repo pointers | Ready now |
| B3 | Review + approve rebuilt ad creatives | After Nico rebuilds in Canva | Blocked on N1 |
| B4 | Review action plan email screenshots | After Nico deploys + tests all 3 tiers | Blocked on N4 |
| B5 | Follow Nico's Meta Ads Manager setup instructions | After Nico writes them | Blocked on N6 |

## Open Questions / Decisions Pending
- **Meta campaign structure:** Single campaign with 3 ad sets? Or separate for cold (C1+C2) vs retargeting (C4)?
- **Kit `weakestDimension` custom field:** Add to subscriber data for personalization? (~15 min change)
- **Launch date:** Was March 24, now depends on Nico's Canva rebuild turnaround.
