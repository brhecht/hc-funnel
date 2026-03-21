# HANDOFF — HC Funnel
*Last updated: March 20, 2026 ~11:50pm ET*

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
│   │   ├── Layout.jsx       — Branded shell (header, footer, cool-white bg, Inter font). AppSwitcher REMOVED.
│   │   (AppSwitcher.jsx deleted — was unused)
│   ├── config/
│   │   └── funnel.js        — ALL content: questions, scoring, results copy, email gate copy, design tokens
│   ├── hooks/
│   │   └── useMetaPixel.js  — Meta Pixel init, SPA PageView tracking, trackPixelEvent() helper
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine (raw → display → tier), UTM capture
│   └── pages/
│       ├── Landing.jsx      — Hero + social proof + CTA. Tightened for mobile. No AppSwitcher.
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation with authority section + videos + waitlist re-ask. Preview mode: ?preview=captured or ?preview=waitlist
├── ads/
│   ├── CREATIVE-BRIEF.md         — Original creative brief (March 16). Superseded by revised brief.
│   ├── REVISED-CREATIVE-BRIEF-2026-03-18.md — CURRENT execution doc for ads. Read this first.
│   ├── FINAL-COPY-SHEET.md       — Copy-paste source for Meta Ads Manager (all 3 concepts, char counts)
│   ├── CLAUDE-CODE-CONTEXT.md    — Consolidated context for Claude Code tasks
│   ├── CLAUDE-CODE-META-PIXEL-PROMPT.md — Deploy instructions (pixel done) + quizAnswers wiring task
│   ├── BRIAN-META-PIXEL-SETUP.md — Pixel status doc for Brian (what's done, what he needs to do)
│   ├── EMAIL-TO-BRIAN-MARCH19-RECAP.md — Draft email recap (copy-paste)
│   ├── NANO-BANANA-PROMPTS.md    — Image generation prompts for reference images
│   └── phase1-references/        — 4 locked Nano Banana reference images + 1 alt
├── research/                     — Expert audit memos from March 18 session
│   ├── quiz-design-audit-march-2026.md      — Quiz structure (length, format, gate, UX)
│   ├── quiz-substance-audit-march-2026.md   — Quiz content, Pixel strategy, cognitive load
│   ├── landing-page-audit-march-2026.md     — Landing page element-by-element audit
│   ├── results-page-audit-march-2026.md     — Results/email capture page audit
│   ├── autoresponder-email-audit-march-2026.md — Tier-specific email template strategy + drafts
│   ├── ad-system-audit-march-2026.md        — Ad creative + LP system evaluation
│   ├── ad-copy-final-review-march-2026.md   — Final copy coherence + Meta compliance check
│   └── waitlist-email-drip-strategy.md      — Pre-product email sequence (March 16)
├── HC-PHASE1-DISCOVERY.md   — Strategy/content bible (819 lines, all decisions + copy)
├── index.html               — Inter font, Meta Pixel base code (ID 1407883507304 hardcoded)
└── package.json
```

## Current Status
**Action plan pipeline built, deployed, and live (March 19, 2026).** Major infrastructure session — all technical blockers for email pipeline resolved.

**What shipped today (March 19 afternoon):**
- Resend account created, humbleconviction.com domain verified (SPF, DKIM, DMARC in GoDaddy)
- Kit sending domain verified (humbleconviction.com)
- `quiz.humbleconviction.com` live — CNAME pointing to Vercel
- `api/action-plan.js` built and deployed — Claude Sonnet generates personalized action plan → HC-branded HTML email → sent via Resend
- Frontend wired: `requestActionPlan()` fires automatically on email capture alongside existing `saveLead()` + `subscribeToKit()`
- `handleLateWaitlistJoin()` bug fixed — now writes to Firestore + Kit (was UI-only)
- Ad copy updated across all briefs: "2-minute"→"3-minute", "pitch reviews"→"pitches analyzed", Concept 4 headline fixed
- AppSwitcher.jsx deleted, legacy handoff files cleaned up
- Vercel env vars configured: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ANTHROPIC_API_KEY`

**The full pipeline is now: Ad → quiz.humbleconviction.com → quiz → email capture → Firestore + Kit + Claude action plan email via Resend.**

**Still pending:** Brian's prompt template for action plan (currently using placeholder), wiring `{quizAnswers}` into action plan endpoint (Claude Code prompt ready), hardcoding [INTRO] in email template (blocked on Brian's copy), autoresponder email copy in Kit (blocked on Brian), Meta Ads Manager campaign setup.

**ALL 6 AD CREATIVES GENERATED (March 20 — Cowork session):**
All 3 concepts × 2 formats = 6 creatives built from scratch in AdCreative.ai with correct HC brand colors, correct images, and correct copy from FINAL-COPY-SHEET.md. All scoring 97-100/100. Brian audit document (HC-Ad-Creative-Batch-v2.docx) regenerated with full copy + clickable project links. Instagram mockup HTML created with real reference images showing how ads will appear on Feed and Story.

**AdCreative.ai Project IDs:**
- C1 Feed: 921587 | C1 Story: 921588
- C2 Feed: 921590 | C2 Story: 921591
- C4 Feed: 921592 | C4 Story: 921593

**Meta Pixel completed (March 19 late evening):**
- Pixel ID `1407883507304` (HC Eddy Pixel) hardcoded in `index.html` base code
- `useMetaPixel.js` hook env var fixed: `VITE_FB_PIXEL_ID` → `VITE_META_PIXEL_ID` (matches Vercel env var)
- `VITE_META_PIXEL_ID=1407883507304` already in Vercel (added by Nico earlier)
- All events already wired: PageView (all routes), ViewContent (quiz start + results), QuizComplete (8 questions done), Lead (email capture)
- **Needs git push + Vercel deploy to go live. Then verify with Meta Pixel Helper.**
- **Brian still needs to add `quiz.humbleconviction.com` domain in Events Manager → Settings → Domains**

**Ad creative decisions finalized (March 19 evening):**
- All ad copy passed final coherence + Meta compliance review (`research/ad-copy-final-review-march-2026.md`)
- All 3 headlines shortened to fit Instagram's 40-char limit (were 47-54 chars, now 28-34)
- Concept 1 primary text truncation fix (was 126 chars, 1 over Instagram's 125-char gate)
- Concept 2: NEW overlay text locked ("The investor tuned out five minutes ago." replaces "The investors already decided."), NEW image selected (founder facing VC in Patagonia vest)
- Concept 4 overlay: "2,500" → "2,500+" for consistency
- Universal change: "coached"/"reviewed" → "analyzed" everywhere (ads, landing page social proof, post-capture authority section — all deployed)
- Revised creative brief (`ads/REVISED-CREATIVE-BRIEF-2026-03-18.md`) is now FINAL with per-concept execution specs and Nico's step-by-step checklist
- ~~Brian still needs to send Nico the Concept 2 image file~~ ✅ Image received (March 19 evening). Real photo — founder pitching to VC in Patagonia vest. Much better than AI-generated version.

Ad launch target: week of March 23. V1 expectations: goal is DATA, not conversions. Pancake Principle applies to everything after email capture.

## Recent Changes (March 20, 2026 — Full Ad Creative Regeneration + Audit Doc + IG Mockups)

### All 6 Ad Creatives Regenerated from Scratch (Cowork — AdCreative.ai)
Previous session's creatives had wrong colors, wrong images, or wrong copy. Redid everything cleanly:

- **C1 "The Polite Pass" Feed (4:5)** — Project 921587. Image: Polite Pass.png (guy in hoodie). Overlay: "We're going to pass." — every investor. Headline: What Investors See (But Won't Say). Score: 100/100.
- **C1 "The Polite Pass" Story (9:16)** — Project 921588. Same image/copy. Score: 100/100.
- **C2 "The Room You Can't Read" Feed (4:5)** — Project 921590. Image: Brian's real photo (c2-new-reference-brian.png). Overlay split: "He thinks the pitch is going well." / "The investor tuned out five minutes ago." Score: 100/100.
- **C2 "The Room You Can't Read" Story (9:16)** — Project 921591. Same. Score: 100/100.
- **C4 "Built From the Other Side" Feed (4:5)** — Project 921592. Image: Built From the Other Side.png (mentor portrait). Overlay split: "2,500+ founder pitches analyzed." / "See What Investors Really See". Score: 100/100.
- **C4 "Built From the Other Side" Story (9:16)** — Project 921593. Same. Score: 99-100/100.

HC brand colors applied to all: Navy #1A2332, Coral #E8845A, Cool white #F8F9FC, Slate #5A6578.

### HC-Ad-Creative-Batch-v2.docx Rebuilt
- Script at `ads/doc-gen/generate-doc.js` fully rewritten with correct project URLs
- Now includes **full primary text** (the "...more" copy) for each concept alongside overlay, headline, CTA
- Output: `/Users/Nmejia/Developer/HC-Ad-Creative-Batch-v2.docx`
- Also uploaded to Google Drive for Brian: https://docs.google.com/document/d/1wJoHkzAlMfEiN0G7oRQBZKY7DBovGyxN/edit

### Instagram Mockup HTML Created
- `hc-instagram-mockups.html` — interactive HTML showing all 3 concepts in Feed and Story format with real reference images embedded (base64)
- Simulates actual Instagram UI (profile pic, "Sponsored" label, engagement icons, "Learn More" CTA bar, primary text with "...more")
- Tabs to switch between C1, C2, C4. Copy reference section below each mockup.
- File at `/Users/Nmejia/Developer/hc-instagram-mockups.html`

### Gmail Drafts Created for Brian
- Draft 1: "Ad Creatives Ready for Audit" — all 6 project links, full copy per concept, brand colors, no scores/piece counts
- Draft 2 (superseded): earlier version with scores, replaced by Draft 1

### Workflow Notes
- AdCreative.ai "Resume Draft?" dialog appears every time → must click "Start New" each time
- Long overlay text (C2: 74 chars, C4: 56 chars) split across headline/punchline fields (40-char limit each)
- VM disk was full (ENOSPC) throughout session — all file operations routed through Desktop Commander MCP to Mac filesystem
- C4 Story had one variation error ("Oops, something went wrong") but 5 other variations loaded fine

## Recent Changes (March 19, 2026 — Late Night Session: Meta Pixel + Ad Creative Finalization)

### Meta Pixel Installation (Cowork — code changes, needs deploy)
- **`index.html`:** Replaced `YOUR_PIXEL_ID_HERE` placeholder with actual Pixel ID `1407883507304` in both `fbq('init')` call and `<noscript>` fallback image
- **`src/hooks/useMetaPixel.js`:** Changed env var from `VITE_FB_PIXEL_ID` to `VITE_META_PIXEL_ID` to match what was added to Vercel
- **All pixel events were already wired in previous sessions:** PageView (App.jsx via usePixelPageView), ViewContent (Quiz.jsx on start, Results.jsx on render), QuizComplete (Quiz.jsx on final answer), Lead (Results.jsx on email capture)
- **Status:** Code complete. Needs `git push` to deploy. Then verify with Meta Pixel Helper Chrome extension.

### AdCreative.ai Templates Finalized (Cowork — browser work)
- **Concept 2 Feed (4:5):** Text overlay corrected from AI-generated copy to FINAL-COPY-SHEET version ("The investor tuned out five minutes ago."), font size 65px, HC colors (navy bg, coral accent)
- **Pain Angle Portrait (1080x1350):** Created from Story via "Convert to Portrait" — inherits correct text overlay + HC colors
- **Pain Angle Post (1080x1080):** HC colors applied (was still AdCreative.ai blue template)
- **All 3 existing templates now match HC design system.** Concept 2 Story + Feed with Brian's new image still pending (need to upload image to AdCreative.ai).

### Files Created This Session
- **`ads/BRIAN-META-PIXEL-SETUP.md`:** Updated with real Pixel info (HC Eddy Pixel, ID 1407883507304), what Nico is doing vs what Brian needs to do
- **`ads/CLAUDE-CODE-META-PIXEL-PROMPT.md`:** Rewritten. Part 1: deploy-only instructions (pixel code is done, just commit + push). Part 2: `{quizAnswers}` wiring task (Brian's Priority 1) with step-by-step implementation across Results.jsx, firebase.js, and api/action-plan.js.
- **`ads/EMAIL-TO-BRIAN-MARCH19-RECAP.md`:** Draft email for Brian with session recap and action plan (saved for copy-paste).

### Brian's Priority Tasks Assessment (from Brian's email, March 19 evening)
Brian sent 5 priorities. Here's the status after this session:

| # | Brian's Task | Status | Notes |
|---|-------------|--------|-------|
| 1 | Wire `{quizAnswers}` into action plan endpoint | **TODO** | Frontend sends answers to Firestore already. Need to: (a) pass full answers + labels to `/api/action-plan`, (b) include in prompt. Medium effort ~1hr. |
| 2 | Swap placeholder prompt for ACTION-PLAN-PROMPT.md | **BLOCKED on Brian** | File doesn't exist yet. Brian needs to write the final prompt. Current placeholder in `api/action-plan.js` lines 83-93 works but isn't tuned. |
| 3 | Hardcode [INTRO] section in HTML email template | **BLOCKED on Brian** | Brian needs to define what the intro paragraph says. Template is in `buildEmailHtml()` in `api/action-plan.js` lines 122-170. Easy to add once copy exists. |
| 4 | Meta Pixel installation | **✅ DONE** | Code complete. Needs deploy. |
| 5 | Ad production | **✅ Mostly done** | Pain Angle all formats done. Concept 4 done. Concept 2 new image templates still needed. |

## Recent Changes (March 19, 2026 — Evening Session: Ad Creative + Repo Cleanup)

Parallel session: Cowork handled browser/creative work in AdCreative.ai while Claude Code handled repo file cleanup.

### AdCreative.ai Template Color Updates (Cowork)
- **Pain Angle Story (9:16):** Background changed from AdCreative.ai blue (#FF3067) → HC navy (#1A2332). Accent/CTA changed → HC coral (#E8845A). Template now matches HC design system.
- **Authority Angle Story (9:16):** Text overlay updated — "reviewed" → "analyzed", added "+" to "2,500". Font size adjusted from 89.2px → ~84px to prevent text wrapping/overlap. Colors aligned to HC palette.
- **Remaining templates needing color updates:** Authority Angle Feed (4:5), Dunning-Kruger Story + Feed (both blocked on Brian's Concept 2 image). Pain Angle Feed (4:5) also needs creation.

### Repo Cleanup (Claude Code — verified)
- **"coached" → "analyzed"** in `ads/CREATIVE-BRIEF.md` (lines 189, 192) — ✅ done
- **"coached" → "analyzed"** in `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` — ✅ done
- **URLs updated:** `hc-funnel.vercel.app` → `quiz.humbleconviction.com` in brief files — ✅ done
- **Stale file deleted:** `ads/REVISED-CREATIVE-BRIEF-2026-03-18-LOCAL.md` (git pull conflict artifact) — ✅ done
- **Results.jsx line 382:** "coached thousands of founders" left as-is — this describes Brian's coaching activity, not the pitch metric. Different semantic context. Brian to confirm if this should also change.

### New Files Created
- **`ads/FINAL-COPY-SHEET.md`** — Complete reference doc with all 3 concepts' locked copy for Meta Ads Manager setup. Includes: text overlays, primary text with char counts (125-char gate), full primary text, headlines with char counts (40-char limit), landing page state, HC design system colors, testing strategy. This is the copy-paste source for Meta Ads Manager.
- **`ads/CLAUDE-CODE-CONTEXT.md`** — Consolidated context file for Claude Code with final locked copy, stale entries table, remaining tasks.

## Recent Changes (March 19, 2026 — Afternoon Session)

### Infrastructure (all deployed to production)
- **Resend verified** — account created (admin@humbleconviction.com), humbleconviction.com domain verified with SPF/DKIM/DMARC records in GoDaddy
- **Kit domain verified** — humbleconviction.com sending domain verified (separate CNAME records)
- **quiz.humbleconviction.com live** — CNAME `quiz` → `cname.vercel-dns.com` in GoDaddy, domain added to Vercel project
- **Action plan endpoint built** (`api/action-plan.js`) — receives email + quiz scores → builds prompt → Claude Sonnet generates personalized action plan → wraps in HC-branded HTML email → sends via Resend
- **Frontend wiring** — `requestActionPlan()` added to firebase.js, called from Results.jsx on email capture. Calculates weakest dimension and passes to endpoint.
- **handleLateWaitlistJoin() fixed** — was a TODO (UI-only). Now writes `waitlist: true` to Firestore via `updateLead()` and re-subscribes to Kit with updated tag.
- **Vercel env vars set** — `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (results@humbleconviction.com), `ANTHROPIC_API_KEY`

### Ad Copy Updates (all brief files updated)
- "2-minute" → "3-minute" in CREATIVE-BRIEF.md, REVISED-CREATIVE-BRIEF.md, NANO-BANANA-PROMPTS.md
- "real pitch reviews" → "pitches analyzed" in Concepts 1, 4
- Concept 4 headline: "2 Minutes" → "3 Minutes"

### Cleanup
- AppSwitcher.jsx deleted (was unused since March 18)
- Legacy handoff files deleted (HANDOFF-HCFunnel-2026-03-03.md, HANDOFF-HCFunnel-2026-03-12.md)

### Morning Kickoff (March 19)
- Kickoff sync between Brian and Nico. Confirmed all March 18 code changes are live.
- Brian confirmed killing Concept 3, changing images on Concept 2
- Content calendar: LinkedIn post today, YouTube Short tomorrow
- Ad launch target: week of March 23

## Recent Changes (March 18, 2026 — Evening Session)

### Landing Page
- **Removed AppSwitcher** from Layout.jsx — no more B-Suite nav bar for cold traffic. Every link was an exit. Research: removing nav increases conversion 16-28%.
- **Added social proof line** below CTA: "Based on 2,500+ pitches analyzed by a 4x exited founder and venture investor" (was `null`, now renders)
- **Changed CTA** from "Get My Results" to "See What Investors See" — echoes headline, benefit-forward, no tense mismatch
- **Shortened subheadline** — pulled credibility claim into standalone social proof. Subheadline is now: "This 3-minute assessment reveals the patterns investors notice — but will never tell you."
- **Tightened mobile spacing** — reduced top padding, tighter gaps, smaller mobile heading font. CTA should now be above the fold on 375px.

### Quiz
- **Trimmed option text** across 10 answer options — ~15-20% reduction in reading load. Gets closer to the "3-minute" claim.
- **Changed "2-minute" to "3-minute"** on the landing page. Research: understating duration by >50% creates a violation effect that increases abandonment.

### Email Gate (Results Page)
- **New headline:** "Get your personalized action plan"
- **New subline:** "We'll send you specific next steps for each dimension — starting with the one holding you back most."
- **New button:** "Get My Action Plan" (was "Send My Recommendations")
- **Waitlist checkbox rewrite:** Added bridge sentence "We're building a course to help founders close these gaps." above checkbox. Label changed to "Get early access when it launches" (was "Also notify me when the course launches" — "the course" was an unexplained jump).
- **Larger checkbox tap target** — w-5 h-5 (20px) up from w-4 h-4 (16px), plus py-1 on the label for mobile.
- **Disclaimer updated** to say "personalized action plan" instead of "recommendations"

### Post-Capture Confirmation (New)
Completely rebuilt. Was a dead-end "Your recommendations are on the way" card. Now:
- **Coral confirmation banner** (matches email gate visual) — checkmark + "Your action plan is on the way."
- **Dark navy authority block** — "THE INVESTOR BEHIND THE ASSESSMENT" (uppercase label in coral) → "Brian Hecht" → credentials line → 2-sentence bio → short YouTube embed (0:52) → divider → "Go deeper" long YouTube embed (8:16) → "More from Brian on YouTube →" link
- **Two variants:** Variant A (waitlist checkers) shows "You're on the early access list." Variant B (non-checkers) shows waitlist re-ask button after the videos — one click, no form.
- **"Retake assessment" link** now hidden after email capture.
- **Preview mode** added: `?preview=captured` and `?preview=waitlist` URL params to view confirmation without completing quiz.

### Ad Creative Plan (Revised)
- **Concept 3 (The Shift) KILLED** for launch. Image can't convey "power flip" in a still frame. 3 strong concepts > 3 strong + 1 weak.
- **Concept 2 (Room You Can't Read) needs new image.** Best copy in the set, but conference room AI image has visible artifacts. Image prompts written in revised brief.
- **Concepts 1 and 4 ship as-is** with minor copy updates.
- **All ad copy needs:** "2-minute" → "3-minute", "pitch reviews" → "pitches analyzed", URL → quiz.humbleconviction.com — ✅ All done
- **Visual continuity spec:** Ads need HC color palette (navy/coral) instead of AdCreative.ai's blue template.
- **Full revised brief:** `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` — has everything including task lists for Brian and Nico.

### Action Plan Email Pipeline (Specced, Not Built)
Architecture defined: Vercel serverless endpoint → Claude API (Sonnet) → Resend transactional email. Spec emailed to Nico. See "Action Plan Pipeline" section below for full details.

### Autoresponder Emails (Drafted, Not in Kit)
3 tier-specific email templates written in `research/autoresponder-email-audit-march-2026.md`. These are placeholder templates until the AI pipeline is built. Plain text format (not HTML — research shows 42% more clicks for plain text with cold traffic). Need to be set up in Kit with tag-based automation.

## Known Bugs / Issues
- **Action plan prompt is placeholder** — endpoint works but uses a generic prompt. Brian needs to define final content/tone/structure (Task B8). Current prompt generates reasonable output but isn't tuned to Brian's voice or Eddy promotions.
- **quizAnswers not passed to action plan endpoint** — currently only sends aggregated scores + tier. Brian wants individual answer choices + labels sent so Claude can give truly personalized feedback. See Brian's Priority 1.
- **No [INTRO] section in email template** — Brian wants a static intro paragraph before the AI-generated action plan. Needs his copy.
- ~~**No Meta Pixel yet**~~ ✅ **Meta Pixel installed** — code done, needs `git push` to deploy.

## Action Plan Email Pipeline (Nico's Build)

**Architecture:** Two-tier email system. Resend handles the instant transactional email (personalized results). Kit handles the nurture drip (Emails 2-5 over 3-4 weeks).

```
User completes quiz → enters email → Results.jsx fires:
  1. saveLead() → Firestore (existing, works)
  2. subscribeToKit() → Kit nurture sequence (existing, works)
  3. NEW: /api/action-plan → Claude API (Sonnet) → Resend → instant personalized email
```

**Why Resend (not Kit) for the results email:**
- Transactional (one-off, personalized) vs. marketing (drip, bulk) — different tools for different jobs
- Resend has sub-second dispatch, native Vercel integration, React JSX email templates
- Kit stays as the nurture/drip platform (Emails 2-5)
- Free tier: 100 emails/day (plenty for launch testing)
- Cost: ~$0.20/email after free tier

**Resend implementation plan (researched March 19):**

Files to create:
- `/api/action-plan.js` — Vercel serverless endpoint. Receives quiz data + email → builds prompt → calls Claude API → converts to HTML → sends via Resend → returns 200. Follow `/api/subscribe.js` pattern.
- `/src/components/emails/ResultsEmailTemplate.jsx` — JSX email template with personalized scorecard, dimension breakdowns, contextual Eddy promotions. Resend compiles JSX → HTML at send time.

Files to modify:
- `/src/pages/Results.jsx` — Add `requestActionPlan()` call in `handleEmailCaptured()`, alongside existing `saveLead()` and `subscribeToKit()`. Non-blocking.
- `/src/firebase.js` — Add `requestActionPlan()` function (simple fetch to `/api/action-plan`)

Env vars needed in Vercel:
- `RESEND_API_KEY` — from resend.com dashboard
- `RESEND_FROM_EMAIL` — `results@humbleconviction.com`
- `ANTHROPIC_API_KEY` — Brian may already have one

**Nico's setup tasks (in order):**
1. Sign up at resend.com (free tier) — 5 min
2. Verify humbleconviction.com domain in Resend (SPF, DKIM DNS records in GoDaddy) — 30 min (needs GoDaddy access from Brian)
3. Get/confirm Anthropic API key — 5 min
4. Add env vars to Vercel project — 5 min
5. `npm install resend @anthropic-ai/sdk` — 1 min
6. Build `/api/action-plan.js` endpoint — 1-2 hours
7. Build email template JSX — 1 hour
8. Wire frontend (`Results.jsx` + `firebase.js`) — 15 min
9. Test end-to-end — 1 hour
**Total estimate: ~4-5 hours**

**Also for Kit:** Verify humbleconviction.com as a sending domain in Kit (separate from Resend — both need the same domain verified independently).

**Prompt template:** Brian will define what Claude should generate per user. Nico can scaffold the endpoint now and drop the final prompt in later. Brian described the logic in the kickoff: "Given what we know from their answers, what do we tell them? Longer and more prescriptive. Work in Eddy promotion contextually — 'you had this problem, here's how to fix it, you can learn more about this in a lesson in Eddy.'"

**Full spec emailed to Nico** (March 18, subject: "HC Funnel: Action Plan Email Pipeline — Technical Spec & Your To-Dos").

**Direct Resend vs. Zapier middleware:** Go direct. Resend from Vercel serverless function. No Zapier needed — adds latency, cost, and complexity for a simple transactional email. Zapier is overkill here.

## Meta Pixel Strategy
Expert research recommends a **two-phase approach:**
1. **Phase 1:** Optimize for quiz completion (ViewContent or custom QuizComplete event). Higher volume, exits learning phase faster (need ~50 events/week). Gives clean completion rate data.
2. **Phase 2 (after 2-3 weeks):** Shift to email capture (Lead event) optimization once stable delivery and enough conversion history.

Do NOT skip Phase 1 — optimizing directly for email capture on a test budget will likely keep Meta stuck in learning phase.

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. Founders choose how they'd respond in real investor situations. Validated by SJT research (less prone to Dunning-Kruger faking than self-report).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 per dimension → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** Validated via Monte Carlo (10K runs). ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate: partial reveal (trust-first).** Show tier + scorecard on web, gate action plan behind email. Decided to launch with this and monitor email capture rate. Below 20% → tighten gate. Above 25% → keep.
- **No back button:** Research-backed for scenario-based quiz on mobile.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile. All elements sized for 375px viewport.
- **Design system:** Navy text (#1A2332) + coral accent (#E8845A) on cool-white (#F8F9FC). Inter font throughout.
- **Server-side Kit proxy** to bypass ad blockers.
- **"Conversation, Not Pitch"** is a core HC principle — threads through methodology, results copy, and email content.
- **Post-capture authority framing:** Brian is introduced as "the investor behind the assessment" — not "the founder." Investor credibility is the authority angle for the entire funnel.
- **Ad strategy:** 3 concepts (Concept 3 killed). Concept 2 (Dunning-Kruger) predicted strongest for cold traffic. Concept 4 (authority) for retargeting. See revised creative brief for full details.

## Environment & Config
- **Production URL:** https://quiz.humbleconviction.com (also https://hc-funnel.vercel.app)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag, UTMs
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Tag: `quiz-lead` (ID 17618088). Custom fields: tier, friction_area, waitlist, utm_source, utm_medium, utm_campaign, utm_term, utm_content.
- **Kit account:** Humble Conviction (brhnyc1970@gmail.com). Auto-confirm ON (no double opt-in).
- **Sending email:** results@humbleconviction.com (Resend verified, Kit verified)
- **AdCreative.ai:** Under Humble Conviction brand. 6 projects. Logged in via admin@humbleconviction.com.
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16). Channel: @HumbleConviction.

## Next Steps — Updated March 19

### NICO — Remaining Tasks

**Done today (✅):**
- ~~DNS setup — quiz.humbleconviction.com~~ ✅
- ~~Resend account + domain verification~~ ✅
- ~~Kit domain verification~~ ✅
- ~~Vercel env vars (Resend, Anthropic)~~ ✅
- ~~Scaffold api/action-plan.js~~ ✅
- ~~Wire frontend (requestActionPlan + handleLateWaitlistJoin)~~ ✅
- ~~Ad copy updates (2-min→3-min, pitch reviews→pitches analyzed)~~ ✅
- ~~Cleanup (AppSwitcher, legacy handoffs)~~ ✅

**Still TODO:**

| # | Task | Details | Status |
|---|------|---------|--------|
| N1 | ~~Meta Pixel installation~~ | ~~Phase 1: ViewContent/QuizComplete event. Phase 2 (2-3 weeks): Lead event.~~ | ✅ Code done — needs deploy |
| N2 | ~~Update URL in all ad copy~~ | ~~Change to quiz.humbleconviction.com~~ | ✅ Done (Claude Code) |
| N3 | Create Feed (4:5) version of Concept 1 | Only Story exists — needs Canva/Figma | Ready to do |
| N4 | Re-template ads in HC colors (navy/coral) | ✅ ALL 6 creatives done (C1 Feed/Story, C2 Feed/Story, C4 Feed/Story). All HC colors applied. | ✅ DONE |
| N5 | Set up tier-based Kit automations | 3 automations by tier. WAIT for Brian's final copy. | Blocked on Brian (B7) |
| N6 | Write Meta Ads account instructions for Brian | What he needs to do in FB for Nico to run ads | Ready to do |

**Blocked on Brian:**

| # | Task | Blocked by |
|---|------|------------|
| N7 | ~~Apply text overlay to new Concept 2 image~~ | ✅ Done March 20. C2 Feed (921590) + C2 Story (921591) generated with Brian's real photo. |
| N8 | ~~Generate Story + Feed versions of Concept 2~~ | ✅ Done March 20. |
| N9 | Drop final prompt into api/action-plan.js | Brian defining prompt (B8) |
| N10 | Final Meta Ads Manager setup + launch | Brian's final approval (B5) |

### BRIAN — Remaining Tasks

| # | Task | Details | Blocked by |
|---|------|---------|------------|
| B1 | ~~Share GoDaddy login~~ | ✅ Done | — |
| B2 | ~~Generate new Concept 2 image~~ | ✅ Done — founder facing VC in Patagonia vest. Needs to be sent to Nico. | — |
| B3 | ~~Decide domain~~ | ✅ Done — quiz.humbleconviction.com | — |
| B4 | Grant Nico Firebase access | Request in B Things (starred) | Nothing |
| B5 | Final approve all 3 ad concepts | Review copy updates + new image + HC colors as a package | B2 |
| B6 | Finalize ad creatives | Kill Concept 3 ✅, Concept 2 image selected ✅, all copy finalized ✅. Image sent to Nico ✅ (March 19 evening). Final package review pending. | Ready for review |
| B7 | Write autoresponder email copy | 3 tier-specific templates. Drafts in research/autoresponder-email-audit-march-2026.md | Nothing |
| B8 | Define action plan prompt template | What should Claude generate per user? Structure, tone, Eddy promotions. Nico drops it in. | Not urgent |
| B9 | End-to-end expert audit | Full journey once everything finalized | B5, B7 |

## Open Questions / Decisions Pending
- **Feed versions:** Create Feed (4:5) for Concept 2 as well, or Story-only initially?
- **Meta campaign structure:** Single campaign with 3 ad sets? Or separate for cold (1+2) vs retargeting (4)?
- **Kit `weakestDimension` custom field:** Add to subscriber data for personalization? (~15 min change)
- **Concept 1 image:** Worth regenerating? Low priority.
- **Meta Ads account:** Nico writing instructions for what Brian needs to do in FB.
