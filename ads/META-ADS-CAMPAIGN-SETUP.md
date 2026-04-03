# Meta Ads Campaign Setup — Eddy / HC Funnel
*Last updated: March 24, 2026*
*Source of truth: AD-CREATIVE-BRIEF-V3-FINAL.md + FINAL-COPY-SHEET.md + Brian's launch directive (March 24)*

> **This is the step-by-step setup guide for Meta Ads Manager.** Copy-paste ready. All copy from V3 FINAL brief. Budget and structure per Brian's direction.

---

## Account Structure Overview

```
HC Meta Ads Account (ClaimFame)
└── CAMPAIGN: META_Conv_EddyQuiz_Mar26 ($150/day, CBO OFF)
    ├── AD SET: C1-Polite-Pass_Founders_Mar26 ($50/day)
    │   ├── Ad: C1_Feed_Polite-Pass (1080×1350)
    │   └── Ad: C1_Story_Polite-Pass (1080×1920)
    ├── AD SET: C2-Room-Cant-Read_Founders_Mar26 ($50/day)
    │   ├── Ad: C2_Feed_Room-Cant-Read (1080×1350)
    │   └── Ad: C2_Story_Room-Cant-Read (1080×1920)
    └── AD SET: C4-Authority_Founders_Mar26 ($50/day)
        ├── Ad: C4_Feed_Built-Other-Side (1080×1350)
        └── Ad: C4_Story_Built-Other-Side (1080×1920)
```

**Why 1 campaign with 3 equal ad sets:**
- All 3 concepts test as cold traffic with identical budget — fair head-to-head comparison
- $50/day per ad set = enough volume for each concept to exit learning phase independently (~10-15 quiz completions/day per ad set)
- CBO is OFF — each ad set gets exactly $50/day. No algorithm favoritism. We read the data, not Meta.
- C4 tests as cold first. If it underperforms on cold but shows retarget potential, we move it to a retarget campaign after Day 14.

---

## PRE-LAUNCH CHECKLIST

All infrastructure items verified March 24:

- [x] Meta Pixel `1407883507304464` live and firing on quiz.humbleconviction.com
- [x] Events active in Events Manager: PageView (17), ViewContent (10), CompleteRegistration (3), Lead (1)
- [x] humbleconviction.com domain verified in Meta Business Suite (ClaimFame account)
- [x] GA4 property active — Measurement ID `G-8XCGJ2FKPB` in Vercel + hardcoded in bundle
- [x] LP social proof copy confirmed: "Based on 2,500+ pitches analyzed"
- [x] LAUNCH_STATUS env var = `pre_launch` in Vercel — ready to flip
- [ ] 6 Canva creatives exported at full resolution PNG (pending typography fix on C2)
- [ ] Payment method active in Meta Business Manager (Brian)

---

## CAMPAIGN SETTINGS

| Setting | Value |
|---------|-------|
| **Campaign name** | `META_Conv_EddyQuiz_Mar26` |
| **Campaign objective** | Conversions (Sales) |
| **Special ad categories** | None |
| **Campaign budget optimization (CBO)** | **OFF** — budgets set at ad set level |
| **Bid strategy** | Lowest cost (no cap) |
| **A/B test** | OFF |

> **Optimization event: CompleteRegistration** (quiz completion). This is the deepest event with enough volume at $50/ad set/day. Expected ~10-15 completions/day/ad set = 70-105/week — well above Meta's 50/week learning threshold. We read email captures (Lead events) ourselves downstream.

---

## AD SET 1: Concept 1 — "The Polite Pass" (Pain Angle)

### Ad Set Settings

| Setting | Value |
|---------|-------|
| **Ad set name** | `C1-Polite-Pass_Founders_Mar26` |
| **Conversion event** | CompleteRegistration |
| **Dynamic creative** | OFF |
| **Budget** | $50/day (ad set level) |
| **Schedule** | Start date: [launch date]. No end date. |
| **Placements** | Advantage+ placements (let Meta optimize) |

### Audience Targeting

| Setting | Value |
|---------|-------|
| **Location** | United States |
| **Age** | 25–45 |
| **Gender** | All |
| **Detailed targeting** | Interests: Startup company, Entrepreneurship, Venture capital, Angel investor, Y Combinator, Techstars, Seed funding, Series A, Pitch deck, Business funding |
| **Audience expansion** | ON (Advantage detailed targeting) |
| **Exclusions** | Exclude: Custom Audience "HC Quiz Completers" + Custom Audience "HC Email Leads" |

### Ad 1: C1 Feed (4:5)

| Field | Value |
|-------|-------|
| **Ad name** | `C1_Feed_Polite-Pass` |
| **Format** | Single image |
| **Creative** | Upload: C1 Feed Canva export (1080×1350) |
| **Primary text** | *(see below)* |
| **Headline** | `What Investors See (But Won't Say)` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c1_polite_pass_feed&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

**Primary text (copy-paste):**
```
"We're going to pass for now, but please keep us updated."

You've gotten this email from an investor.

Probably more than once. Here's what they don't tell you: it's rarely the idea. It's the 2-3 things in how you pitch that make investors hesitate — patterns they see in the first 5 minutes but will never point out.

This free 3-minute assessment shows you what investors actually see when you pitch. 4 scores across the dimensions that matter. Built from 2,500+ pitches analyzed.
```

### Ad 2: C1 Story (9:16)

| Field | Value |
|-------|-------|
| **Ad name** | `C1_Story_Polite-Pass` |
| **Format** | Single image |
| **Creative** | Upload: C1 Story Canva export (1080×1920) |
| **Primary text** | *(same as C1 Feed above)* |
| **Headline** | `What Investors See (But Won't Say)` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c1_polite_pass_story&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

---

## AD SET 2: Concept 2 — "The Room You Can't Read" (Dunning-Kruger Angle)

### Ad Set Settings

| Setting | Value |
|---------|-------|
| **Ad set name** | `C2-Room-Cant-Read_Founders_Mar26` |
| **Conversion event** | CompleteRegistration |
| **Dynamic creative** | OFF |
| **Budget** | $50/day (ad set level) |
| **Schedule** | Same as Ad Set 1 |
| **Placements** | Advantage+ placements |

### Audience Targeting

**IDENTICAL to Ad Set 1.** Same interests, same age, same exclusions. Equal budget = fair head-to-head test.

### Ad 3: C2 Feed (4:5)

| Field | Value |
|-------|-------|
| **Ad name** | `C2_Feed_Room-Cant-Read` |
| **Format** | Single image |
| **Creative** | Upload: C2 Feed Canva export (1080×1350) — Brian's real photo (founder + VC in Patagonia vest) |
| **Primary text** | *(see below)* |
| **Headline** | `Do You Misread Investor Signals?` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c2_room_cant_read_feed&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

**Primary text (copy-paste):**
```
You're in a pitch meeting. The investor says "This is really interesting."

You're thinking: great sign. You're wrong.

"Interesting" means they're figuring out if they need to act now — or can wait and watch from the sideline. It's not a yes. It's not a no. It's a test most founders don't know they're taking.

The signals investors send are almost never what they seem. This free 3-minute assessment scores you on the 4 dimensions investors actually evaluate — including the ones they'll never mention.
```

### Ad 4: C2 Story (9:16)

| Field | Value |
|-------|-------|
| **Ad name** | `C2_Story_Room-Cant-Read` |
| **Format** | Single image |
| **Creative** | Upload: C2 Story Canva export (1080×1920) |
| **Primary text** | *(same as C2 Feed above)* |
| **Headline** | `Do You Misread Investor Signals?` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c2_room_cant_read_story&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

---

## AD SET 3: Concept 4 — "Built From the Other Side" (Authority Angle)

### Ad Set Settings

| Setting | Value |
|---------|-------|
| **Ad set name** | `C4-Authority_Founders_Mar26` |
| **Conversion event** | CompleteRegistration |
| **Dynamic creative** | OFF |
| **Budget** | $50/day (ad set level) |
| **Schedule** | Same as Ad Set 1 |
| **Placements** | Advantage+ placements |

### Audience Targeting

**IDENTICAL to Ad Sets 1 and 2.** All 3 concepts run against the same cold audience with equal budget.

### Ad 5: C4 Feed (4:5)

| Field | Value |
|-------|-------|
| **Ad name** | `C4_Feed_Built-Other-Side` |
| **Format** | Single image |
| **Creative** | Upload: C4 Feed Canva export (1080×1350) — Mentor portrait |
| **Primary text** | *(see below)* |
| **Headline** | `See What Investors Really See` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c4_authority_feed&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

**Primary text (copy-paste):**
```
After 2,500+ founder pitches analyzed, the pattern is always the same:

The best founders don't have better ideas. They understand how investors think.

They know that "interesting" doesn't mean interested. They know when to stop talking. They know the difference between pushing information at an investor and creating pull.

This assessment was built by someone who's raised capital and invested it — to show founders the gaps nobody in their world will point out.
```

### Ad 6: C4 Story (9:16)

| Field | Value |
|-------|-------|
| **Ad name** | `C4_Story_Built-Other-Side` |
| **Format** | Single image |
| **Creative** | Upload: C4 Story Canva export (1080×1920) |
| **Primary text** | *(same as C4 Feed above)* |
| **Headline** | `See What Investors Really See` |
| **Description** | `Free 3-minute founder assessment` |
| **Website URL** | `https://quiz.humbleconviction.com?utm_source=meta&utm_medium=paid&utm_campaign=eddy_quiz&utm_content=c4_authority_story&utm_term=founders` |
| **Display link** | `humbleconviction.com` |
| **CTA button** | Learn More |

---

## BUDGET

### $150/day — $1,050/week

| Ad Set | Daily Budget | Weekly Spend |
|--------|-------------|--------------|
| C1: Polite Pass | $50/day | $350/week |
| C2: Room Can't Read | $50/day | $350/week |
| C4: Authority | $50/day | $350/week |
| **Total** | **$150/day** | **$1,050/week** |

**14-day test budget: ~$2,100.** That buys ~210-350 quiz completions total — enough to read each concept individually and answer "is there a pulse?"

---

## UTM PARAMETER REFERENCE

All UTMs use a single campaign tag (all concepts run as cold in one campaign):

| Parameter | Value |
|-----------|-------|
| `utm_source` | `meta` |
| `utm_medium` | `paid` |
| `utm_campaign` | `eddy_quiz` |
| `utm_content` | `c1_polite_pass_feed` / `c1_polite_pass_story` / `c2_room_cant_read_feed` / `c2_room_cant_read_story` / `c4_authority_feed` / `c4_authority_story` |
| `utm_term` | `founders` |

---

## CUSTOM AUDIENCES TO CREATE

Create these BEFORE building the campaign:

| Audience Name | Type | Source | Rule | Retention |
|---------------|------|--------|------|-----------|
| `HC Quiz Completers` | Website | Pixel 1407883507304464 | CompleteRegistration event | 30 days |
| `HC Email Leads` | Website | Pixel 1407883507304464 | Lead event | 180 days |

**Usage:** Both ad sets EXCLUDE these audiences to avoid paying for people who already converted.

---

## THE LOCKDOWN PROTOCOL — Days 1-14

### Days 1-2: Confirm Plumbing

Check ONLY these 3 things. If any are broken, it's a setup problem — flag immediately:

1. **Is the budget being spent?** (Ad sets can get stuck in "Review" or "Limited delivery")
2. **Are impressions being served?** (Non-zero impressions in each ad set)
3. **Is CTR non-zero?** (Even 0.5% means ads are alive)

If all 3 pass → hands off. Do NOT react to CPAs, CTRs, or conversion rates.

### Days 1-7: HARD LOCKDOWN

**Do NOT make ANY changes.** No bid changes, no audience tweaks, no budget adjustments, no killing creatives. Every significant edit resets the learning phase clock and wastes the data we already paid for.

During this period:
- CPAs will be wild ($2 one day, $12 the next) — this is normal
- Delivery will be uneven across ad sets — this is Meta exploring
- CTR and conversion rates will bounce — this is not signal

### Day 7-10: First Real Read

Compare across the 3 creatives:

| Metric | What to look at |
|--------|----------------|
| CPC (cost per click) | Which concept drives cheapest traffic |
| Quiz completion rate | Which concept's traffic actually finishes the quiz |
| Cost per quiz completion | The key efficiency metric — which concept delivers completions cheapest |

**Decision rule:** If one creative has zero or near-zero completions with decent spend after 7 days → consider killing it and reallocating $50/day to the winners.

### Day 14: The Pulse Check

By day 14 at $150/day we should have **~75+ quiz completions total** and enough downstream email captures to answer: **Is there a pulse?**

| Signal | Verdict | Action |
|--------|---------|--------|
| Email captures + some waitlist opt-ins | **Pulse confirmed** | Optimize from here — kill weakest concept, scale winners |
| 75+ quiz completions, literally zero email captures | **Something is broken** | Pause ads, diagnose funnel (email gate copy, value prop, trust) |
| Low quiz completions despite good CTR | **Quiz UX issue** | Check quiz length, mobile experience, loading speed |
| Low CTR across all concepts | **Creative problem** | Replace images, test new hooks (copy angles are validated) |

**Pancake Principle applies:** Everything after email capture (action plan email, Kit drip, Eddy promotion) gets refined AFTER we prove top-of-funnel works.

---

## WHAT TO MONITOR (and what to ignore)

### Check occasionally (don't obsess):
- Delivery status — are ads running or stuck in review?
- Total spend vs. budget — is it underspending?
- Any Meta policy violations or disapprovals

### Ignore until Day 7:
- CPAs
- CTRs
- Conversion rates
- Cost per result

---

## NAMING CONVENTION SUMMARY

```
Campaign:  META_Conv_EddyQuiz_Mar26
Ad Set:    [ConceptCode]-[ConceptName]_[Targeting]_Mar26
Ad:        [ConceptCode]_[Format]_[ShortName]
```

Examples:
- `META_Conv_EddyQuiz_Mar26`
- `C1-Polite-Pass_Founders_Mar26`
- `C1_Feed_Polite-Pass`

---

## QUICK REFERENCE: ALL 6 ADS

| Ad | Concept | Format | Headline | Image |
|----|---------|--------|----------|-------|
| 1 | C1: Polite Pass | Feed 4:5 | What Investors See (But Won't Say) | Hoodie guy, coffee shop |
| 2 | C1: Polite Pass | Story 9:16 | What Investors See (But Won't Say) | Same |
| 3 | C2: Room Can't Read | Feed 4:5 | Do You Misread Investor Signals? | Brian's real photo (founder + VC) |
| 4 | C2: Room Can't Read | Story 9:16 | Do You Misread Investor Signals? | Same |
| 5 | C4: Built Other Side | Feed 4:5 | See What Investors Really See | Mentor portrait |
| 6 | C4: Built Other Side | Story 9:16 | See What Investors Really See | Same |

**All ads share:** CTA = Learn More · Description = "Free 3-minute founder assessment" · Destination = quiz.humbleconviction.com (with UTMs) · Optimization = CompleteRegistration
