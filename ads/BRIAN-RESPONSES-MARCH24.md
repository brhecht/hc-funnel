# Respuestas a Brian — Pre-Launch Sync (March 24, 2026)

*Extracted from the March 24 "Eddy test pre release" call. Non-funnel topics (podcast, strategy session, ERA) omitted.*

---

## 1. TYPOGRAPHY — "The type is a little squished"

Brian said: *"Everything is perfect with the image and the positioning. Great job. Colors adjustment. Great job. A little bit about the type. It's a little squished which makes me think that there's too many words."*

### Diagnosis

After reviewing all 6 reference comps, the squished text issue is concentrated in **Concept 2**. Here's why:

| Concept | Line 2 (bold/payoff) | Characters | Font Size (V3 spec) | Verdict |
|---------|---------------------|------------|---------------------|---------|
| C1 | "— every investor" | 16 chars | 54px Bold | Clean ✅ |
| C2 | "The investor tuned out five minutes ago." | 40 chars | 46px Bold | **Squished** ⚠️ |
| C4 | "See what investors see." | 23 chars | 52px Bold | Clean ✅ |

C2's payoff line is **2.5x longer** than C1's and almost **2x longer** than C4's. The V3 brief already dropped it to 46px (vs 52-54px for the others), but 40 characters at Bold weight on 960px usable width (1080px - 120px margins) is tight. It fills the entire line, leaving no breathing room.

### Fix Options (for Brian's Claude conversation)

**Option A — Shorten "five minutes" to "5 minutes" (minimal change):**
```
The investor tuned out 5 minutes ago.
```
Saves 2 chars (38 vs 40). Marginal improvement but numbers read faster in ads.

**Option B — Tighten the verb (recommended):**
```
The investor checked out 5 minutes ago.
```
37 chars. "Checked out" is slightly more colloquial but saves 3 chars and lets the font go up to 48px.

**Option C — Radical shorten (if Brian wants maximum breathing room):**
```
The investor stopped listening.
```
31 chars. Can use 52px Bold (same as C4). Loses the "five minutes ago" specificity but gains visual impact.

**Option D — Keep the text, fix the layout:**
Break into 3 lines instead of 2, with line 1 as a medium-weight setup:
```
He thinks the pitch
is going well.
The investor tuned out
five minutes ago.
```
This requires rethinking the overlay hierarchy but keeps every word.

### My recommendation
**Option B** balances copy strength with typography. "Checked out" is visceral — it means the same thing but is 3 chars shorter, letting the font breathe. If Brian wants to keep the exact wording, **Option A** (just the numeral swap) is the smallest change that helps.

C1 and C4 need zero changes — their typography is clean.

---

## 2. BUDGET — "$50 a day? Or $100?"

Brian said: *"My gut, from what I've learned, is that $50 a day is good. But if $100 a day gets us data faster, I'll do it. Ask Claude about that."*

### Recommendation: $50/day cold, $15/day retarget = $65/day total

Here's the math:

**At $50/day (cold campaign — C1 + C2):**
- CPM for startup/founder interests in US: ~$15-25
- ≈ 2,000-3,300 impressions/day
- At 1% CTR = 20-33 link clicks/day
- At 60% quiz start rate = 12-20 ViewContent events/day
- **= 84-140 ViewContent events/week**
- Meta needs ~50 events/week to exit learning phase → **$50/day clears that comfortably** ✅

**At $100/day:**
- Double the impressions and clicks
- Exits learning phase marginally faster (maybe 1-2 days sooner)
- But you'd burn **$700 in the first week** during learning phase when data quality is WORST
- The extra spend buys mostly low-quality impressions while Meta is still figuring out who to show ads to

**Why $50 is better than $100 for a test:**
The goal of Week 1 is data, not volume. $50/day gives Meta enough signal to exit learning phase within 5-7 days. $100/day gets there ~1 day faster but wastes ~$350 on poor-quality learning-phase impressions. Save that money for scaling AFTER you find a winner.

**Why $50 is better than $30 (my original recommendation):**
At $30/day, you'd get ~50-85 ViewContent events/week — borderline for learning phase exit. Brian's gut was right. $50 gives clear headroom.

**Retargeting ($15/day):**
Starts 3-5 days after cold campaign launches (needs audience to build). Small budget because the retarget pool will be small at first. Will auto-scale as cold campaign drives more visitors.

### Weekly spend summary

| Week | Cold | Retarget | Total |
|------|------|----------|-------|
| Week 1 (days 1-5) | $50/day | $0 | $250 |
| Week 1 (days 6-7) | $50/day | $15/day | $130 |
| Week 2+ | $50/day | $15/day | $455/week |

**First 2 weeks total: ~$835.** That buys enough data to know if the concepts work.

---

## 3. CAMPAIGN STRUCTURE — "One campaign with three creatives?"

Brian asked: *"One campaign with three creatives, right?"*

### Answer: 2 campaigns, not 1. Here's why.

**Campaign 1: Cold Traffic (C1 + C2)** — $50/day
- 2 ad sets (one per concept), identical audience targeting
- Meta's CBO (Campaign Budget Optimization) auto-allocates budget to whichever concept performs better
- This is the A/B test — same audience, different hooks

**Campaign 2: Retargeting (C4 only)** — $15/day
- Targets people who SAW Concepts 1 or 2, visited the landing page, but didn't complete the quiz
- Different audience = needs its own campaign with its own budget
- If this were in the same campaign as cold traffic, Meta might dump all the budget into retargeting (smaller audience, higher CTR) and starve the cold campaigns of spend

**Why this matters:**
Mixing cold and retargeting in one campaign is the #1 beginner mistake on Meta Ads. Retargeting always looks "better" (warm audience = cheaper clicks) so Meta's algorithm will over-allocate to it, leaving the cold audience — which is where all NEW leads come from — underfunded.

### Visual summary
```
Campaign 1: Cold ($50/day)
├── Ad Set: C1 "Polite Pass" (Feed + Story)
└── Ad Set: C2 "Room Can't Read" (Feed + Story)

Campaign 2: Retarget ($15/day) — launches day 5
└── Ad Set: C4 "Authority" (Feed + Story)
```

---

## 4. TIMELINE — Launch plan

Brian said: *"Set it up today, get the credit card and everything. And then give you a birthday gift tomorrow. Hit go."*

### Today (March 24) — Setup

| # | Task | Who | Status |
|---|------|-----|--------|
| 1 | Brian fixes typography on C2 (gives Nico instructions) | Brian | Pending — Brian running through Claude |
| 2 | Nico applies typography fix in Canva | Nico | Blocked on #1 |
| 3 | Export final 6 PNGs from Canva | Nico | After #2 |
| 4 | Create Custom Audiences in Meta (ViewContent, QuizComplete, Lead) | Nico | Ready to do |
| 5 | Create campaign shells in Meta Ads Manager (campaigns + ad sets, no ads yet) | Nico | Ready to do |
| 6 | Add payment method to Meta Business Manager | Brian | Pending |
| 7 | Verify Meta Pixel is live (deploy + Pixel Helper) | Nico | Needs git push |
| 8 | Brian adds quiz.humbleconviction.com domain in Events Manager | Brian | Pending |

### Tomorrow (March 25) — Launch 🎂

| # | Task | Who |
|---|------|-----|
| 9 | Upload 6 final creatives to ad shells | Nico |
| 10 | Final review — Brian eyeballs everything in Ads Manager | Brian |
| 11 | Hit "Publish" | Brian or Nico |
| 12 | Verify delivery starts (check Ads Manager within 1 hour) | Nico |
| 13 | Verify Pixel events firing on live traffic | Nico |

---

## 5. EXPECTATIONS — What Brian already knows (confirmed)

Brian said: *"Facebook and Instagram always takes up to a week to start delivering relevant results. It's gonna look terrible at first. We'll get like a tiny number of clicks and one quiz or whatever. Don't be disappointed."*

**This is 100% correct.** The learning phase typically lasts 5-7 days. During this time:
- CPA will be 2-3x higher than it'll be after learning phase exits
- Impressions will be inconsistent (Meta is testing different audience segments)
- DON'T touch budgets, targeting, or creatives during this period — any edit resets the learning phase

**Week 1 realistic expectations at $50/day:**
- 2,000-3,000 impressions/day
- 15-30 link clicks/day
- 8-15 quiz starts/day
- 3-8 quiz completions/day
- 1-4 email captures/day

**When to evaluate (not before):**
- After 1,000 impressions per concept → check hook rate (target: 30%+)
- After 7 full days → first real performance read
- After 50+ ViewContent events → switch optimization to Lead event

---

## 6. POST-LAUNCH PLAN — "Take a week break from Eddy"

Brian said: *"I want to take a week. Take the rest of this week to take a break from Eddy before I record. I wanna get enough data to see if it's even working. Because if nobody's interested, then we have to go back to the ads again."*

### This is the right call. Here's the decision framework for Day 7:

| Signal | What it means | Action |
|--------|--------------|--------|
| Hook rate >30% on both concepts | Images and overlays are working | Keep running, plan creative refresh for week 4 |
| Hook rate >30% on one, <25% on other | One concept clearly wins | Kill loser, shift budget to winner |
| Hook rate <25% on both | Images aren't stopping thumbs | Replace images, keep copy angles (the copy is strong) |
| CTR >1.5% | Ad-to-LP relevance is strong | Focus on quiz/email capture optimization |
| CTR <0.8% | Disconnect between ad promise and LP | Check if LP headline matches ad expectation |
| Quiz completion >60% | Quiz UX is fine | No changes needed |
| Email capture >20% | Gate is working | Keep current setup |
| Email capture <15% | Gate is too generous or too weak | Tighten/loosen result preview |

**The Pancake Principle (Brian's term):** Everything after email capture is V1. The action plan email, the Kit drip sequence, the Eddy promotion — all of that gets refined AFTER we know the top of funnel works. Don't optimize the bottom before the top is proven.

---

## PENDING FROM BRIAN (to close today)

| # | Item | Notes |
|---|------|-------|
| B1 | Typography fix instructions for C2 | Brian running through his Claude conversation, then giving Nico specific changes |
| B2 | Payment method in Meta Business Manager | Credit card needs to be active before campaign can publish |
| B3 | Add quiz.humbleconviction.com in Events Manager → Settings → Domains | Required for Pixel to work properly on custom domain |
| B4 | Final eyeball approval on all 6 creatives after typography fix | Before hitting Publish tomorrow |
