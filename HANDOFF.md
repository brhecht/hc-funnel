# HANDOFF — HC Funnel
*Last updated: March 19, 2026 ~9:30am ET*

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
**Fully rebuilt, audited, and deployed (March 18, 2026). Kickoff meeting March 19 set priorities for launch week.**

Brian audited the full funnel end-to-end on March 18 using the expert skill. Quiz wording trimmed, email capture copy tightened, post-capture authority section added, ad plan revised. On March 19 kickoff, Brian confirmed he is working on two things in parallel: (1) finalizing ad creatives (image swaps, copy tweaks) and (2) writing the results logic for the personalized action plan email. Nico handles all technical infrastructure.

**Key March 19 kickoff decisions:**
- Brian will share GoDaddy login for DNS pointing
- Quiz answers were ~20% too long — Brian rewrote half of them to be shorter/scannable (already deployed March 18)
- Email capture language tightened: "get your personalized action plan" framing (already deployed March 18)
- Waitlist checkbox reworded with bridge sentence explaining the course (already deployed March 18)
- Thank you page now has Brian's authority section + 2 embedded YouTube videos (already deployed March 18)
- Autoresponder email not built yet — this is the next big piece (Resend + Claude API pipeline)
- Brian confirmed using a transactional email platform separate from Kit (Resend) for the one-time results email
- Ad launch target: next week (week of March 23)
- V1 expectations: may get zero emails. Goal is DATA — see where funnel drops off and iterate. "Pancake Principle" — first attempts are data collection, not conversion optimization.

**The ad → landing page → quiz → email capture pipeline is the system being tested.** This is NOT pancake territory — this needs to work before spending ad budget. Everything after email capture (autoresponder quality, drip, course sales) IS pancake territory.

## Recent Changes (March 19, 2026 — Kickoff Meeting)
- Kickoff sync between Brian and Nico. Confirmed all March 18 code changes are live and deployed.
- Brian confirmed he's killing one of the 4 ad concepts (Concept 3 — The Shift), changing images in another (Concept 2)
- Content calendar: LinkedIn post today (90-sec clip from YouTube video), YouTube Short tomorrow
- Brian will send time codes for the LinkedIn clip from today's video
- Resend implementation plan researched by Nico's AI assistant (see "Action Plan Email Pipeline" section)
- All action items logged to Nico's Brain Inbox, organized by project (HC Funnel, Content, B-Suite)

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
- **Production URL:** https://hc-funnel.vercel.app (migrating to humbleconviction.com)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag, UTMs
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Tag: `quiz-lead` (ID 17618088). Custom fields: tier, friction_area, waitlist, utm_source, utm_medium, utm_campaign, utm_term, utm_content.
- **Kit account:** Humble Conviction (brhnyc1970@gmail.com). Auto-confirm ON (no double opt-in).
- **Sending email:** results@humbleconviction.com (planned — requires domain verification in both Resend and Kit)
- **AdCreative.ai:** Under Humble Conviction brand. 6 projects. Logged in via admin@humbleconviction.com.
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16). Channel: @HumbleConviction.

## Next Steps — PRIORITIZED for March 19 (from kickoff meeting)

### NICO — PRIORITY ORDER (do these in this order)

**TIER 1 — Unblocks everything (do first):**

| # | Task | Details | Status |
|---|------|---------|--------|
| N1 | DNS setup — point quiz domain | Brian sharing GoDaddy login. Default to `quiz.humbleconviction.com` CNAME → hc-funnel.vercel.app unless Brian says otherwise (Task B3). | Waiting on GoDaddy login |
| N2 | Meta Pixel installation | Install on hc-funnel. Phase 1: optimize for ViewContent/QuizComplete event (need ~50 events/week to exit learning phase). Phase 2 (after 2-3 weeks): shift to Lead event. Do NOT skip Phase 1. | Ready to do |
| N3 | Set up Resend account | Sign up at resend.com (free tier). Generate API key. Verify humbleconviction.com domain (SPF, DKIM DNS records — do alongside N1 since both need GoDaddy). | Waiting on GoDaddy login |

**TIER 2 — Scaffold email pipeline (can start without Brian's content):**

| # | Task | Details | Status |
|---|------|---------|--------|
| N4 | Add Vercel env vars | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (results@humbleconviction.com), `ANTHROPIC_API_KEY` | After N3 |
| N5 | `npm install resend @anthropic-ai/sdk` | Add to hc-funnel package.json | Ready to do |
| N6 | Scaffold `/api/action-plan.js` endpoint | Follow `/api/subscribe.js` pattern. Build the full pipeline: receive quiz data → call Claude → render HTML → send via Resend. Use placeholder prompt — Brian will provide final prompt (Task B7). | Ready to do |
| N7 | Build email template JSX | Personalized scorecard, dimension breakdowns, HC design system. Plain text preferred (42% more clicks per research). | Ready to do |
| N8 | Wire frontend | Add `requestActionPlan()` to firebase.js. Call from Results.jsx `handleEmailCaptured()` alongside existing `saveLead()` + `subscribeToKit()`. Non-blocking. | After N6 |
| N9 | Wire `handleLateWaitlistJoin()` | TODO in Results.jsx line ~200. Currently updates UI only — needs to write to Firestore + Kit. | Ready to do |

**TIER 3 — Ad creatives (partially blocked on Brian):**

| # | Task | Details | Status |
|---|------|---------|--------|
| N10 | Update ad copy: "2-minute" → "3-minute" | All 3 active concepts (1, 2, 4) | Ready to do |
| N11 | Update ad copy: "pitch reviews" → "pitches coached" | Concepts 1, 4 | Ready to do |
| N12 | Update Concept 4 headline: "2 Minutes" → "3 Minutes" | | Ready to do |
| N13 | Update URL in all ad copy to humbleconviction.com | After N1 (DNS) | Blocked on N1 |
| N14 | Create Feed (4:5) version of Concept 1 | Only Story exists | Ready to do |
| N15 | Re-template ads in HC colors (navy #1A2332 / coral #E8845A) | Replace AdCreative.ai blue. Rebuild in Figma/Canva if needed. | Ready to do |
| N16 | Verify humbleconviction.com in Kit | Separate from Resend — both need domain verified independently | After GoDaddy access |
| N17 | Set up tier-based Kit automations | 3 automations: `quiz-lead` tag + `tier` custom field. Templates in `research/autoresponder-email-audit-march-2026.md`. WAIT for Brian's final copy (Task B6). | Blocked on Brian |

**BLOCKED ON BRIAN:**

| # | Task | Blocked by |
|---|------|------------|
| N18 | Apply text overlay to new Concept 2 image | Brian selecting image (B2) |
| N19 | Generate Story + Feed versions of Concept 2 | N18 |
| N20 | Drop final prompt into `/api/action-plan.js` | Brian defining prompt template (B7) |
| N21 | Final Meta Ads Manager setup + campaign launch | Brian's final approval (B5) |
| N22 | Write Meta Ads account instructions for Brian | Figure out what Brian needs to do in his FB account for Nico to run ads. Write clearest possible instructions. Brian hates going into Meta. |

### BRIAN — Creative & Content (from March 18 + March 19 kickoff)

| # | Task | Details | Blocked by |
|---|------|---------|------------|
| B1 | Finalize ad creatives | Kill one ad, swap images on another. Hand off final assets + copy to Nico. | Nothing — working on this now |
| B2 | Generate new Concept 2 image | Prompts in revised creative brief. Nano Banana. | Nothing |
| B3 | Decide domain: subdomain vs path | Tell Nico. Default: `quiz.humbleconviction.com` CNAME. | Nothing |
| B4 | Share GoDaddy login with Nico | For DNS pointing + domain verification (Resend + Kit) | Nothing |
| B5 | Grant Nico Firebase access | Request is in B Things (starred). Nico needs this to finish a build. | Nothing |
| B6 | Write results logic | Query logic: given quiz answers, what do we tell them? Longer, more prescriptive. Work in Eddy promotions contextually. | Nothing — working on this now |
| B7 | Write autoresponder email copy | 3 tier-specific templates. Drafts in `research/autoresponder-email-audit-march-2026.md`. | Nothing |
| B8 | Define action plan prompt template | What should Claude generate per user? Structure, tone, content depth. Nico drops it into the endpoint. | Nothing (not urgent — ship autoresponder first) |
| B9 | Send LinkedIn clip time codes | Watch today's video, send Nico the moments for ~90-sec clip. | Nothing |
| B10 | Write LinkedIn post today | May share Expert Skill / red team workflow. | Nothing |
| B11 | End-to-end expert audit | Full journey as a system once everything is finalized. | B1, B6, B7 |

### CONTENT — Today (March 19)

| Task | Owner | Status |
|------|-------|--------|
| LinkedIn post today: ~90-sec clip from latest video | Nico cuts clip, Brian writes post | Waiting for Brian's time codes |
| YouTube Short for tomorrow | Nico | Deliver to YouTube Studio by noon |
| Additional Short clips from Brian's 5-min video | Nico | Ready — can grab 3+ clips |
| Update content calendar | Nico | In progress |

## Open Questions / Decisions Pending
- **Domain:** subdomain (`quiz.humbleconviction.com`) vs path-based (`humbleconviction.com/assessment`). Brian's call (Task B3).
- **Feed versions:** Should Nico create Feed (4:5) for Concept 2 as well, or Story-only initially?
- **Meta campaign structure:** Single campaign with 3 ad sets? Separate campaigns for cold (Concepts 1+2) and retargeting (Concept 4)?
- **Kit `weakestDimension` custom field:** Should this be added to the quiz's Kit subscriber data for autoresponder personalization? (~15 min frontend change)
- **Concept 1 image:** Usable as-is but not perfect. Worth regenerating? Low priority — only if time permits after Concept 2 is done.
- **Meta Ads account connection:** Nico needs to figure out what Brian needs to do in his Facebook account so ads can run properly. Remote desktop idea was tabled — Nico will write instructions instead.
- **Anthropic API key:** Does Brian already have one? Need to confirm before building the action-plan endpoint.
