# HANDOFF — HC Funnel
*Last updated: March 20, 2026 ~11:59pm ET*

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

## Current Status
**All code complete — needs 1 env var (`LAUNCH_STATUS=pre_launch`) to go live. Tuesday March 24 launch target. Monday is testing day.**

The full action plan pipeline is wired end-to-end: quiz answers → dimension scoring → email capture → Firestore + Kit + Claude-generated personalized action plan email via Resend. Brian's final prompt is integrated. All 6 ad creatives are built. Meta Pixel code is deployed. QA protocol is written. IG mockups created for visual reference.

**Pipeline:** Meta Ad → quiz.humbleconviction.com → quiz → email capture → Firestore + Kit + Claude action plan email via Resend.

## What Shipped March 20 — Full Day Summary

### Morning (Cowork — FRAIS Sync + Prep)
- Morning briefing generated and delivered via Slack (6 tasks assigned)
- FRAIS sync with Brian at 9:45am
- Reviewed Brian's overnight reply re: priorities 2 & 3 (prompt + intro)
- Generated Anthropic API key creation instructions for Brian
- Generated AdCreative.ai ↔ Meta connection instructions for Brian
- Set up hourly co-founder sync system — 8 digests delivered to Brian/Nico DM throughout the day, tracking blockers and task status in real time

### Afternoon (Claude Code — Action Plan Pipeline + Bug Fixes + Testing)

**Action Plan Pipeline — Complete Rewrite of `api/action-plan.js`:**
- Brian's full prompt integrated from `ACTION-PLAN-PROMPT.md` (was placeholder). Includes voice/tone guidelines, section-by-section structure, Eddy course nudge logic, waitlist conditional PS, dimension-to-course mapping.
- All quiz data now flows through the full pipeline: `Results.jsx` → `firebase.js` → `api/action-plan.js` → Claude prompt. Now sends: `answers` (individual quiz choices with full option text), `rawDimensions`, `displayScores`, `weakestDimension`, `weakestScore`, `secondWeakest`, `secondWeakestScore`, `strongestDimension`, `strongestScore`, `scorecardCopy`, `waitlistStatus`.
- Hardcoded intro paragraph in email (not AI-generated) — sets context before Claude's action plan.
- Section marker parser (`formatActionPlan()`) converts Claude's structured output (`[HOLISTIC]`, `[WEAKEST]`, etc.) into styled HTML with dividers and coral-bordered contrast closers.
- PS duplication risk fixed. Subject line: "Your personalized pitch action plan is ready". From: Brian Hecht results@humbleconviction.com. max_tokens bumped to 2048.
- `LAUNCH_STATUS` env var support — controls PS text (pre_launch shows waitlist pitch, post_launch shows Eddy link).

**9 Bugs Fixed:**
1. Meta Pixel ID was truncated (13 digits → 16)
2. `useMetaPixel` was dead code — rewrote as `trackPixel`, wired into Landing/Quiz/Results
3. `frictionArea` in Kit was passing tier ID instead of weakest dimension
4. No error feedback on email capture failure — added alert
5. Direct `/results` navigation showed fake results — now redirects to `/quiz`
6. Answer labels weren't reaching the prompt — only letter IDs. Now full text passes through
7. No unsubscribe link in email — added to footer
8. `###` markdown headers leaking into rendered email — added cleanup regex
9. `[BRACKETS]` around section titles — added strip regex

**8 Commits Pushed (all on main, auto-deployed):**
- `b7897aa` — Strip leftover brackets and section markers from email output
- `adfe210` — Fix markdown ### headers leaking into rendered email
- `e5ef222` — Fix frictionArea in Kit, error feedback on capture fail, /results redirect
- `4e0010d` — Unsubscribe link in action plan email footer
- `52d2001` — Answer labels passed to action plan (full option text, not just letter IDs)
- `7e4be77` — Meta Pixel ID fixed (1407883507304464), events wired: ViewContent, CompleteRegistration, Lead
- `9cc5e39` — Brian's final prompt integrated, section parser, hardcoded intro, redesigned email
- `abeb30b` — Quiz answers + rawDimensions wired through pipeline + Meta Pixel base

**Expert Audit:** System scored 6.2/10 with 16 open loops. 12 resolved this session.

**E2E Testing Complete — All 3 Tiers:**
- Sent test emails to `nico+tier1@`, `nico+tier2@`, `nico+tier3@`
- Found and fixed 2 remaining bugs: markdown headers leaking, bracket artifacts
- Verification emails sent after each fix

**QA Protocol:** `QA-PROTOCOL.md` created — 7 test scenarios. Tests 1-6 pass. Test 7 (ad simulation) blocked on Brian approving ads.

### Evening (Cowork — Ad Creatives + Audit Doc + IG Mockups)

**All 6 Ad Creatives Regenerated from Scratch in AdCreative.ai:**
Previous creatives had wrong colors/images/copy. Redid everything cleanly with correct HC brand colors, correct reference images, and exact copy from FINAL-COPY-SHEET.md. All scoring 97-100/100.

| Creative | Project ID | Image | Score |
|----------|-----------|-------|-------|
| C1 Feed (4:5) | 921587 | Polite Pass.png (guy in hoodie) | 100/100 |
| C1 Story (9:16) | 921588 | Polite Pass.png | 100/100 |
| C2 Feed (4:5) | 921590 | Brian's real photo (c2-new-reference-brian.png) | 100/100 |
| C2 Story (9:16) | 921591 | Brian's real photo | 100/100 |
| C4 Feed (4:5) | 921592 | Built From the Other Side.png (mentor portrait) | 100/100 |
| C4 Story (9:16) | 921593 | Built From the Other Side.png | 99-100/100 |

**HC-Ad-Creative-Batch-v2.docx Rebuilt:**
- Script at `ads/doc-gen/generate-doc.js` fully rewritten with correct project URLs
- Now includes full primary text (the "...more" copy) for each concept
- Uploaded to Google Drive: https://docs.google.com/document/d/1wJoHkzAlMfEiN0G7oRQBZKY7DBovGyxN/edit

**Instagram Mockup HTML Created:**
- `ads/hc-instagram-mockups.html` — interactive HTML with real reference photos embedded (base64)
- Simulates full IG UI: profile pic, "Sponsored" label, engagement icons, "Learn More" CTA, primary text with "...more"
- Tabs switch between C1, C2, C4. Pushed to repo. Brian can `git pull` and open in Chrome.

**Gmail Recap Email Drafted + Slack DM Sent to Brian** with links to all creatives and the IG mockup.

## No Technical Blockers Remaining
Blocked only on Brian: approve ads (B5), test email voice/tone (B8), write drip copy (B7 — out of scope for launch).

## Remaining Tasks — Pre-Launch

### DEPLOYMENT (do first)
| Task | Owner | Details |
|------|-------|---------|
| Add `LAUNCH_STATUS=pre_launch` env var in Vercel | Nico | Vercel dashboard → hc-funnel → Settings → Environment Variables. Controls PS text in action plan email. |
| Verify Meta Pixel with Pixel Helper | Nico | Visit quiz.humbleconviction.com with Meta Pixel Helper. Check PageView, ViewContent, QuizComplete, Lead events. |

### META ADS SETUP (Nico)
| Task | Details | Status |
|------|---------|--------|
| Verify `humbleconviction.com` domain in Meta Events Manager | Business Settings → Brand Safety → Domains → DNS TXT record in GoDaddy | Not started |
| Add `quiz.humbleconviction.com` to pixel traffic allowlist | Events Manager → Pixel Settings → Traffic Permissions | Not started |
| Configure event priorities (Aggregated Event Measurement) | Lead (highest) → ViewContent → PageView | After domain verification |
| Meta Ads Manager campaign setup + launch | 3 concepts, targeting, budget | Blocked on Brian approval (B5) |

### BRIAN'S TASKS
| # | Task | Status |
|---|------|--------|
| B5 | Final approve all 6 ad creatives | Ready — audit doc + IG mockups sent |
| B7 | Write autoresponder email copy for Kit | Not started — 3 tier-specific templates |
| B8 | Live-test action plan email (take quiz end-to-end) | Ready — code deployed |
| B9 | End-to-end expert audit | Blocked on B5, B7 |

## Environment & Config
- **Production URL:** https://quiz.humbleconviction.com (also https://hc-funnel.vercel.app)
- **GitHub:** github.com/brhecht/hc-funnel (auto-deploy on push to main)
- **Firebase project:** `eddy-tracker-82486` (shared with eddy and b-marketing)
- **Firestore collection:** `leads`
- **Kit integration:** Via `/api/subscribe`. Tag: `quiz-lead` (ID 17618088). Auto-confirm ON.
- **Sending email:** results@humbleconviction.com (Resend + Kit both verified)
- **AdCreative.ai:** Humble Conviction brand. 6 projects. Login: admin@humbleconviction.com.
- **Meta Pixel:** HC Eddy Pixel, ID `1407883507304464`. ClaimFame business portfolio.
- **YouTube videos (post-capture):** Short: `iqw1IgRA2sw` (0:52). Long: `_3601d3OpYY` (8:16).
- **Vercel env vars:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ANTHROPIC_API_KEY`, `VITE_META_PIXEL_ID`. Needs: `LAUNCH_STATUS=pre_launch`.

## Open Questions / Decisions Pending
- Kit autoresponder emails: Brian needs to write tier-specific copy (B7). Drafts in `research/autoresponder-email-audit-march-2026.md`.
- Meta campaign structure: Single campaign with 3 ad sets? Or separate for cold (C1+C2) vs retargeting (C4)?
- Vercel Pro upgrade: May be needed if action plan API times out on hobby plan (10s limit). Monitor after deploy.
