# Meta Ads Launch Plan — HC Quiz Funnel

*Created: March 24, 2026*
*Status: Pre-launch (pending Round 2 creative approval + tracking confirmation)*

---

## Campaign Parameters

| Parameter | Value |
|-----------|-------|
| **Daily budget** | $150/day ($50/day per ad set) |
| **Creatives** | 3 (C1 Polite Pass, C2 Room You Can't Read, C4 Built From Other Side) |
| **Formats per creative** | 2 (Feed 4:5, Story 9:16) — 6 total assets |
| **Optimization event** | CompleteRegistration (quiz completion) |
| **Real success metric** | Email capture + waitlist opt-in (read manually, not optimized against) |
| **Pixel ID** | 1407883507304464 |
| **Destination** | quiz.humbleconviction.com |
| **Pulse check budget** | ~$2,100 (14 days × $150/day) |

---

## Test Objective

Binary go/no-go: is there non-zero purchase intent for the HC product? We are NOT optimizing unit economics in this phase. We are answering: does anyone care enough to take the quiz AND give us their email?

**Go signal:** Email captures exist after 75+ quiz completions. Rate doesn't matter yet — any pulse is a pulse.
**No-go signal:** 75+ quiz completions, zero or near-zero email captures. Pause and diagnose.

---

## Timeline & Decision Points

### Days 1-2: Plumbing Check
Confirm only:
1. Budget is being spent (not stuck in "review" or "limited delivery")
2. Impressions are being served
3. CTR is non-zero

If any are broken → setup problem, fix immediately.

### Days 1-7: Learning Phase (LOCKDOWN)
Meta's algorithm is exploring audience/placement/timing combinations. During this window:
- CPAs will be erratic — this is not signal
- Do NOT make changes (budget, audience, bid, creative edits)
- Every significant change resets the learning phase clock
- ~50 optimization events/week per ad set needed to exit learning phase
- At $50/day per ad set, we should hit this threshold

### Days 7-10: First Performance Read
Compare by creative:
- CPC (cost per click)
- Quiz start rate (click → quiz start)
- Quiz completion rate (quiz start → CompleteRegistration)
- Cost per quiz completion

If one creative is clearly dead (zero completions with decent spend), consider killing and reallocating.

### Day 14: Pulse Check ← THE DECISION POINT
By now we should have:
- ~75+ quiz completions total
- Enough email captures to read a conversion rate
- Directional signal on waitlist opt-in

**Decision framework:**
- Email capture rate 30%+ of quiz completions → strong pulse, keep running, start optimizing
- Email capture rate 10-30% → weak but real pulse, diagnose the email gate / value prop
- Email capture rate <10% with 75+ completions → something is broken, pause and diagnose
- Zero email captures → no pulse at this funnel configuration, full diagnostic needed

### Days 14-30: Optimization (if pulse exists)
- Kill underperforming creatives, reallocate budget to winners
- Consider shifting optimization event from CompleteRegistration → Lead (email capture) if volume supports it (~50 Lead events/week)
- Test audience refinements
- Evaluate CPA trajectory — is it improving as algorithm learns?

---

## Funnel Tracking Events (What Meta Sees)

| Funnel Step | Meta Pixel Event | Where It Fires |
|-------------|-----------------|----------------|
| Landing page load | PageView | index.html (auto) |
| Landing page + quiz start | ViewContent | Landing.jsx, Quiz.jsx (question 0) |
| Quiz completion | CompleteRegistration | Quiz.jsx (final question) |
| Email capture | Lead (with tier name) | Results.jsx |

## GA4 Tracking (What We See Independently)

| Event | Params |
|-------|--------|
| page_view | auto |
| quiz_start | — |
| quiz_progress | question_number |
| quiz_complete | — |
| email_capture_view | — |
| email_capture_submit | tier |

**Note:** GA4 requires `VITE_GA_MEASUREMENT_ID` to be set in Vercel env vars. As of March 24, this is NOT configured — GA4 is dead code until the measurement ID is added.

---

## Phase 2 Strategy (After Pulse Confirmed)

Once we have a confirmed pulse and 2-3 weeks of optimized data:

1. **Shift optimization event** from CompleteRegistration to Lead (if weekly Lead volume supports ~50 events/week)
2. **Creative iteration** — new hooks, new images, test variations of winning concepts
3. **Budget scaling** — increase daily budget on winners (gradually, 20% increments to avoid re-entering learning phase)
4. **Retargeting** — C4 (authority/social proof) was designed for retargeting. Set up custom audience of quiz starters who didn't complete or didn't submit email.
5. **Record Eddy course** — Brian records the async course once purchase intent is validated

---

## Pre-Launch Checklist

- [ ] Round 2 creatives approved (3 changes: C1 line 2, C2 overlay, C4 CTA)
- [ ] Meta Pixel domain verification confirmed for quiz.humbleconviction.com
- [ ] Meta Pixel test (Chrome extension) — all 4 events firing
- [ ] GA4 VITE_GA_MEASUREMENT_ID set in Vercel
- [ ] LAUNCH_STATUS=pre_launch set in Vercel
- [ ] Meta Ads Manager campaign structure created
- [ ] Payment method added
- [ ] Creatives uploaded to Ads Manager with correct primary text, headlines, CTAs
- [ ] Brian reviews campaign setup before go-live
