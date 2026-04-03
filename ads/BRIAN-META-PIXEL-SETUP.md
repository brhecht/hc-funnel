# Meta Pixel Status — HC Quiz Funnel
*Updated: March 19, 2026*

---

## ✅ Pixel Already Exists

**Name:** HC Eddy Pixel
**Pixel ID:** `1407883507304`
**Status:** Created, no integrations yet, 0 events

---

## ✅ What Nico Already Did (All Complete)
1. Pixel ID hardcoded in `index.html` base code (`fbq('init','1407883507304')` + `<noscript>` fallback)
2. React hook `useMetaPixel.js` wired — env var fixed to `VITE_META_PIXEL_ID`
3. `VITE_META_PIXEL_ID=1407883507304` added to Vercel Dashboard (Production + Preview)
4. All pixel events wired in React app:
   - **PageView** — every route change (App.jsx → usePixelPageView hook)
   - **ViewContent** — quiz start (Quiz.jsx) + results render (Results.jsx)
   - **QuizComplete** — custom event when all 8 questions answered (Quiz.jsx)
   - **Lead** — email capture with tier name + raw score (Results.jsx)
5. **Status: needs `git push` to deploy → then verify with Meta Pixel Helper**

## What Brian Needs to Do
1. **Add domain** in Events Manager → Settings → Domains → add `quiz.humbleconviction.com`
2. **Verify events** show up in Events Manager within 24 hours of launch

---

## Events Being Tracked
- **PageView** — all pages (/, /quiz, /results)
- **ViewContent** — quiz start + results page
- **QuizComplete** — custom event when all 8 questions answered
- **Lead** — email capture with tier + score

## Phase Strategy
- **Phase 1 (Week 1-3):** Optimize campaign for ViewContent (quiz completions)
- **Phase 2 (Week 4+):** Switch to Lead optimization once enough signal
- All events track from day 1
