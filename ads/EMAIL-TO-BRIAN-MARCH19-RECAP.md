# Email to Brian — March 19 Recap + Tomorrow's Plan

**To:** brhnyc1970@gmail.com
**Subject:** HC Funnel — Full Recap March 19 + Action Plan for March 20

---

Hey Brian,

Long session tonight. Here's everything that got done and the plan for tomorrow.

---

**META PIXEL — FULLY IMPLEMENTED (your Priority 4)**

The Meta Pixel is 100% wired in the codebase, just needs one deploy:

- Pixel ID `1407883507304` (HC Eddy Pixel) hardcoded in `index.html` — both the `fbq('init')` call and the `<noscript>` fallback image. Replaced the placeholder that was there.
- Fixed the React hook (`useMetaPixel.js`) — the env var was `VITE_FB_PIXEL_ID` but Vercel had `VITE_META_PIXEL_ID`. Now they match.
- `VITE_META_PIXEL_ID=1407883507304` is already set in Vercel Dashboard (I added it earlier tonight).
- All 4 tracking events are already wired from previous sessions:
  - **PageView** — fires on every route change (App.jsx)
  - **ViewContent** — fires when user starts the quiz (Quiz.jsx) + when results page renders (Results.jsx)
  - **QuizComplete** — fires when user answers all 8 questions (Quiz.jsx)
  - **Lead** — fires on email capture, includes tier name + raw score (Results.jsx)
- Tomorrow morning: `git push` → Vercel auto-deploys → verify with Meta Pixel Helper Chrome extension.

**One thing only you can do:** Add `quiz.humbleconviction.com` as a domain in Meta Events Manager → Settings → Domains. This lets Meta verify pixel events are coming from our domain. Events should show up within 24 hours of deploy.

---

**AD CREATIVE TEMPLATES — ALL EXISTING CONCEPTS IN HC COLORS**

Everything in AdCreative.ai now matches HC design system (navy #1A2332 + coral #E8845A). Specific work tonight:

- **Pain Angle Story (9:16):** Changed background from AdCreative.ai blue to HC navy, CTA/accent to HC coral
- **Authority Angle Story (9:16):** Text overlay updated ("reviewed" → "analyzed", added "+" to "2,500"), font size adjusted from 89px to ~84px to prevent text wrapping, HC colors applied
- **Pain Angle Feed (4:5 / 1080x1350):** CREATED — didn't exist before. Built by converting from Story, inherits correct text overlay ("We're going to pass." — every investor) + HC colors
- **Pain Angle Post (1080x1080):** HC colors applied (was still in AdCreative.ai blue template)
- **Concept 2 Feed (4:5):** Text overlay corrected from AI-generated placeholder to final copy sheet version ("The investor tuned out five minutes ago."), font size set to 65px, HC colors applied

**Still needed:** Concept 2 Story + Feed with your new image (the founder pitching to VC in Patagonia vest). Image received — I'll build these templates tomorrow in AdCreative.ai.

---

**AD COPY FILES CLEANED UP**

- `CREATIVE-BRIEF.md` + `REVISED-CREATIVE-BRIEF.md`: "coached" → "analyzed" everywhere, URLs updated to quiz.humbleconviction.com
- `FINAL-COPY-SHEET.md`: Created — complete copy-paste reference for Meta Ads Manager with all 3 concepts, char counts, HC colors, testing strategy
- Stale duplicate file deleted (git pull conflict artifact)

---

**META PIXEL DOCS CREATED**

- `BRIAN-META-PIXEL-SETUP.md`: Full status doc — pixel name/ID, what's done, what you need to do (just the domain step)
- `CLAUDE-CODE-META-PIXEL-PROMPT.md`: Updated with deploy instructions + the quizAnswers wiring task

---

**YOUR 5 PRIORITIES — HONEST STATUS**

1. **Wire `{quizAnswers}` into action plan endpoint** — NOT DONE YET. Currently the API only gets aggregated scores + tier, not the specific answers the user chose. I wrote a detailed Claude Code implementation prompt with step-by-step instructions for all 3 files that need changes (Results.jsx, firebase.js, api/action-plan.js). I'll execute this tomorrow — ~1 hour.

2. **Swap placeholder prompt for ACTION-PLAN-PROMPT.md** — BLOCKED ON YOU. The file doesn't exist. The placeholder prompt in `api/action-plan.js` (lines 83-93) works and generates reasonable output, but it's generic — not tuned to your voice or Eddy promotions. Once you write the final prompt, it's a 5-minute swap for me.

3. **Hardcode [INTRO] in HTML email template** — BLOCKED ON YOU. The email template is in `buildEmailHtml()` in `api/action-plan.js` (lines 122-170). Right now it jumps straight into the AI-generated action plan. Once you write the intro paragraph, it's another 5-minute add.

4. **Meta Pixel** — ✅ DONE. Code complete. Deploy tomorrow morning.

5. **Ad production** — ✅ MOSTLY DONE. All existing concepts in HC colors. Pain Angle has all 3 formats. Concept 2 with your new image is the last piece — building tomorrow.

---

**TOMORROW'S PLAN (March 20)**

Morning:
1. `git push` Meta Pixel changes → verify deploy → check with Pixel Helper
2. Wire `{quizAnswers}` into action plan endpoint (your Priority 1) — ~1 hour

Afternoon:
3. Build Concept 2 Story + Feed templates with your new image in AdCreative.ai
4. If you send me the prompt text (Priority 2) and intro copy (Priority 3), I drop them in same day — 5 min each

**WHAT I NEED FROM YOU (only things I can't do):**
1. Add `quiz.humbleconviction.com` domain in Meta Events Manager → Settings → Domains
2. Write the final action plan prompt (what should Claude tell each founder? Structure, tone, Eddy references)
3. Write the [INTRO] paragraph for the email (static text before the AI action plan)
4. Final review of all ad concepts as a package once Concept 2 templates are done

Launch target March 23 is on track. Pipeline fully functional — quiz → scores → email capture → Firestore + Kit + Claude action plan via Resend. Just needs your content pieces and the deploy.

— Nico
