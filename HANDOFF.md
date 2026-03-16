# HANDOFF — HC Funnel
*Last updated: March 15, 2026 ~evening ET*

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

## Recent Changes (March 15, 2026)
- **Complete rewrite of all quiz content** — from placeholder self-assessment questions to 8 locked scenario-based questions with per-option scoring
- **New scoring engine** — raw scores per dimension (0-4), display mapping (raw→2/5, 3/5, or 4/5), raw total (0-16) for tier assignment. Validated via Monte Carlo simulation (10K runs, 3 persona types)
- **New design system** — replaced warm cream/coral/Playfair Display with cool-white/navy/orange/Inter. Research-backed for B2B trust + mobile conversion.
- **Results page rebuilt** — calculating pause, tier badge (colored pill), scorecard with dot visualization, email gate CTA card in coral
- **Quiz UX rebuilt** — scenario cards with A/B/C/D letter badges, thin progress bar, no back button, no multi-select, no section labels
- **Landing page updated** — "Investor-Tested Insights" positioning, new copy and feature cards
- **Removed:** back button, multi-select support, section labels, deep dive questions, friction diagnoses, old 4-tier system, old waitlist hooks

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
- **Ad campaign assets:** `ads/` directory — `CREATIVE-BRIEF.md` (Nico's execution doc with text overlays, ad copy, persuasion framework), `NANO-BANANA-PROMPTS.md` (image generation prompts), `phase1-references/` (locked Nano Banana reference images)

## Open Questions / Decisions Pending
- Brian's design/wording tweaks (will review live site next session)
- Email content: results email + drip sequence (deferred to focus on getting quiz live first)
- When to start Meta ad campaign (depends on email content being ready)
