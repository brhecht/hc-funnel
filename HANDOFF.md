# HANDOFF — HC Funnel
*Last updated: March 16, 2026 ~evening ET*

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
**Fully rebuilt and deployed (March 15, 2026).** Complete quiz funnel live at hc-funnel.vercel.app with:
- 8 scenario-based questions (not self-assessment) following emotional arc: easy entry → uncomfortable middle → mirror → aspirational close
- 4-dimension scoring: Clarity, Investor Fluency, Self-Awareness, Persuasion Instincts
- 3-level display system (2/5, 3/5, 4/5 — no 5/5 exists; Self-Awareness floors at 3/5)
- 3 tiers: Lost in the Noise (raw 0-3) / The Pieces Are There (raw 4-9) / So Close It Hurts (raw 10+)
- Calculating pause animation (2.5s) before results
- Scorecard with filled-dot visualization + explanation + cracked door line per dimension
- Email gate with coral CTA card ("Send My Recommendations") + waitlist checkbox
- Firestore lead capture + Kit subscription working
- New design system: navy/orange palette (#F8F9FC bg, #1A2332 text, #E8845A accent), Inter font throughout

## Recent Changes (March 16, 2026)
- **Ad creatives package created** — 4 Instagram feed ad concepts with reference images (generated via Nano Banana), text overlay options, ad copy, and social-media-specific persuasion psychology framework. Concepts: (1) "The Polite Pass" (pain/rejection), (2) "The Room You Can't Read" (Dunning-Kruger), (3) "The Shift" (aspiration/power flip), (4) "Built From the Other Side" (authority/credibility). All reference images locked after iterative refinement. Brief emailed to Nico with instructions to build final ads in AdCreative.ai.
- **ICP defined for ad creative:** White male tech founders, 24-34. Every text overlay and first line of ad copy contains "founder," "investor," or "pitch" for identity signaling.
- **Waitlist email drip strategy researched** — 5-email sequence over 4 weeks for pre-product nurture. Research memo saved to `research/waitlist-email-drip-strategy.md`. Key finding: waitlist age kills conversion (0% at 6+ months), so nurture is mandatory. Email 4 includes demand validation CTA ("Want early access?") as the signal for whether to build the course.
- **New directories:** `ads/` (creative brief, image prompts, reference images) and `research/` (research memos)
- **Legacy handoff files migrated** — b-marketing's date-stamped handoff files consolidated to single HANDOFF.md

### Previous Session (March 15, 2026)
- Complete rewrite of all quiz content — 8 locked scenario-based questions with per-option scoring
- New scoring engine validated via Monte Carlo simulation (10K runs, 3 persona types)
- New design system: cool-white/navy/orange/Inter
- Results page, quiz UX, landing page all rebuilt

## Known Bugs / Issues
None reported. Brian noted he has design/wording tweaks to make — expected polish pass.

## Planned Features / Backlog
- **Design/wording tweaks** — Brian will review live site and provide specific adjustments (next session)
- **Email content** — results email (full recommendations) + 5-email drip sequence (not yet written)
- **Kit automation** — wire email content to Kit autoresponder sequences
- **Meta Pixel** — tracking integration for ad attribution
- **Ad creatives** — 4 concepts created (March 16). Creative brief and reference images in `ads/`. See `ads/CREATIVE-BRIEF.md` for Nico's execution doc (text overlays, ad copy, psychology framework, testing strategy) and `ads/NANO-BANANA-PROMPTS.md` for image generation prompts. Locked reference images go in `ads/phase1-references/`. Next: Nico builds final ad images in AdCreative.ai using these references, then Meta campaign launch.
- **Post-launch optimization** — Pancake Principle: first 2-3 weeks are for data collection, not conversion optimization. Metrics to track: CPC, CPL, quiz completion rate, email capture rate, waitlist check rate, score distribution

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

## Environment & Config
- **Production URL:** https://hc-funnel.vercel.app
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads` — stores quiz answers, raw scores, display scores, tier, waitlist flag
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Kit API key is server-side env var.
- **Firebase env vars:** `VITE_FIREBASE_*` in `.env` locally and Vercel dashboard
- **Strategy/content doc:** `HC-PHASE1-DISCOVERY.md` in project root — contains all architecture decisions, all quiz questions with scoring and aha reveals, all results copy, Monte Carlo methodology, research references
- **Ad campaign assets:** `ads/` directory — `CREATIVE-BRIEF.md` (Nico's execution doc with text overlays, ad copy, persuasion framework), `NANO-BANANA-PROMPTS.md` (image generation prompts), `phase1-references/` (5 locked Nano Banana reference images including 1 alt)
- **Research memos:** `research/` directory — `waitlist-email-drip-strategy.md` (pre-product email sequence strategy, March 16)

## Open Questions / Decisions Pending
- Brian's design/wording tweaks on the live quiz site
- Email copy: the 5-email drip sequence is strategized (see research memo) but actual copy not yet written. Email 1 (results email) is the most urgent — it's the payoff for the email gate.
- When to start Meta ad campaign — depends on: (1) Nico building final ads in AdCreative.ai from the reference images, (2) email content being ready so captured leads get nurtured immediately
- Demand validation: Email 4's "Want early access?" CTA will be the signal for whether to build Eddy as a course. If <5% click, rethink the product.
