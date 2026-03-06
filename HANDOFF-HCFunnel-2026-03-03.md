# HANDOFF — HC Funnel
*Last updated: March 3, 2026 ~4:00 PM ET*

## Project Overview
Marketing funnel for **Humble Conviction** — a course on pitching/fundraising for startup founders. The funnel validates demand for the course ("Pitch Better, Get Funded Faster") by capturing leads through an interactive quiz, scoring their pitch readiness, and collecting waitlist signups as the primary conversion event.

This is one of three HC projects:
- **hc-funnel** (this project) — marketing/lead gen funnel
- **hc-course** — course platform (not yet started, gated by waitlist validation)
- **eddy** — project tracker/dashboard (separate, already built)

## Tech Stack
- **Frontend:** React 19 + Vite 6 + Tailwind CSS 4 + React Router 7
- **Database:** Firebase Firestore (reuses eddy project `eddy-tracker-82486`)
- **Email:** Kit (ConvertKit) V3 API — form ID `9157411`, with Visual Automation autoresponder
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Serverless:** Vercel serverless function (`api/subscribe.js`) proxies Kit API to bypass ad blockers
- **Design:** Warm light theme — Playfair Display headings, DM Sans body, cream bg (#FAF6F1), coral accent (#E8845A)

## Folder Structure
```
hc-funnel/
├── api/
│   └── subscribe.js          # Vercel serverless Kit proxy
├── src/
│   ├── config/
│   │   └── funnel.js          # ALL content, scoring, copy lives here (CONFIG-driven)
│   ├── context/
│   │   └── FunnelContext.jsx   # Quiz state, scoring engine, deep dive state
│   ├── components/
│   │   └── Layout.jsx          # Branded shell (header, footer, cream bg)
│   ├── pages/
│   │   ├── Landing.jsx         # Hero + feature cards → /quiz CTA
│   │   ├── Quiz.jsx            # 8 MC questions, progress bar, multi-select support
│   │   └── Results.jsx         # Tier + friction + email capture + deep dive + waitlist CTA
│   ├── firebase.js             # Firestore saveLead/updateLead + Kit subscribeToKit proxy call
│   ├── App.jsx                 # Router: / → Landing, /quiz → Quiz, /results → Results
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind imports
├── index.html                  # Google Fonts (Playfair Display + DM Sans)
├── vercel.json                 # Rewrites: /api/* → serverless, /* → SPA
├── .env                        # Firebase + Kit env vars (gitignored)
├── .gitignore
├── package.json
└── vite.config.js
```

## Current Status
**Phase: MVP complete, pre-launch.** The full funnel flow is built, wired to Firestore and Kit, and deployed live.

### Working:
- 8-question quiz with 4-dimension scoring (readiness, packaging, strategy, vcLiteracy)
- Instant results: readiness tier + friction diagnosis + personalized next steps
- Email capture form with optional waitlist checkbox
- Firestore lead capture: email, quiz answers, scores, tier, friction area, waitlist intent, deep dive answers
- Kit subscriber creation via server-side proxy (ad-blocker proof)
- Kit autoresponder fires immediately on subscribe (Visual Automation → Email Sequence)
- Auto-confirm enabled (no double opt-in)
- Custom fields passed to Kit: tier, friction_area, waitlist
- `waitlistStage` tracked in Firestore: "phase1" (checked at email capture) vs "phase2" (clicked CTA after deep dive)
- 5-question deep dive enrichment (text + select inputs), updates lead doc
- Full waitlist CTA with per-friction-area personalized copy
- Deployed at hc-funnel.vercel.app

### Partially built:
- Deep dive data is captured but the AI diagnostic email pipeline isn't wired yet
- Autoresponder email copy is placeholder — needs refinement

## Recent Changes (this session — built from scratch)
1. Scaffolded entire hc-funnel project (React + Vite + Tailwind)
2. Built CONFIG-driven architecture — all content in `src/config/funnel.js`
3. Created 8 quiz questions with 4-dimension scoring + multi-select support
4. Built readiness tiers (4 levels) and friction diagnoses (4 areas) with personalized next steps
5. Integrated Firebase/Firestore for lead capture (`leads` collection)
6. Added warm light theme (bhub/Ali Abdaal inspired) — Playfair Display + DM Sans + cream/coral palette
7. Added waitlist checkbox to email capture form with `waitlistStage` tracking (phase1 vs phase2)
8. Integrated Kit V3 API for subscriber creation with custom fields
9. Built server-side proxy (`api/subscribe.js`) to bypass ad blockers
10. Set up Kit Visual Automation with autoresponder email sequence
11. Configured auto-confirm (no double opt-in) in Kit
12. Published Firestore security rules: public create/update on `leads`, auth-only reads
13. Deployed to Vercel with all env vars configured
14. Set up GitHub repo at github.com/brhrecht/hc-funnel

## Known Bugs / Issues
- **Kit form named "Clare form"** — should be renamed to "HC Quiz" in Kit
- **Kit autoresponder subject line** may have a truncation issue ("Convictionect...") — verify and fix in Kit sequence editor
- **Kit mailing address** defaults to Seattle — needs updating to actual business address in Kit Settings → General
- **"Built with Kit" badge** appears in emails — goes away on paid plan
- **Browser Kit calls on localhost** get blocked by ad blockers — irrelevant now that server-side proxy is deployed, but the old `VITE_KIT_*` env vars are still in `.env` (harmless, can clean up)
- **Kit trial: 13 days remaining** — automations are a paid feature. Need to decide on paid plan before trial expires or lose autoresponder functionality

## Planned Features / Backlog
**Infrastructure (in priority order):**
1. Meta Pixel + conversion event tracking (quiz start, email capture, waitlist join)
2. gh CLI auth (parked — GitHub had an outage, just run `gh auth login`)
3. Archive old repos (pitch-scorer, founder_assessment) via gh CLI
4. AI diagnostic email pipeline (Make/Zapier → GPT API → Kit)
5. Waitlist-specific Kit automation (separate email for waitlist joiners)

**Marketing operations:**
6. Target audiences + messaging angles (Eddy W1 tasks c1 + a1)
7. Ad creatives (Eddy W1 task c2)
8. Meta Ads campaign setup + test budget

**Product:**
9. Build hc-course (separate project, gated by waitlist validation)

**Creative / polish (later):**
10. LP copy refinement
11. Quiz question wording
12. Results page copy
13. Autoresponder email copy
14. Design polish across all pages

## Design Decisions & Constraints
- **CONFIG-driven architecture:** All content, scoring weights, copy, and theme values live in `funnel.js`. Components are content-agnostic — swap the config to create a new funnel for a different product.
- **Two-phase quiz:** Phase 1 (8 MC questions) gives instant results + email capture. Phase 2 (5 deep dive questions) is optional enrichment for future AI diagnostic. Email capture gates between the phases.
- **Waitlist as primary conversion event:** Email capture is for the diagnostic (value exchange). Waitlist signup is the real demand signal. These are deliberately separated — checkbox at Phase 1, full CTA at Phase 2.
- **`waitlistStage` tracking:** "phase1" = converted on instant results alone. "phase2" = needed deep dive to convert. This data informs whether the deep dive is worth keeping.
- **Server-side Kit proxy:** Frontend calls `/api/subscribe` (own domain) instead of `api.convertkit.com` (blocked by ad blockers). API key stays server-side.
- **Reused eddy Firebase project:** Same Firestore instance (`eddy-tracker-82486`) with a separate `leads` collection. Keeps infrastructure simple.
- **Brian's preference:** Warm light aesthetic (not dark mode). Direct, strategic communication. Execution over theory.

## Environment & Config

### Live URLs:
- **Production:** hc-funnel.vercel.app
- **GitHub:** github.com/brhrecht/hc-funnel

### Env vars (local `.env` at `~/Desktop/B-Suite/hc-funnel/.env`):
- `VITE_FIREBASE_API_KEY` — Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` — eddy-tracker-82486.firebaseapp.com
- `VITE_FIREBASE_PROJECT_ID` — eddy-tracker-82486
- `VITE_FIREBASE_STORAGE_BUCKET` — eddy-tracker-82486.firebasestorage.app
- `VITE_FIREBASE_MESSAGING_SENDER_ID` — (numeric)
- `VITE_FIREBASE_APP_ID` — (numeric:web:hex)
- `VITE_KIT_API_KEY` — Kit V3 API key (legacy, still in .env but frontend now uses proxy)
- `VITE_KIT_FORM_ID` — 9157411 (legacy, same)

### Vercel env vars (includes all above plus):
- `KIT_API_KEY` — server-side Kit API key (used by `api/subscribe.js`)
- `KIT_FORM_ID` — 9157411 (used by `api/subscribe.js`)

### Kit:
- Account: Humble Conviction (brhnyc1970@gmail.com)
- Form: "Clare form" (should rename to "HC Quiz"), ID 9157411
- Automation: "Visual Automation 1" — triggers on form subscribe → "Joined Newsletter" sequence → immediate autoresponder email
- Trial: 13 days remaining as of March 3, 2026
- Auto-confirm: ON (no double opt-in)

### Firestore rules:
```
leads/{leadId}: allow create, update: if true; allow read: if request.auth != null;
```

## Open Questions / Decisions Pending
- **Kit paid plan:** Trial expires in ~13 days. Automations (autoresponder) require paid. Decide before expiration.
- **AI diagnostic email:** What service for the GPT API call — Make or Zapier? What GPT model/prompt? What email template?
- **Course platform timing:** When does waitlist signal justify starting hc-course? What's the threshold?
- **VS Code workflow:** Promised to flag when visual polish stage is right for Brian to use VS Code directly. Not there yet.
- **Nico's Kit account:** Originally assumed Nico would set up Kit. Brian did it instead. Confirm Nico has access to the Kit account if needed.
