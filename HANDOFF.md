# HANDOFF — HC Funnel
*Last updated: March 18, 2026 ~9:30pm ET*

## Project Overview
Quiz-based lead magnet funnel for Humble Conviction's upcoming pitching/fundraising course. 8 scenario-based questions score founders across 4 dimensions, deliver a tier result with scorecard, and gate a personalized action plan behind email capture. Config-driven architecture — all content lives in `src/config/funnel.js`. Part of B-Suite, positioned as a sub-tool under B Marketing.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared `eddy-tracker-82486` project)
- **Email (marketing):** Kit (ConvertKit) V3 API via server-side Vercel proxy (`/api/subscribe`)
- **Email (transactional — planned):** Resend (not yet set up — see Action Plan Pipeline below)
- **AI (planned):** Anthropic Claude API for personalized action plan generation
- **Hosting:** Vercel at hc-funnel.vercel.app (auto-deploy from git push). Migrating to humbleconviction.com.
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
│   │   ├── Layout.jsx       — Branded shell (header, footer, cool-white bg, Inter font). AppSwitcher REMOVED.
│   │   └── AppSwitcher.jsx  — Still in codebase but no longer imported/rendered
│   ├── config/
│   │   └── funnel.js        — ALL content: questions, scoring, results copy, email gate copy, design tokens
│   ├── context/
│   │   └── FunnelContext.jsx — Quiz state, scoring engine (raw → display → tier), UTM capture
│   └── pages/
│       ├── Landing.jsx      — Hero + social proof + CTA. Tightened for mobile. No AppSwitcher.
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation with authority section + videos + waitlist re-ask. Preview mode: ?preview=captured or ?preview=waitlist
├── ads/
│   ├── CREATIVE-BRIEF.md         — Original creative brief (March 16). Superseded by revised brief.
│   ├── REVISED-CREATIVE-BRIEF-2026-03-18.md — CURRENT execution doc for ads. Read this first.
│   ├── NANO-BANANA-PROMPTS.md    — Image generation prompts for reference images
│   └── phase1-references/        — 4 locked Nano Banana reference images + 1 alt
├── research/                     — Expert audit memos from March 18 session
│   ├── quiz-design-audit-march-2026.md      — Quiz structure (length, format, gate, UX)
│   ├── quiz-substance-audit-march-2026.md   — Quiz content, Pixel strategy, cognitive load
│   ├── landing-page-audit-march-2026.md     — Landing page element-by-element audit
│   ├── results-page-audit-march-2026.md     — Results/email capture page audit
│   ├── autoresponder-email-audit-march-2026.md — Tier-specific email template strategy + drafts
│   ├── ad-system-audit-march-2026.md        — Ad creative + LP system evaluation
│   └── waitlist-email-drip-strategy.md      — Pre-product email sequence (March 16)
├── HC-PHASE1-DISCOVERY.md   — Strategy/content bible (819 lines, all decisions + copy)
├── index.html               — Inter font loaded via Google Fonts
└── package.json
```

## Current Status
**Fully rebuilt, audited, and deployed (March 18, 2026).** Major session tonight:
- Full expert audit of quiz structure, quiz content, landing page, results page, email capture, and ad creatives
- Multiple code changes deployed to production
- Ad creative plan revised — 3 concepts (Concept 3 killed), image regeneration needed for Concept 2
- Action plan email pipeline specced (Resend + Claude API) but not yet built
- Autoresponder email templates drafted (tier-specific) but not yet in Kit

**The ad → landing page → quiz → email capture pipeline is the system being tested.** This is NOT pancake territory — this needs to work before spending ad budget. Everything after email capture (autoresponder quality, drip, course sales) IS pancake territory.

## Recent Changes (March 18, 2026 — Evening Session)

### Landing Page
- **Removed AppSwitcher** from Layout.jsx — no more B-Suite nav bar for cold traffic. Every link was an exit. Research: removing nav increases conversion 16-28%.
- **Added social proof line** below CTA: "Based on 2,500+ pitches coached by a 4x exited founder and venture investor" (was `null`, now renders)
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
- **All ad copy needs:** "2-minute" → "3-minute", "pitch reviews" → "pitches coached", URL → humbleconviction.com
- **Visual continuity spec:** Ads need HC color palette (navy/coral) instead of AdCreative.ai's blue template.
- **Full revised brief:** `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` — has everything including task lists for Brian and Nico.

### Action Plan Email Pipeline (Specced, Not Built)
Architecture defined: Vercel serverless endpoint → Claude API (Sonnet) → Resend transactional email. Spec emailed to Nico. See "Action Plan Pipeline" section below for full details.

### Autoresponder Emails (Drafted, Not in Kit)
3 tier-specific email templates written in `research/autoresponder-email-audit-march-2026.md`. These are placeholder templates until the AI pipeline is built. Plain text format (not HTML — research shows 42% more clicks for plain text with cold traffic). Need to be set up in Kit with tag-based automation.

## Known Bugs / Issues
- **`handleLateWaitlistJoin()` in Results.jsx has a TODO** — updates UI state but doesn't write to Firestore or Kit yet. Nico needs to wire this when building the action plan pipeline.
- **AppSwitcher.jsx still in codebase** — not imported anywhere but the file remains. Can be deleted for cleanup.
- **Legacy handoff files** — `HANDOFF-HCFunnel-2026-03-03.md` and `HANDOFF-HCFunnel-2026-03-12.md` still exist. Can be deleted (git history preserves them).

## Action Plan Email Pipeline (Nico's Build)

**Architecture:** User submits email → Results.jsx calls `/api/action-plan` → endpoint builds prompt from user's scores/tier → calls Claude API (Sonnet) → converts response to HTML → sends via Resend → returns 200. Non-blocking.

**Nico's setup tasks:**
1. Resend account + humbleconviction.com domain verification (SPF, DKIM in GoDaddy) — 30 min
2. Anthropic API key (Brian may already have one) — 5 min
3. Vercel env vars: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (results@humbleconviction.com) — 5 min
4. Build `api/action-plan.js` endpoint — 1-2 hours
5. Frontend wiring: `requestActionPlan()` in firebase.js, call from Results.jsx — 15 min
6. HTML email template matching HC design system — 1 hour
7. Testing — 1 hour
**Total estimate: ~4-5 hours**

**Also for Kit:** Verify humbleconviction.com as a sending domain in Kit (separate from Resend — both need the same domain verified but independently).

**Prompt template:** Brian will define what Claude should generate per user. This is a separate task — content/tone/structure decisions. Nico just needs to drop the final prompt into the endpoint.

**Full spec emailed to Nico** (March 18, subject: "HC Funnel: Action Plan Email Pipeline — Technical Spec & Your To-Dos").

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
- **Production URL:** https://hc-funnel.vercel.app (migrating to humbleconviction.com)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag, UTMs
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Tag: `quiz-lead` (ID 17618088). Custom fields: tier, friction_area, waitlist, utm_source, utm_medium, utm_campaign, utm_term, utm_content.
- **Kit account:** Humble Conviction (brhnyc1970@gmail.com). Auto-confirm ON (no double opt-in).
- **Sending email:** results@humbleconviction.com (planned — requires domain verification in both Resend and Kit)
- **AdCreative.ai:** Under Humble Conviction brand. 6 projects. Logged in via admin@humbleconviction.com.
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16). Channel: @HumbleConviction.

## Next Steps — Action Items by Owner

### BRIAN — Creative & Content (Do These In Order)

| # | Task | Details | Blocked by |
|---|------|---------|------------|
| B1 | Generate new images for Concept 2 | Use prompts in `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md`. Try Prompt 2A (over-the-shoulder) first. Run 3-5 variations in Nano Banana. Select best — criteria: no AI face artifacts, body language sells disconnect, reads at phone-screen size. | Nothing |
| B2 | Review selected image with Claude | Upload to Cowork session for evaluation. Claude has full context from the ad system audit. | B1 |
| B3 | Decide domain: subdomain vs path | `quiz.humbleconviction.com` (CNAME, simple) vs `humbleconviction.com/assessment` (requires consolidation). Tell Nico. | Nothing |
| B4 | Tell Nico to proceed with his NOW tasks | He can start on copy updates, domain wiring, color palette, and Feed version of Concept 1 without waiting for you. | Nothing |
| B5 | Final review all 3 ad concepts as a package | Once Nico has applied copy updates + HC color palette + new Concept 2 image, review the complete set. Check: visual continuity with LP, message match, identity signaling. | B1, B2, N1-N7 |
| B6 | Write autoresponder email copy | 3 tier-specific templates. Drafts in `research/autoresponder-email-audit-march-2026.md`. Review, refine, finalize. Consider passing `weakestDimension` as a Kit custom field for Template 2/3 personalization. | Nothing |
| B7 | Define action plan prompt template | What should Claude generate per user? Structure, tone, content depth, length. This is the business content spec — Nico drops it into the endpoint. | Nothing (but not urgent — can ship autoresponder first) |
| B8 | End-to-end expert audit | Once ads + LP + quiz + results + email are all finalized, run one more expert pass on the full journey as a system. This catches discontinuities between components. | B5, B6 |

### NICO — Technical & Production

**Can do NOW (not blocked on Brian):**

| # | Task | Details |
|---|------|---------|
| N1 | Update ad copy: "2-minute" → "3-minute" | All 3 active concepts (1, 2, 4) |
| N2 | Update ad copy: "real pitch reviews" → "pitches coached" | Concepts 1, 4 |
| N3 | Update Concept 4 headline: "2 Minutes" → "3 Minutes" | |
| N4 | Wire humbleconviction.com to hc-funnel Vercel project | Brian will tell you subdomain vs path (Task B3). If no word yet, default to `quiz.humbleconviction.com` CNAME. |
| N5 | Update URL in all ad copy | After N4 |
| N6 | Create Feed (4:5) version of Concept 1 | Only Story exists |
| N7 | Re-template ads in HC colors (navy #1A2332 / coral #E8845A) | Replace AdCreative.ai blue with HC palette. Full spec in revised creative brief. Rebuild in Figma/Canva if AdCreative.ai doesn't allow. |
| N8 | Set up Resend account + verify humbleconviction.com | Free tier. Add SPF/DKIM DNS records in GoDaddy. |
| N9 | Verify humbleconviction.com in Kit | Separate from Resend — both need the domain verified independently. |
| N10 | Set up tier-based Kit automations | 3 automations triggered by `quiz-lead` tag + `tier` custom field. Templates in `research/autoresponder-email-audit-march-2026.md`. WAIT for Brian to finalize copy (Task B6). |

**Blocked on Brian:**

| # | Task | Blocked by |
|---|------|------------|
| N11 | Apply text overlay to new Concept 2 image | Brian selecting image (B2) |
| N12 | Generate Story + Feed versions of Concept 2 | N11 |
| N13 | Build `api/action-plan.js` endpoint | Brian defining prompt template (B7). Can scaffold the endpoint now, drop prompt in later. |
| N14 | Final Meta Ads Manager setup | Brian's final approval (B5) |

## Open Questions / Decisions Pending
- **Domain:** subdomain (`quiz.humbleconviction.com`) vs path-based (`humbleconviction.com/assessment`). Brian's call.
- **Feed versions:** Should Nico create Feed (4:5) for Concept 2 as well, or Story-only initially?
- **Meta campaign structure:** Single campaign with 3 ad sets? Separate campaigns for cold (Concepts 1+2) and retargeting (Concept 4)?
- **Kit `weakestDimension` custom field:** Should this be added to the quiz's Kit subscriber data for autoresponder personalization? (~15 min frontend change)
- **Concept 1 image:** Usable as-is but not perfect. Worth regenerating? Low priority — only if time permits after Concept 2 is done.
