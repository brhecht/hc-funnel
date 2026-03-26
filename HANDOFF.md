# HANDOFF — HC Funnel
*Last updated: March 26, 2026 ~morning ET*

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
│       ├── Landing.jsx      — Hero + social proof + CTA. Mobile-first.
│       ├── Quiz.jsx         — 8 scenario cards, A/B/C/D badges, progress bar, no back button
│       └── Results.jsx      — Calculating pause → tier → scorecard → email gate → post-capture confirmation with authority section + videos + waitlist re-ask
├── ads/
│   ├── AD-CREATIVE-BRIEF-V3-FINAL.md  — ⭐ CANONICAL execution doc for ads. Updated March 25 with final locked primary text.
│   ├── META-LAUNCH-PLAN.md            — $150/day budget, 14-day pulse check protocol, pre-launch checklist
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
**Primary text locked and ready for launch. All ad creative is final. Waiting on Nico to swap primary text in Meta Ads Manager, then Brian adds credit card and hits go.**

**The full pipeline is built and deployed:** Ad → quiz.humbleconviction.com → quiz → email capture → Firestore + Kit + Claude action plan email via Resend.

**Ad creative status:** All 3 concepts × 2 formats built in Canva. Round 2 overlay/CTA refinements made (March 24). Primary text completely rewritten March 25-26 in a line-by-line editorial session with Brian. Email sent to Nico with exact copy-paste replacement text.

## Recent Changes (March 25-26, 2026 — Primary Text Editorial Rewrite)

### What Happened
Brian did the first full creative review of all ads as finished pieces (image + overlay + primary text together). Found multiple copy issues that every prior review round missed — expert audits, compliance checks, and strategic reviews all had different lenses but nobody did a basic editorial read as the target reader.

### Root Cause
Copy was written once early, then every subsequent review had a specialized lens (compliance checked character counts, expert audit checked strategy, overlay reviews checked typography). No review round ever did a cold read as a founder scanning their Instagram feed.

### Process Used
1. Brian flagged specific issues (false claims, missing self-selection, passive voice, jargon, vague authority)
2. Attempted persona-based AI rewrite — failed (walls of text, too long for Meta, structural problems)
3. Pivoted to surgical line-by-line editing on original copy (right structure/length already)
4. Brian and Claude collaborated ad-by-ad, line-by-line until all three were locked
5. Full continuity check across all 3 concepts + LP + overlays

### Final Locked Primary Text

**C1 — The Polite Pass:**
```
"We're going to pass on your startup, but please keep us updated."

You've probably gotten this email from an investor.

Investors listen for just a few things in your pitch, and if you miss them, they say no. But they'll never tell you why.

This free 3-minute assessment shows you what investors actually see when you pitch. 4 scores across the dimensions that matter. Built from analyzing 2,500+ real pitches.
```

**C2 — The Room You Can't Read:**
```
You're in a pitch meeting. The investor nods, asks questions, and says "let me talk to my partners."

You're thinking: great sign. Don't be so sure.

It could mean they're interested. Or that they're being polite before they pass. It's almost impossible to tell. And by the time you find out, it's too late.

This free 3-minute assessment scores you on the 4 dimensions investors actually evaluate — including the ones they'll never reveal.
```

**C4 — Built From the Other Side:**
```
Some startups get funded, but most don't. We analyzed 2,500+ pitches and figured out what works...and what doesn't.

The best founders don't just need killer ideas. They need to understand how investors think. And it's not obvious.

So we built this 3-minute assessment to identify your blind spots and help you get funded.
```

### Key Copy Changes From Previous Version
| Concept | What Changed | Why |
|---------|-------------|-----|
| C1 | Added "startup" to opening quote | Self-selection — tells the reader this is for them |
| C1 | Added "probably" to "You've probably gotten" | Softer, not presumptuous |
| C1 | Rewrote middle paragraph entirely | Old version had false claims, too many words |
| C2 | Replaced "This is really interesting" scenario | Old version made a false claim about what "interesting" means |
| C2 | New scenario: "let me talk to my partners" | More universal founder experience, better emotional hook |
| C4 | Flipped to active voice ("We analyzed...") | Was passive ("After 2,500+ pitches analyzed...") |
| C4 | New opener: "Some startups get funded, but most don't" | Avoids repeating overlay stat; leads with tension |
| C4 | Removed jargon ("creating pull") and vague authority ("built by someone") | Brian's editorial flags |
| All | Removed C4 retargeting designation | At $150/day budget, retargeting pool too small. All 3 run as cold. |

### Brief Updated
- `ads/AD-CREATIVE-BRIEF-V3-FINAL.md` updated with all final primary text (pushed as commit `968ad66`)

### Emails to Nico
- **Primary Text Copy Changes email** — Gmail draft created, sent by Brian. Contains exact copy-paste text for all 3 concepts with clear before/after context.
- **Three earlier emails from March 24** (tracking/infrastructure, creative changes, what to expect after launch) — status unknown, Brian was supposed to send these.

## Previous Changes (March 24, 2026)
Round 2 overlay/CTA refinements, reference comps regenerated, META-LAUNCH-PLAN.md created, tracking audit completed. See git history for details.

## Known Bugs / Issues
- **`LAUNCH_STATUS=pre_launch` env var not yet set in Vercel** — controls PS text in action plan email. Asked Nico in infrastructure email.
- **GA4 `VITE_GA_MEASUREMENT_ID` not configured** — analytics.js utility exists but env var is not set in .env or Vercel. GA4 tracking is dead until this is added. Asked Nico in infrastructure email.
- **Meta Pixel domain verification status unknown** — `quiz.humbleconviction.com` subdomain. Asked Nico for status.
- **VM git lock files** — Cowork VM cannot remove `.git/HEAD.lock` on mounted volumes (EPERM). Workaround: clone to /tmp, commit/push from there.

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

## Meta Ads Launch Plan
Full launch plan with budget, timeline, decision framework, and pre-launch checklist in **`ads/META-LAUNCH-PLAN.md`**. Key points: $150/day across 3 creatives, 7-day learning phase lockdown, day 14 pulse check (go/no-go on product based on email capture signal).

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. SJT research validated (less prone to Dunning-Kruger faking).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** Monte Carlo validated. ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate: partial reveal (trust-first).** Show tier + scorecard, gate action plan behind email. Monitor: below 20% capture → tighten gate.
- **No back button:** Research-backed for scenario-based quiz on mobile.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile. All elements sized for 375px viewport.
- **Design system:** Navy (#1A2332) + coral (#E8845A) on cool-white (#F8F9FC). Inter font throughout.
- **Ad strategy:** 3 concepts running simultaneously with identical targeting/budget. C1 (pain/rejection), C2 (Dunning-Kruger/signal misread), C4 (data authority). All cold — no retargeting at this budget level.
- **Ad creatives built in Canva** — AdCreative.ai's template engine was producing weak typography. Canva gives full control.
- **Copy editing lesson:** AI review rounds need a dedicated editorial pass reading as the target audience. Specialized lenses (compliance, strategy, typography) miss basic copy quality issues.

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
| N1 | Swap primary text in Meta Ads Manager | Copy-paste from the "Primary Text Copy Changes" email. All 3 concepts. 5-minute job. | **Ready — email sent** |
| N2 | Set `LAUNCH_STATUS=pre_launch` env var in Vercel | Controls PS text in action plan email | Asked in infrastructure email |
| N3 | Configure GA4 `VITE_GA_MEASUREMENT_ID` in Vercel | analytics.js is wired but env var not set — GA4 is dead until this is added | Asked in infrastructure email |
| N4 | Meta Pixel domain verification | `quiz.humbleconviction.com` subdomain | Asked for status |
| N5 | Meta Pixel test (Chrome extension) | Confirm all 4 events fire: PageView, ViewContent, CompleteRegistration, Lead | Asked in infrastructure email |
| N6 | End-to-end testing (all 3 tiers) | Screenshots to Brian | After N2 |
| N7 | Meta Ads Manager final setup + launch | After Brian confirms everything is ready | Blocked on N1-N5 |

### BRIAN — Active Tasks

| # | Task | Details | Status |
|---|------|---------|--------|
| B1 | Send 3 earlier Nico emails if not already sent | 1) Tracking/infrastructure 2) Creative changes (Round 2) 3) What to expect after launch | **Check Gmail drafts** |
| B2 | Sync local repo | `cd ~/Developer/B-Suite/hc-funnel && rm -f .git/index.lock .git/HEAD.lock && git fetch origin && git reset --hard origin/main` | **Ready now** |
| B3 | Add credit card to Meta Ads Manager | Before launch | Ready when Nico confirms setup |
| B4 | Launch ads | Hit go after all pre-launch items confirmed | Blocked on Nico tasks |

## Final Locked Ad Copy (March 26 — Overlays)

```
C1: "We're going to pass." / Sound familiar? / [See What Investors See]
C2: He thinks the pitch is going well. / The investor is already out. / [See What Investors See]
C4: 2,500+ founder pitches analyzed. / See what investors see. / [How Do You Score?]
```

## Open Questions / Decisions Pending
- **Meta campaign structure:** Single campaign with 3 ad sets? Or 3 separate campaigns? Nico to advise.
- **Kit `weakestDimension` custom field:** Add to subscriber data for personalization? (~15 min change)
- **Status of 3 earlier emails from March 24:** Brian — did you send these? If not, they're still in Gmail drafts.
