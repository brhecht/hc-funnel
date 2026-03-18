# HANDOFF — HC Funnel
*Last updated: March 18, 2026 ~4pm ET*

## Project Overview
Quiz-based lead magnet funnel for Humble Conviction's upcoming pitching/fundraising course ("Eddy"). 8 scenario-based questions score founders across 4 dimensions, deliver a tier result with scorecard, and gate full recommendations behind email capture. Config-driven architecture — all content lives in `src/config/funnel.js`. Part of B-Suite, positioned as a sub-tool under B Marketing.

## Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend:** Firebase Firestore (shared `eddy-tracker-82486` project)
- **Email:** Kit (ConvertKit) V3 API via server-side Vercel proxy (`/api/subscribe`)
- **Hosting:** Vercel at hc-funnel.vercel.app (auto-deploy from git push)
- **Repo:** github.com/brhecht/hc-funnel
- **Local path:** `~/Developer/hc-funnel`

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
**Fully rebuilt and deployed (March 15, 2026).** Complete quiz funnel live at hc-funnel.vercel.app. Kit email integration wired (March 17). Ad creatives built in AdCreative.ai (March 18).

## Recent Changes (March 18, 2026)
- **All 4 ad concepts built in AdCreative.ai** — Nico executed Brian's creative brief, building all 4 concepts as Story (9:16) ads plus Feed (4:5) for Concepts 2 and 4. Six total projects created under the Humble Conviction brand in AdCreative.ai:
  1. **Pain Angle - Story** (Concept 1 "The Polite Pass") — Text overlay: `"We're going to pass." — every investor`. Conversion Score: 100/100
  2. **Dunning-Kruger Angle - Feed** (Concept 2 "The Room You Can't Read") — Text overlay: `He thinks the pitch is going well.` + punchline `The investors already decided.`. Conversion Score: 100/100
  3. **Dunning-Kruger Angle - Story** (Concept 2 Story version) — Same copy. Conversion Score: 100/100
  4. **Aspiration Angle - Story** (Concept 3 "The Shift") — Text overlay: `He stopped pitching investors.` + punchline `They started pitching him.`. Conversion Score: 100/100
  5. **Authority Angle - Feed** (Concept 4 "Built From the Other Side") — Text overlay: `2,500 founder pitches reviewed.` + punchline `See what investors see.`. Conversion Score: 99/100
  6. **Authority Angle - Story** (Concept 4 Story version) — Same copy. Conversion Score: 100/100
- **Used Brian's recommended Option A text overlays** for all concepts, verbatim from CREATIVE-BRIEF.md
- **Reference images uploaded to AdCreative.ai library** — All 4 Nano Banana reference images from `ads/phase1-references/` now in HC brand library
- **Ad copy compiled for Meta Ads Manager** — Full primary text, headlines, CTAs for all 4 concepts ready to paste. All copy verified: 125-char truncation rule passes, identity signals present, text overlays within 3-7 word range
- **Email draft sent to Brian** with all 4 story creatives attached + full Meta copy for each concept (Gmail draft in Nico's account)
- **Mockup images generated** — Python-generated mockups with text overlays saved to `B-Suite/hc-ads-mockups/` for reference (not production use)

### Previous Session (March 17, 2026)
- Kit integration wired end-to-end — subscribe proxy, tag `quiz-lead`, UTM capture/passthrough
- Vercel env vars configured for Kit

### Previous Session (March 16, 2026)
- Ad creatives package created by Brian — 4 concepts with reference images, creative brief, psychology framework
- ICP defined: White male tech founders, 24-34
- Waitlist email drip strategy researched (5-email sequence)

### Previous Session (March 15, 2026)
- Complete quiz rewrite, scoring engine, design system, full deploy

## Known Bugs / Issues
None reported. Brian noted he has design/wording tweaks to make — expected polish pass.

## Planned Features / Backlog
- **Meta Ads Manager setup** — Ad creatives are ready in AdCreative.ai. Next: download best variants, upload to Meta, configure campaigns (Concept 2 for cold traffic, Concept 4 for retargeting per Brian's brief)
- **Meta Pixel** — tracking integration for ad attribution (must be done before campaign launch)
- **Design/wording tweaks** — Brian will review live site and provide specific adjustments
- **Email content** — results email (full recommendations) + 5-email drip sequence (not yet written). Strategy in `research/waitlist-email-drip-strategy.md`
- **Kit automation** — wire email content to Kit autoresponder sequences
- **Feed versions for Concepts 1 & 3** — Currently only Story format. Feed (4:5) versions can be created if needed
- **A/B testing** — Brian's brief includes alternate text overlays (Option B) for each concept. If CTR is below benchmark after 500 impressions, swap overlays. Expect creative fatigue after 2-3 weeks per concept
- **Post-launch optimization** — Pancake Principle: first 2-3 weeks are data collection, not conversion optimization

## Design Decisions & Constraints
- **Config-driven:** All quiz content, scoring, copy, and design tokens in `src/config/funnel.js`. Components have zero hardcoded copy.
- **Scenario-based questions:** Not self-assessment. Founders choose how they'd respond in real investor situations.
- **Scoring:** Per-question: Best=2, Next-best=1, Weak=0. Two questions per dimension. Raw 0-4 per dimension → display 2/5, 3/5, or 4/5. Self-Awareness floors at 3. Raw total (0-16) determines tier.
- **Tier thresholds:** ~25% Lost in the Noise / ~64% Pieces Are There / ~11% So Close It Hurts.
- **Email gate (Option C):** Show tier + scorecard on web, gate full results behind email.
- **No back button:** Research-backed — back buttons increase abandonment.
- **Mobile-first:** 80%+ traffic from Meta ads on mobile.
- **Design system:** Navy text (#1A2332) + orange accent (#E8845A) on cool-white (#F8F9FC). Inter font.
- **Server-side Kit proxy** to bypass ad blockers.
- **Ad strategy:** Concept 2 (Dunning-Kruger) is predicted strongest for cold traffic. Concept 4 (authority/mentor) best for retargeting. All text overlays must contain "founder," "investor," or "pitch" for identity signaling.

## Environment & Config
- **Production URL:** https://hc-funnel.vercel.app
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads`
- **Kit integration:** Via `/api/subscribe` Vercel serverless proxy. Tag: `quiz-lead` (ID 17618088). Custom fields: tier, friction_area, waitlist, UTM params.
- **AdCreative.ai:** Logged in via admin@humbleconviction.com (Google auth from Hc Profile Chrome profile). 6 projects under Humble Conviction brand. 67 credits remaining (Professional 75 plan, resets in 25 days).
- **Ad assets:** `ads/CREATIVE-BRIEF.md` (full copy + psychology), `ads/phase1-references/` (5 reference images)
- **Mockups:** `B-Suite/hc-ads-mockups/` — reference images (REF-*.png), Python mockups (concept*-.jpg), step-by-step guide (GUIA-ADCREATIVE-PASO-A-PASO.md)

## Open Questions / Decisions Pending
- Brian's design/wording tweaks on the live quiz site
- Email copy: 5-email drip sequence strategized but not written. Email 1 (results email) is most urgent
- When to launch Meta campaign — depends on: (1) Brian approving ad creatives ✅ sent for review, (2) Meta Pixel installed, (3) email content ready so leads get nurtured
- Which ad variants to use — Brian needs to pick favorites from the AdCreative.ai generated variations (multiple layouts per concept)
- Feed (4:5) versions for Concepts 1 & 3 — create if Brian wants them for feed placements
- Demand validation: Email 4's "Want early access?" CTA = signal for whether to build Eddy
