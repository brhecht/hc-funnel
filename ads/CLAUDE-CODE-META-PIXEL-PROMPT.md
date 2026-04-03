# Claude Code Task: Deploy Meta Pixel + Wire quizAnswers

## ⚠️ Meta Pixel Implementation is DONE — Just Deploy

All code changes are already in the working tree. You only need to commit and push.

### Files changed (verify before committing):
1. **`index.html`** — Pixel ID `1407883507304` hardcoded in `fbq('init')` call (line 21) and `<noscript>` img (line 27). Was `YOUR_PIXEL_ID_HERE`.
2. **`src/hooks/useMetaPixel.js`** — env var changed from `VITE_FB_PIXEL_ID` to `VITE_META_PIXEL_ID` (line 4). Matches what's in Vercel Dashboard.

### Deploy steps:
```bash
cd ~/Developer/hc-funnel
git pull --rebase origin main
git add index.html src/hooks/useMetaPixel.js
git commit -m "feat: Meta Pixel — hardcode ID 1407883507304, fix env var name

- Replace YOUR_PIXEL_ID_HERE with actual HC Eddy Pixel ID in index.html
- Fix useMetaPixel.js env var: VITE_FB_PIXEL_ID → VITE_META_PIXEL_ID
- VITE_META_PIXEL_ID already set in Vercel Dashboard
- Events already wired: PageView, ViewContent, QuizComplete, Lead"
git push origin main
```

### Verify after deploy:
1. Open https://quiz.humbleconviction.com in Chrome
2. Install Meta Pixel Helper extension if not already
3. Navigate through: Landing → Quiz → Results
4. Pixel Helper should show: PageView on each route, ViewContent on quiz start + results
5. `fbq.getState()` in browser console should return pixel config with ID 1407883507304

### What's already working (DO NOT touch):
- `src/hooks/useMetaPixel.js` — hook exists, exports `useMetaPixel()`, `usePixelPageView()`, `trackPixelEvent()`
- `src/App.jsx` — calls `useMetaPixel()` (line 24) and `usePixelPageView()` (line 10)
- `src/pages/Quiz.jsx` — fires `ViewContent` on mount (line 27) + `QuizComplete` on last answer (line 42)
- `src/pages/Results.jsx` — fires `ViewContent` on render (line 180) + `Lead` on email capture (line 200)
- Vercel env var `VITE_META_PIXEL_ID=1407883507304` — already set

---

## Task 2: Wire `{quizAnswers}` into Action Plan Endpoint

Brian wants the action plan email to reference the specific answers the user chose (not just aggregated scores). Currently `requestActionPlan()` in `firebase.js` only sends: `tier`, `tierName`, `displayScores`, `weakestDimension`.

### What to do:

#### 1. Frontend — pass quiz answers with labels to the API

In `src/pages/Results.jsx`, the `handleEmailCaptured()` function (line 184) already has access to `answers` from `useFunnel()`. The `answers` object looks like: `{ "q1_clarity": "b", "q2_persuasion": "c", ... }`.

You need to:
- Import the funnel config: `import FUNNEL from "../config/funnel"` (or get `config` from `useFunnel()` which is already destructured)
- Build a `quizAnswers` array that includes both the option ID AND the label text for each answer
- Pass it to `requestActionPlan()`

Example structure to build:
```js
const quizAnswers = config.quiz.questions.map(q => {
  const selectedOptionId = answers[q.id]
  const selectedOption = q.options.find(o => o.id === selectedOptionId)
  return {
    questionId: q.id,
    dimension: q.dimension,
    questionText: q.text,
    selectedOptionId,
    selectedLabel: selectedOption?.label || "",
    points: selectedOption?.points ?? 0,
  }
})
```

Then pass to `requestActionPlan`:
```js
requestActionPlan(email, {
  tier: tier.id,
  tierName: tier.name,
  displayScores: { ...displayScores },
  weakestDimension: weakest?.[0] || "",
  quizAnswers,  // NEW
})
```

#### 2. Update `src/firebase.js` — pass quizAnswers through

In `requestActionPlan()` (line 50), add `quizAnswers` to the JSON body:
```js
body: JSON.stringify({
  email,
  tier: quizData.tier || "",
  tierName: quizData.tierName || "",
  displayScores: quizData.displayScores || {},
  weakestDimension: quizData.weakestDimension || "",
  quizAnswers: quizData.quizAnswers || [],  // NEW
}),
```

#### 3. Update `api/action-plan.js` — accept and use quizAnswers

In the handler (line 22), destructure `quizAnswers`:
```js
const { email, tier, tierName, displayScores, weakestDimension, quizAnswers } = req.body || {}
```

Pass to `generateActionPlan`:
```js
const actionPlan = await generateActionPlan({
  anthropicKey,
  tier,
  tierName,
  displayScores,
  weakestDimension,
  quizAnswers,  // NEW
})
```

In `generateActionPlan()`, build answer context and add to the prompt:
```js
// After the existing scores section in the prompt, add:
const answerDetails = (quizAnswers || []).map(a =>
  `- ${a.dimension}: "${a.questionText}" → They chose: "${a.selectedLabel}" (${a.points === 2 ? 'best' : a.points === 1 ? 'good' : 'weak'} answer)`
).join('\n')

// Then include in the prompt string:
// Their specific answers:
// ${answerDetails}
```

#### 4. Test
- Complete the quiz, enter test email
- Check Firestore `leads` collection — `quizAnswers` should be in the document (it's already saved by `saveLead()` in Results.jsx line 188: `quizAnswers: { ...answers }`)
- Check received email — action plan should reference specific answer choices

### Important
- Do NOT change the prompt wording beyond adding the answer context — Brian will define the final prompt later
- Keep existing scoring/tier display logic unchanged
- quizAnswers in Firestore already stores `{ questionId: optionId }` format — the enriched version (with labels) is only needed for the API call
