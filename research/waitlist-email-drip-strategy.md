# Waitlist Email Drip Strategy — HC Funnel / Eddy
*Research memo — March 16, 2026*
*Question: What's the optimal email sequence for HC/Eddy's pre-product waitlist — where the funnel is Meta ads → quiz assessment → email capture → waitlist, there's no course to sell yet, and the audience is early-stage founders who just scored on a pitch assessment?*

## TL;DR

Send 5 emails over 3-4 weeks. Email 1 is the immediate results email (the "prescription" gated behind the email capture). Emails 2-5 are a value-driven nurture sequence that deepens the quiz's insights, builds authority, and quietly validates demand — without ever hard-selling a product that doesn't exist yet. Cadence: Email 1 instant, then one email every 5-7 days. The goal of the sequence is threefold: deliver on the promise (results email), keep founders engaged and thinking about their pitch gaps, and measure reply/click behavior as demand signal for the course. Do not go silent after capture — waitlist subscribers who receive valuable content during the wait convert at 2-3x the rate of those who only get a launch announcement.

## What the Current Data Says

### The Urgency Problem: Don't Let the List Go Cold

The most important finding: waitlist age kills conversion. BeyondLabs' 2025 analysis of SaaS pre-launch waitlists found that lists exceeding 90 days see conversions "plummet," with Rows.com discovering 0% conversion for signups older than 6 months. This means your nurture sequence isn't optional — it's the difference between a live list and a dead one.

Waitlist-driven launches that maintain engagement achieve 25-85% conversion at near-zero marginal cost, vs. 2-4% for cold traffic (BeyondLabs, 2025). The spread is enormous because it depends almost entirely on how well you nurture during the wait.

### Sequence Length and Cadence

Current best practices converge on these numbers:

- **Total emails:** 5-7 for a pre-product waitlist (not the 10-15 of a full launch sequence — you have nothing to sell yet)
- **Cadence:** Every 5-7 days for nurture emails. Not tighter — you're not launching, so urgency-based daily emails don't apply. Not looser — weekly-ish keeps you in their awareness without fatigue.
- **Welcome/results email:** Immediate (within minutes of capture). Welcome emails see 50-70% open rates (ActiveCampaign 2025 benchmarks) — this is your highest-attention moment. Don't waste it on a generic "thanks for signing up."
- **Best send days:** Tuesday through Thursday, 8-10am in the recipient's timezone (Omnisend 2025 analysis). But for your audience (founders), later morning may work better — test 10am-12pm.

### What Pre-Product Emails Should Contain

The research is clear on one point: do not pitch what doesn't exist yet. WPFunnels' 2025 launch strategy guide emphasizes that early nurture emails "should not be used to pitch anything or even speak about your upcoming product — they should be all about re-engaging people with the want or need that drove them to subscribe."

For HC specifically, the "want or need" is: *understanding what investors actually see when they pitch.* The quiz opened that door. The email sequence walks them further through it.

Content that works in pre-product sequences (Benchmark Email, Sequenzy, Thrive Themes — all 2025):

- **Expand on the quiz results.** They got a scorecard with 4 dimensions. Each nurture email can go deeper on one dimension — what it means, why it matters, what investors actually do when they see weakness here. This is the "prescription" drip.
- **Share "insider" insights.** The HC brand is built on "what investors see but won't tell you." Each email can reveal one of these patterns. This builds authority while delivering genuine value.
- **Invite participation.** BeyondLabs found that waitlists that invite input ("What would you most want to learn about pitching?") convert 2-3x higher because they create co-creation and emotional investment. A one-question reply prompt in email 3 or 4 serves double duty: engagement + demand signal.
- **Don't mention the course until the last email.** And even then, frame it as "we're building something based on what we've learned" — a soft tease, not a pitch.

### Benchmarks to Expect

Based on ActiveCampaign's 2025 data (39.26% average open rate across their platform) and Sequenzy's SaaS-specific benchmarks:

- **Email 1 (results):** 55-70% open rate (welcome email territory + they're actively waiting for their results)
- **Emails 2-4 (nurture):** 35-45% open rate if content is strong. Below 25% means the content isn't landing.
- **Email 5 (soft tease):** 30-40% open rate.
- **Click-through rate:** 3-5% for high-value content emails. Below 2% means the content feels generic.
- **Reply rate:** If you include reply prompts, 5-10% reply rate is excellent for a cold-to-warm list.

> **Heads up — open rates are inflated:** Apple Mail Privacy Protection (64% of Apple Mail users) pre-loads tracking pixels, inflating open rates. Use click-through rate and reply rate as your real engagement KPIs, not opens. Opens are directionally useful but no longer reliable as a primary metric (MailerLite 2025, Genesys Growth 2026).

### Demand Validation Without a Product

WPFunnels' research on pre-launch validation suggests using a "presell page" or equivalent: offer the waitlist a chance to signal intent (early access signup, deposit, or even just a "yes I'm interested" click). Their data shows 30-60% of those who make a pre-signup convert to purchase when the product launches.

For HC, you don't need a presell page — you can embed this validation directly in the email sequence. Email 4 or 5 can include a CTA: "We're building a course on this. Want early access when it's ready?" A click = a demand signal. Track who clicks.

## Why It Works (Foundational Principles)

Three frameworks explain why this sequence structure works:

**Zeigarnik Effect (Bluma Zeigarnik, 1927):** People remember incomplete tasks better than completed ones. The quiz opened a loop ("here's what's wrong with your pitch") and the email gate created an incomplete task ("get your full recommendations"). The drip sequence keeps that loop open across multiple emails — each one resolves part of it while opening a new thread. This is why dimension-by-dimension deep dives work so well as nurture content.

**Commitment and Consistency (Cialdini, 1984):** Once someone takes the quiz and gives their email, they've made a small commitment. Each subsequent email that they open and engage with deepens that commitment. By the time you mention the course, they've already invested significant attention. The reply prompt in email 3-4 is a deliberate escalation of commitment — replying is a bigger action than clicking.

**Mere Exposure Effect (Zajonc, 1968):** Familiarity breeds preference. Founders who see the HC brand in their inbox weekly for a month will have significantly higher trust and recognition than those who only saw the quiz once. This is why going silent is so dangerous — you lose the exposure compound effect, and by the time you email again, you're back to being a stranger.

## Recommendation

### The 5-Email Sequence for HC Funnel

**Email 1: "Your Results" (Immediate — within minutes of capture)**
This is the big one. It's the payoff for giving their email. Deliver the full recommendations gated behind the email capture: specific guidance for each of their 4 dimensions, starting with their weakest. Personalize using their tier and scores (you have this in Firestore). End with: "Over the next few weeks, I'm going to go deeper on each of these dimensions — the patterns I see in founders at your level and exactly what to do about them."

**Email 2: "The Dimension That Matters Most" (Day 5-7)**
Deep dive on Clarity (the most impactful dimension regardless of their score). Share an investor-perspective insight they haven't heard before. Short, punchy, one core idea. End with a specific micro-action they can take before their next pitch.

**Email 3: "The Signal You're Misreading" (Day 12-14)**
Deep dive on Investor Fluency — decode a specific investor behavior (like the "this is really interesting" line from the quiz). This is your strongest content angle because it's genuinely insider knowledge. Include a reply prompt: "What's the most confusing thing an investor has said to you after a pitch? Reply and I'll tell you what it actually meant."

**Email 4: "The Hardest Skill" (Day 19-21)**
Deep dive on Persuasion Instincts — the "push vs. pull" concept. This connects to the HC "Conversation, Not Pitch" philosophy. Share a brief case study or before/after (can be anonymized). Include the demand signal CTA: "We're building something to help founders close these gaps. Want early access? [Yes, tell me more]"

**Email 5: "What's Next" (Day 26-28)**
Light recap of the journey. Acknowledge where they are ("You've been thinking about your pitch differently for the last month — that alone puts you ahead of most founders"). Soft mention of what's coming. Invite them to share the quiz with a founder friend who needs it (referral loop). If they clicked "yes" in Email 4, tag them as high-intent in Kit for priority launch outreach.

### Kit Implementation Notes

- Use Kit's visual automation builder to trigger the sequence on the "quiz-completed" tag
- Personalize Email 1 using subscriber custom fields (tier, scores) — Kit supports liquid merge tags
- Tag subscribers who click the Email 4 CTA as "high-intent" for segmented launch emails later
- Tag subscribers who reply to Email 3 as "engaged" — these are your warmest leads
- Set up a simple automation: if a subscriber doesn't open Emails 2 or 3, send a re-engagement variant with a different subject line before continuing the sequence

### What NOT to Do

- **Don't go silent after Email 1.** This is the most common mistake. The results email has the highest open rate you'll ever get — but if the next thing they hear from you is a launch pitch 3 months later, you've lost them.
- **Don't send more than 5 emails before you have a product.** You'll run out of genuinely valuable content and start padding. Better to end the sequence and move them to a low-frequency monthly insight email than to send 10 mediocre nurture emails.
- **Don't ask for the sale.** You have nothing to sell. The Email 4 CTA is a *validation click*, not a purchase. Frame it as "want early access?" not "buy now."
- **Don't ignore the data.** Track who opens, who clicks, who replies, who clicks the Email 4 CTA. This behavioral data is your demand signal. If 40%+ click "yes" on Email 4, the course has demand. If 5% click, rethink the product before building it.

## Sources

- [BeyondLabs — Pre-Launch Waitlist Strategy: Build & Convert 400+ Leads Before You Launch (2025)](https://beyondlabs.io/blogs/how-to-build-a-waitlist-that-turns-into-customers)
- [ActiveCampaign — 2026 Email Marketing Benchmarks: Open & Click Rates by Industry](https://www.activecampaign.com/blog/activecampaign-email-benchmarks)
- [Sequenzy — SaaS Email Marketing Benchmarks](https://www.sequenzy.com/blog/saas-email-marketing-benchmarks)
- [Sequenzy — Waitlist Email Sequence: Keep Subscribers Engaged Until Launch](https://www.sequenzy.com/blog/waitlist-email-sequence)
- [Omnisend — 8 Email Drip Campaign Examples and Best Practices (2025)](https://www.omnisend.com/blog/drip-campaign/)
- [WPFunnels — How to Craft a Product Launch Email Strategy (2024)](https://getwpfunnels.com/product-launch-email-strategy/)
- [Benchmark Email — Building and Nurturing a Customer Email List Prior to a Product Launch](https://www.benchmarkemail.com/blog/building-and-nurturing-a-customer-email-list-prior-to-a-product-launch/)
- [MailerLite — Email Marketing Benchmarks 2025: Is Your Open Rate on Track](https://www.mailerlite.com/blog/compare-your-email-performance-metrics-industry-benchmarks)
- [Genesys Growth — Email Open Rates: 50 Statistics Every Marketing Leader Should Know in 2026](https://genesysgrowth.com/blog/email-open-rates-stats-for-marketing-leaders)
- [LearnWorlds — Successful Email Sequences to Boost Your Online Course in 2026](https://www.learnworlds.com/email-sequences-launch-online-course-examples/)
- [Learning Revolution — 18 Key Email Sequences & Templates for Online Courses (2025)](https://www.learningrevolution.net/email-sequences/)
- [ScoreApp — 19-Part Waitlist Email Sequence for an Effective Launch](https://www.scoreapp.com/waitlist-email-sequence/)
