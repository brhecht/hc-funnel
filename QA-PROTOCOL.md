# QA Testing Protocol — HC Funnel
*Created: March 20, 2026*

Target launch: Tuesday March 24, 2026. Monday is for testing + fixes.

## Pre-Test Checklist (before any testing)

- [ ] All code changes pushed to main (auto-deploys to Vercel)
- [ ] Verify https://quiz.humbleconviction.com loads (not just hc-funnel.vercel.app)
- [ ] Meta Pixel Helper Chrome extension installed
- [ ] Have access to: Resend dashboard, Kit dashboard, Firebase console, Vercel logs
- [ ] Brian's final prompt + intro are in `api/action-plan.js` (replacing placeholder)

## Test 1: Full Happy Path (Desktop)

**Who:** Nico
**Device:** Desktop browser (Chrome)
**Steps:**

1. Open https://quiz.humbleconviction.com in incognito
2. Verify landing page loads — headline, subheadline, social proof, CTA button visible
3. Click "See What Investors See"
4. Answer all 8 questions (note: use different answer combos for each test run)
5. Verify "Calculating your results..." pause screen appears (~2.5 seconds)
6. Verify results page: tier badge, scorecard with 4 dimensions, dot scores
7. Verify email gate: headline, subline, email input, "Get My Action Plan" button, waitlist checkbox
8. Enter a TEST email (use alias like nico+test1@...) + check waitlist box
9. Click "Get My Action Plan"
10. Verify confirmation banner: checkmark + "Your action plan is on the way" + "You're on the early access list"
11. Verify authority block: Brian's name, credentials, both YouTube embeds load
12. Check test email inbox — action plan email should arrive within 1-2 minutes

**Pass criteria:** All steps work, email arrives with personalized content matching quiz answers.

## Test 2: Full Happy Path (Mobile)

**Who:** Nico
**Device:** Phone (Safari or Chrome mobile)
**Steps:** Same as Test 1 but on phone.

**Extra checks:**
- [ ] CTA button is above the fold on landing page
- [ ] Quiz cards are readable without horizontal scroll
- [ ] Email input + button stack vertically (not side by side)
- [ ] Waitlist checkbox is tappable (5x5 target)
- [ ] YouTube embeds render and play

## Test 3: Email Content Validation

**Who:** Brian
**Steps:**

1. Complete quiz with LOW scores (pick worst answers) → should get "Lost in the Noise" tier
2. Check email: is the action plan relevant to weak scores? Does tone feel right?
3. Complete quiz with MID scores → "The Pieces Are There"
4. Check email: different content? Relevant to mid-range gaps?
5. Complete quiz with HIGH scores → "So Close It Hurts"
6. Check email: appropriately advanced advice?

**Check in each email:**
- [ ] Subject line includes tier name
- [ ] From: Humble Conviction (results@humbleconviction.com)
- [ ] HTML renders correctly (no broken formatting)
- [ ] Action plan references the actual weak dimensions
- [ ] Action plan references individual answer patterns (not just aggregated scores)
- [ ] Motivating closing sentence present
- [ ] YouTube link in footer works
- [ ] No placeholder text (no "TODO", no "undefined", no "?/5")

## Test 4: Meta Pixel Verification

**Who:** Nico
**Tool:** Meta Pixel Helper (Chrome extension)

1. Open quiz.humbleconviction.com with Pixel Helper active
2. Verify `PageView` fires on landing page
3. Navigate to /quiz — verify `ViewContent` fires
4. Complete quiz — verify `QuizComplete` fires (custom event)
5. Navigate to /results — verify `ViewContent` fires
6. Submit email — verify `Lead` fires with parameters (tier, score)

**Also check:** Meta Events Manager → Test Events tab shows all events arriving.

## Test 5: Data Pipeline Verification

**Who:** Nico
**Steps:**

1. Complete a full quiz with test email
2. Check Firebase console (eddy-tracker-82486 → Firestore → `leads` collection):
   - [ ] New document exists with correct email
   - [ ] `quizAnswers` object has all 8 answers
   - [ ] `rawTotal`, `displayScores`, `tier`, `tierName` present
   - [ ] `waitlist` field matches checkbox state
   - [ ] `createdAt` timestamp is correct
   - [ ] UTM params captured (if present in URL)
3. Check Kit dashboard:
   - [ ] Subscriber exists with correct email
   - [ ] Tag: `quiz-lead` applied
   - [ ] Custom fields populated: tier, friction_area, waitlist
4. Check Resend dashboard:
   - [ ] Email appears in logs
   - [ ] Status: delivered (not bounced)
   - [ ] From/subject correct

## Test 6: Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| Submit empty email | Form validation prevents submit |
| Submit invalid email (no @) | Browser validation prevents submit |
| Submit same email twice | Should work (duplicate lead in Firestore, Kit deduplicates) |
| Refresh results page after capture | Should still show confirmation (emailCaptured state) |
| Go directly to /results without quiz | Empty scores, no crash (graceful degradation) |
| Late waitlist join (button on confirmation) | Firestore updates, Kit re-subscribes with waitlist flag |
| Slow internet / Claude API timeout | Email should still save to Firestore + Kit even if action plan fails |

## Test 7: Ad Simulation (Pre-Launch)

**Who:** Brian + Nico
**Purpose:** Simulate the ad → quiz flow without spending money.

1. Open each ad creative image side-by-side with the landing page
2. Verify visual continuity: colors match (navy/coral), tone matches
3. Click the quiz URL from ad copy — does it land correctly?
4. Add UTM params manually: `?utm_source=meta&utm_medium=paid&utm_campaign=pitch-quiz-v1&utm_content=concept1`
5. Complete quiz → verify UTMs appear in Firestore lead document

## Bug Reporting Format

When you find something, Slack it with:
```
BUG: [short description]
Steps: [what you did]
Expected: [what should happen]
Actual: [what happened]
Device: [desktop/mobile, browser]
Screenshot: [if applicable]
```

## Sign-Off

Both Brian and Nico must confirm before launch:
- [ ] **Nico:** All 7 tests pass, no blocking bugs
- [ ] **Brian:** Email content quality approved (Test 3), ad creatives approved
- [ ] **Both:** One full end-to-end run together on Monday

Launch: Tuesday March 24, morning.
