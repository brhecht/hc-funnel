# HANDOFF — HC Funnel
*Last updated: March 23, 2026 ~afternoon ET*

## Project Overview
Quiz-based lead magnet funnel for Humble Conviction's upcoming pitching/fundraising course ("Eddy"). 8 scenario-based questions score founders across 4 dimensions, deliver a tier result with scorecard, and gate full recommendations behind email capture. Config-driven architecture — all content lives in `src/config/funnel.js`. Part of B-Suite, positioned as a sub-tool under B Marketing.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared `eddy-tracker-82486` project)
- **Email:** Kit (ConvertKit) V3 API via server-side Vercel proxy (`/api/subscribe`); Resend for action plan delivery
- **AI:** Anthropic Claude Sonnet API for action plan generation + self-eval audit
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
├── api/
│   ├── action-plan.js       — Vercel serverless: generates AI action plan email, audits, sends via Resend
│   └── subscribe.js         — Kit subscription proxy
├── ads/
│   ├── CREATIVE-BRIEF.md    — Nico's execution doc: text overlays, ad copy, psychology framework
│   ├── NANO-BANANA-PROMPTS.md — Image generation prompts for reference images
│   └── phase1-references/   — 4 locked Nano Banana reference images + 1 alt
├── research/
│   └── waitlist-email-drip-strategy.md — Research memo on pre-product email sequence
├── HC-PHASE1-DISCOVERY.md   — Strategy/content bible (819 lines, all decisions + copy)
├── index.html               — Inter font loaded via Google Fonts
└── package.json
```

## Current Status
**Fully rebuilt and deployed.** Complete quiz funnel live at hc-funnel.vercel.app. Action plan email pipeline complete with AI generation, 3-layer self-eval audit, and branded HTML delivery via Resend.

Core flow working end-to-end: Take quiz → see tier + scorecard → enter email → receive personalized AI-generated action plan email.

## Recent Changes (March 23, 2026)

### Action Plan Email — 3-Layer Audit + Prompt Fixes (3 commits)

**Commit `88d25e2` — Initial 6 fixes + audit layer:**
- Added `auditActionPlan()` function — second Claude Sonnet API call that runs 3-layer self-eval before sending:
  - Layer 1 (Recipient Simulation): reads as the founder who took the quiz, checks for fabricated scenarios, unearned definitiveness, decontextualized references
  - Layer 2 (Course Flow Audit): verifies Course Mention Architecture (seed in HOLISTIC → intro in WEAKEST → callback in SECOND → zero in STRENGTH/FOURTH/CLOSING → hardcoded PS). Exactly 2 AI-generated mentions.
  - Layer 3 (Parity Check): every section actionable, contrast closers formatted identically, section markers intact
- Prompt fixes: grounded in quiz answers (no fabricated investor meeting scenarios), "in my experience" hedging, FOURTH section gets real treatment (header + actionable direction, not throwaway), Course Mention Architecture enforced, CLOSING has explicit ban on course/framework/module/coaching/early access
- Formatting: contrast closers changed from muted (14px, gray) to full weight (15px, #1A2332 matching body text) with coral left border

**Commit `1c64bf4` — Post-test tightening:**
- CLOSING section: expanded ban list for course-adjacent language
- Definitiveness: added more hedging examples to prompt
- PS false positive: clarified that [PS] is hardcoded by system, not AI-generated

**Commit `c6be248` — Contrast closer content guardrails:**
- Generation prompt now requires both lines to contrast the SAME situation/scenario
- "Struggle" line must be genuinely counterproductive (test: "would a smart founder say that's good advice?" → if yes, it fails)
- "Funded" line must be the counterintuitive flip of that same scenario
- Includes explicit good/bad examples in the prompt (e.g., "treat every investor interaction as a learning opportunity" = BAD)
- Audit layer (Layer 3) now includes CRITICAL content coherence check for contrast pairs with same pass/fail test

### Other March 23 changes (earlier in session)
- GA4 measurement ID added as Vercel env var
- Brian's headshot replaced with LinkedIn profile photo
- Meta Pixel audit completed

## Known Bugs / Issues
None reported.

## Planned Features / Backlog
- **Design/wording tweaks** — Brian will review live site and provide specific adjustments
- **Email drip sequence** — 5-email nurture sequence strategized (see research memo) but copy not yet written
- **Kit automation** — wire email content to Kit autoresponder sequences
- **Meta ad campaign launch** — depends on Nico building final ads in AdCreative.ai + email content ready
- **Reply-to routing** — action plan emails currently reply to results@humbleconviction.com. Task sent to Nico's Brain Inbox to set up that email/forwarding.
- **LAUNCH_STATUS env var** — `api/action-plan.js` reads `LAUNCH_STATUS` from Vercel env vars. Currently defaults to `pre_launch`. When course launches, set to `post_launch` in Vercel dashboard to switch PS copy from "reply interested" to course link. No code change needed.
- **Test file cleanup** — test harness files in repo root (test-action-plan.cjs, test-output.txt, test-email-preview.html, test-action-plan-report.md) should be removed or gitignored

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. Founders choose how they'd respond in real investor situations. Reveals blind spots without requiring self-awareness (Dunning-Kruger is core ICP trait).
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 per dimension → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** Validated via Monte Carlo (see `HC-PHASE1-DISCOVERY.md` Appendix F). Target distribution: ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate (Option C):** Show tier + scorecard on web, gate full results and recommendations behind email. Diagnosis on-page, prescription in email.
- **Action plan email architecture:** Generate (Claude Sonnet) → Audit (Claude Sonnet, 3-layer) → Format HTML → Send (Resend). Two API calls per email. Audit has graceful fallback — if it fails, original draft sends. All in one serverless function (`api/action-plan.js`).
- **Course Mention Architecture:** Seed in HOLISTIC (hint framework exists) → First intro in WEAKEST (name specific module) → Callback in SECOND ("the course also covers...") → Zero in STRENGTH/FOURTH/CLOSING → Hardcoded PS. Exactly 2 AI-generated mentions.
- **Contrast closer rhetorical rules:** Both lines must contrast the same situation. "Struggle" must be genuinely counterproductive. "Funded" is the counterintuitive flip. Audit layer enforces.
- **No back button:** Research-backed — back buttons increase abandonment, not completion.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile. All elements sized for 375px viewport. 56px min tap targets.
- **Design system:** Navy text (#1A2332) + orange accent (#E8845A) on cool-white (#F8F9FC). Inter font. Research-backed for B2B trust and mobile readability.
- **Server-side Kit proxy** to bypass ad blockers (`/api/subscribe` Vercel serverless function).

## Environment & Config
- **Production URL:** https://hc-funnel.vercel.app
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Kit API key is server-side env var.
- **Resend:** API key in Vercel env vars. Sends action plan emails from brian@humbleconviction.com, reply-to results@humbleconviction.com
- **Anthropic:** API key in Vercel env vars (`ANTHROPIC_API_KEY`). Used for action plan generation + audit (2 calls per email, Claude Sonnet).
- **LAUNCH_STATUS:** Vercel env var, defaults to `pre_launch`. Set to `post_launch` when course launches — changes PS copy automatically.
- **GA4:** Measurement ID in Vercel env vars
- **Firebase env vars:** `VITE_FIREBASE_*` in `.env` locally and Vercel dashboard
- **Strategy/content doc:** `HC-PHASE1-DISCOVERY.md` in project root
- **Ad campaign assets:** `ads/` directory
- **Research memos:** `research/` directory

## Open Questions / Decisions Pending
- Email drip sequence copy — strategized but not written. Email 1 (results/action plan) is now done. Emails 2-5 still needed.
- When to start Meta ad campaign — depends on Nico's final ads + email content ready
- Demand validation: Email 4's "Want early access?" CTA is the signal for whether to build Eddy as a course
- results@humbleconviction.com routing — Nico has been pinged to set this up (forwarding to Brian or shared inbox)
- Test files in repo — clean up or gitignore
