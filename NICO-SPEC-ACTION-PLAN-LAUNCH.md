# Nico Spec: Action Plan Pipeline + Ad Launch
*Created: March 20, 2026*
*From: Brian (via Cowork)*
*Status: No blockers from Brian. Everything here is ready for you to execute.*

---

## What This Document Covers

Everything you need to finish and launch the HC Funnel marketing pipeline. Two workstreams:

1. **Action Plan Email Pipeline** — wire the finalized prompt into the endpoint, pass quiz answers from the frontend, build the proper HTML email template
2. **Ad Launch Prep** — Meta Pixel, ad creative production, final URL updates

The autoresponder drip emails (Kit nurture sequence after the action plan) are **out of scope for launch**. We'll manually add quiz leads to the newsletter. Kit just needs to capture them with the `quiz-lead` tag and custom fields, which is already working.

---

## WORKSTREAM 1: Action Plan Email Pipeline

This is the main build. The scaffold is deployed (`api/action-plan.js`) but it's using a placeholder prompt and basic HTML wrapper. The finalized prompt and email design spec are in `ACTION-PLAN-PROMPT.md` (read the whole file — it's the source of truth).

### Task 1.1: Pass `quizAnswers` from Frontend → Endpoint

**Why:** The prompt references `{quizAnswers}` — the specific option IDs and labels the user chose. This is the single highest-leverage personalization feature. It lets Claude say things like "You mentioned you'd lead with your background — here's why that instinct works against you" instead of generic dimension advice.

**What to change:**

**`src/pages/Results.jsx`** — in `handleEmailCaptured()`, the `requestActionPlan()` call (line ~200) currently passes:
```js
requestActionPlan(email, {
  tier: tier.id,
  tierName: tier.name,
  displayScores: { ...displayScores },
  weakestDimension: weakest?.[0] || "",
})
```

Needs to also pass:
- `quizAnswers` — the full answers object mapped to include both the option ID AND the label text (so Claude gets human-readable context, not just "q1_clarity: b")
- `waitlistStatus` — whether they checked the waitlist box ("on_waitlist" or "not_on_waitlist")
- `scorecardCopy` — the exact explanation + cracked door text shown for each dimension at their score level (so Claude can avoid repeating it)
- `secondWeakest` + `secondWeakestScore` — second-lowest dimension
- `strongestDimension` + `strongestScore` — highest dimension

Here's how to build the enriched payload. The `answers` object from `useFunnel()` stores `{ questionId: optionId }`. You need to map this to include labels:

```js
// Build quizAnswers with labels for Claude
const quizAnswersWithLabels = {}
for (const q of config.quiz.questions) {
  const selectedId = answers[q.id]
  if (!selectedId) continue
  const option = q.options.find(o => o.id === selectedId)
  quizAnswersWithLabels[q.id] = {
    optionId: selectedId,
    label: option?.label || "",
    dimension: q.dimension,
    question: q.text,
  }
}

// Sort dimensions by score to get weakest, second weakest, strongest
const dimEntries = Object.entries(displayScores)
const sorted = [...dimEntries].sort((a, b) => a[1] - b[1])
const weakest = sorted[0]
const secondWeakest = sorted[1]
const strongest = sorted[sorted.length - 1]

// Build scorecard copy so Claude knows what NOT to repeat
const scorecardCopy = {}
for (const [dimKey, score] of Object.entries(displayScores)) {
  const dimConfig = config.dimensions[dimKey]
  const level = dimConfig.levels[score]
  if (level) {
    scorecardCopy[dimConfig.label] = {
      score: `${score}/5`,
      explanation: level.explanation,
      crackedDoor: level.crackedDoor,
    }
  }
}

requestActionPlan(email, {
  tier: tier.id,
  tierName: tier.name,
  displayScores: { ...displayScores },
  weakestDimension: weakest?.[0] || "",
  weakestScore: weakest?.[1] || 0,
  secondWeakest: secondWeakest?.[0] || "",
  secondWeakestScore: secondWeakest?.[1] || 0,
  strongestDimension: strongest?.[0] || "",
  strongestScore: strongest?.[1] || 0,
  quizAnswers: quizAnswersWithLabels,
  waitlistStatus: joinWaitlist ? "on_waitlist" : "not_on_waitlist",
  scorecardCopy,
})
```

**`src/firebase.js`** — update `requestActionPlan()` to pass through all the new fields:

```js
export async function requestActionPlan(email, quizData = {}) {
  try {
    await fetch("/api/action-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        tier: quizData.tier || "",
        tierName: quizData.tierName || "",
        displayScores: quizData.displayScores || {},
        weakestDimension: quizData.weakestDimension || "",
        weakestScore: quizData.weakestScore || 0,
        secondWeakest: quizData.secondWeakest || "",
        secondWeakestScore: quizData.secondWeakestScore || 0,
        strongestDimension: quizData.strongestDimension || "",
        strongestScore: quizData.strongestScore || 0,
        quizAnswers: quizData.quizAnswers || {},
        waitlistStatus: quizData.waitlistStatus || "not_on_waitlist",
        scorecardCopy: quizData.scorecardCopy || {},
      }),
    })
  } catch (err) {
    console.error("Action plan request failed:", err)
  }
}
```

---

### Task 1.2: Wire the Finalized Prompt into `api/action-plan.js`

**Source of truth:** `ACTION-PLAN-PROMPT.md` — the full prompt is in the "## The Prompt" section (inside the code fence). Read the entire file including the "What NOT to do" rules, voice guidelines, and dimension-to-course mapping.

**What to change in `api/action-plan.js`:**

1. **Destructure the new fields** from `req.body`:

```js
const {
  email, tier, tierName, displayScores,
  weakestDimension, weakestScore,
  secondWeakest, secondWeakestScore,
  strongestDimension, strongestScore,
  quizAnswers, waitlistStatus, scorecardCopy,
} = req.body || {}
```

2. **Replace the placeholder prompt** in `generateActionPlan()` with the full prompt from `ACTION-PLAN-PROMPT.md`. All the `{variables}` in the prompt template map to the fields above. Inject them via template literals.

3. **Add `LAUNCH_STATUS` env var** to Vercel: set to `pre_launch` for now. The prompt uses `{launchStatus}` to determine the P.S. copy (pre-launch = "reply 'interested'" vs post-launch = course link).

4. **Increase `max_tokens`** from 1024 to 2048. The prompt targets 500-700 words of output plus section markers — 1024 tokens may truncate.

5. **Update the model string** if needed. Currently `claude-sonnet-4-20250514`. Use the latest Sonnet available — `claude-sonnet-4-6` (model string: `claude-sonnet-4-6-20250514`) or check Anthropic's docs for the current recommended Sonnet model.

6. **Add the `system` parameter** to the Claude API call. The prompt works better as a system message (sets the persona) with the user message containing only the quiz data. Structure:

```js
body: JSON.stringify({
  model: "claude-sonnet-4-6-20250514",
  max_tokens: 2048,
  system: SYSTEM_PROMPT,  // The full prompt from ACTION-PLAN-PROMPT.md
  messages: [{ role: "user", content: userDataPayload }],
})
```

Where `userDataPayload` is a structured string with all the quiz data (scores, answers, scorecard copy, waitlist status).

---

### Task 1.3: Build the Proper HTML Email Template

**Source of truth:** The "## Email Design Spec" section at the bottom of `ACTION-PLAN-PROMPT.md`.

The current `buildEmailHtml()` is a basic wrapper. It needs to be rebuilt to match the spec. Key elements:

**Header:**
- Brian's headshot: 60px circular photo, left-aligned. Host the image on Vercel (put in `/public/` or use a CDN URL). Resend will inline it.
- Next to headshot: "Brian Hecht" in bold 15px, "Humble Conviction" in 13px muted (#5A6578)
- Thin horizontal rule below (1px, #E5E7EB)

**Section formatting (Claude's output uses section markers):**
Parse Claude's response by section markers: `[INTRO]`, `[HOLISTIC]`, `[WEAKEST]`, `[SECOND]`, `[STRENGTH]`, `[FOURTH]`, `[CLOSING]`, `[PS]`.

- `[INTRO]`: **HARDCODED — do not use Claude's output for this.** The intro is the same for everyone:

> *"I'm Brian Hecht — venture investor, 4x exited founder, and the person behind the assessment you just took. I've always been passionate about helping founders tell their story, and nothing gives me more satisfaction than when focused coaching helps a founder get funded and take the next step toward building something great."*

Style: 14px italic, color #5A6578 (muted).

- `[HOLISTIC]`: Regular body text. No header. 15px, #1A2332, line-height 1.7.

- `[WEAKEST]`, `[SECOND]`, `[STRENGTH]`: Dimension name as bold 16px header, color #1A2332. Thin horizontal rule above each section header (1px, #E5E7EB).

- **Contrast closers** (the italic two-liners like *"Founders who struggle..."* / *"Founders who get funded..."*): 14px italic, color #5A6578, left border 3px solid #E8845A (coral), padding-left 16px. These appear at the end of [WEAKEST] and [SECOND].

- `[FOURTH]`: Same as body text, brief.

- `[CLOSING]`: Regular body text.

- `[PS]`: 14px, color #5A6578, preceded by thin horizontal rule.

- **Sign-off "— Brian"**: Regular text, no special formatting.

**Footer:**
- HC logo (small, centered), 40px height. Need to host this image.
- "Humble Conviction" text below logo, 12px muted
- Unsubscribe link: 11px, color #9CA3AF. For now, link to `mailto:results@humbleconviction.com?subject=Unsubscribe` until a proper unsubscribe mechanism is built.

### Fixed Copy Elements (hardcoded in the HTML template, NOT generated by Claude)

**Subject line:** `Your personalized pitch action plan is ready`

**From:** `Brian Hecht <results@humbleconviction.com>`

**Intro paragraph** (renders in 14px italic, muted #5A6578 — same for every recipient):

> I'm Brian Hecht — venture investor, 4x exited founder, and the person behind the assessment you just took. I've always been passionate about helping founders tell their story, and nothing gives me more satisfaction than when focused coaching helps a founder get funded and take the next step toward building something great.

**P.S. copy** (3 variants — select based on `waitlistStatus` and `LAUNCH_STATUS` env var):

- If `waitlistStatus === "on_waitlist"`: "P.S. — You're on the early access list for the course. I'll let you know as soon as it opens."
- If `waitlistStatus === "not_on_waitlist"` AND `LAUNCH_STATUS === "pre_launch"`: "P.S. — I'm building a course around exactly what your scorecard revealed. Reply 'interested' if you want early access when it launches."
- If `LAUNCH_STATUS === "post_launch"`: "P.S. — Everything in this action plan is covered in depth in Pitch Better, Get Funded Faster. [Link]"

**Note on the P.S.:** The prompt also asks Claude to generate a P.S. You have two options: (a) hardcode the P.S. in the template using the logic above and tell Claude NOT to generate one, or (b) let Claude generate it per the prompt instructions and strip your hardcoded version. Option (a) is safer — less variance, guaranteed correct copy. If you go with (a), add to the prompt: "Do NOT generate a [PS] section — it is hardcoded in the template."

**Sign-off:** `— Brian` (rendered as regular body text at the end of [CLOSING])

**What it should NOT look like:**
- No banner images
- No CTA buttons (the Eddy nudges are text, not buttons)
- No social media icons
- No multi-column layouts
- No colored backgrounds or gradient sections
- Should look like a well-formatted personal email, not a marketing blast

**Parsing approach:** Tell Claude in the prompt to output its response with `[SECTION_NAME]` markers. Then in `buildEmailHtml()`, split on those markers and wrap each section in the appropriate HTML. Example:

```js
function buildEmailHtml({ tierName, actionPlan, headshot }) {
  // Parse sections from Claude's output
  const sections = parseActionPlanSections(actionPlan)

  // Build HTML with proper formatting per section
  return `<!DOCTYPE html>...
    ${renderIntro()}           // Hardcoded intro text
    ${renderHolistic(sections.holistic)}
    ${renderDimensionSection(sections.weakest, "weakest")}
    ${renderDimensionSection(sections.second, "second")}
    ${renderStrength(sections.strength)}
    ${sections.fourth ? renderFourth(sections.fourth) : ""}
    ${renderClosing(sections.closing)}
    ${renderPS(sections.ps)}
    ${renderFooter()}
  ...`
}
```

**Brian's headshot:** Scaffold without it for now — use a placeholder or omit the image. We'll add the real headshot as a final update after auditing the full live pipeline end-to-end. Don't let this block you.

---

### Task 1.4: End-to-End Testing

After wiring everything:

1. Take the quiz yourself using a test email
2. Check that the Resend email arrives within ~30 seconds
3. Verify the HTML renders correctly in:
   - Gmail (web + mobile)
   - Apple Mail
   - Outlook (web)
4. Check that the action plan content:
   - References specific quiz answers (not just scores)
   - Doesn't repeat scorecard copy
   - Has all sections ([HOLISTIC] through [PS])
   - Contrast closers are formatted with coral left border
   - Intro is the hardcoded text, not AI-generated
5. Check the subject line: "Your personalized pitch action plan is ready"
6. Check From: "Brian Hecht <results@humbleconviction.com>"
7. Test all 3 tiers if possible (manipulate answers to hit different thresholds)

**Send Brian a screenshot of the email** for each tier before launch.

---

## WORKSTREAM 2: Ad Launch Prep

Target: week of March 23.

### Task 2.1: Meta Pixel Installation

**Phase 1 (launch):** Install the Meta Pixel on quiz.humbleconviction.com. Fire these events:
- `PageView` on landing page load
- `ViewContent` or custom `QuizComplete` event when user finishes the quiz (hits Results page)
- `Lead` event on email capture

Optimize the ad set for `QuizComplete` (not `Lead`) initially. Higher volume → exits learning phase faster (need ~50 events/week). After 2-3 weeks with stable data, shift optimization to `Lead`.

**Implementation:** Add the Meta Pixel base code to `index.html`. Fire custom events from React:
- `QuizComplete` → fire in Results.jsx when `showResults` becomes true (after the calculating pause)
- `Lead` → fire in `handleEmailCaptured()` after successful save

### Task 2.2: URL Update in All Ad Copy

All ad copy should point to `quiz.humbleconviction.com` (not `hc-funnel.vercel.app`). This is already live and working.

### Task 2.3: Ad Creative Production

**Source of truth for ad copy:** The HANDOFF.md "Recent Changes (March 19)" section has all the final copy updates. Key changes since the revised creative brief:
- "coached"/"reviewed" → **"analyzed"** everywhere (ads, landing page, post-capture authority section — already deployed on the site)
- All 3 headlines shortened for Instagram's 40-char limit:
  - C1: "What Investors See (But Won't Say)" (34 chars)
  - C2: "Do You Misread Investor Signals?" (32 chars)
  - C4: "See What Investors Really See" (28 chars)
- Concept 1 primary text: "Probably more than once." moved below the 125-char gate
- Concept 2 overlay text: **"He thinks the pitch is going well. / The investor tuned out five minutes ago."** (replaces "The investors already decided.")
- Concept 2 image: Brian sent you the new image (founder facing VC in Patagonia vest)
- Concept 4 overlay: "2,500+" (with plus sign) for consistency

**Production tasks:**
1. Re-template all 3 concepts in HC colors (navy #1A2332 / coral #E8845A / cool-white #F8F9FC). Replace AdCreative.ai blue template. See "Visual Continuity Spec" in `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` for details.
2. Apply text overlay to new Concept 2 image with the updated text
3. Create Feed (4:5) versions of Concepts 1 and 2 (Story 9:16 versions exist)
4. Concept 4: Story + Feed versions exist; just needs HC color re-template

### Task 2.4: Meta Ads Manager Setup

Brian will need to do some setup in the Meta Ads Manager (business account, payment method, etc.). You were going to write him instructions for what he needs to do in Facebook Business Manager. Please send those.

**Campaign structure (for when you set up the campaigns):**
- Concept 1 + Concept 2: cold audience targeting
- Concept 4: retargeting (people who saw C1/C2 but didn't click)
- All 3 run simultaneously, identical budget per cold concept
- Hook rate target: 30-40%. Hold rate: 25%+.
- Pre-commit: replace image for any concept below 25% hook rate after 1,000 impressions

---

## NOT IN SCOPE FOR LAUNCH

- **Kit nurture drip (Emails 2-5)** — postponed. No course to sell yet. Quiz leads get added to newsletter manually.
- **Kit tier-based automations** — postponed (was N5). Kit just captures with `quiz-lead` tag and custom fields. Already working.
- **Autoresponder email copy** — postponed. Drafts exist in `research/autoresponder-email-audit-march-2026.md` for future use.
- **Firebase console access for Nico** — nice-to-have for debugging, not a launch blocker. Brian can grant later.

---

## Environment Variables Checklist (Vercel)

Already configured:
- [x] `ANTHROPIC_API_KEY`
- [x] `RESEND_API_KEY`
- [x] `RESEND_FROM_EMAIL` (results@humbleconviction.com)
- [x] `KIT_API_KEY`
- [x] `KIT_FORM_ID`
- [x] `KIT_TAG_QUIZ_LEAD`

Needs to be added:
- [ ] `LAUNCH_STATUS` — set to `pre_launch` (controls the P.S. copy in the action plan email)

---

## Key Files Reference

| File | What It Is |
|------|-----------|
| `ACTION-PLAN-PROMPT.md` | **READ THIS FIRST.** Full prompt template + email design spec + voice rules + what-not-to-do |
| `api/action-plan.js` | Endpoint scaffold — needs prompt swap + new fields + HTML template rebuild |
| `src/pages/Results.jsx` | Frontend — needs enriched payload in `handleEmailCaptured()` |
| `src/firebase.js` | `requestActionPlan()` — needs to pass through new fields |
| `src/config/funnel.js` | All quiz content, scoring, dimension copy. Source for `scorecardCopy` and `quizAnswers` label mapping |
| `src/context/FunnelContext.jsx` | Scoring engine. `calculateResults()` returns rawDimensions, rawTotal, displayScores, tier |
| `ads/REVISED-CREATIVE-BRIEF-2026-03-18.md` | Ad creative brief with visual continuity spec (some copy details superseded by March 19 updates in HANDOFF.md) |
| `research/action-plan-expert-review-march-2026.md` | Expert review of the prompt — context on design decisions |
| `research/ad-copy-final-review-march-2026.md` | Final ad copy coherence + Meta compliance check |

---

## Questions? Blockers?

If anything is unclear, ping Brian in Slack. The goal is ad launch the week of March 23. The action plan pipeline is the critical path — get that tested and confirmed first, then finalize ad creatives.

No blockers from Brian. Everything in this doc is ready for you to execute.
