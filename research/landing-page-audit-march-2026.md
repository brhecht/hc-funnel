# Landing Page Audit: HC Funnel Assessment
*Research memo — March 18, 2026*
*Question: Does the HC Funnel landing page follow current best practices for quiz funnel landing pages receiving cold Meta ad traffic on mobile? Evaluate every element: structure, above-the-fold content, headline, subheadline, CTA, feature cards, social proof, design, and mobile optimization.*

## TL;DR

The landing page has a strong headline and clean design but is structurally underbuilt for cold Meta ad traffic. The biggest gaps: **no social proof anywhere** (cold traffic bounces in 3-8 seconds without credibility markers), **the feature cards are below the fold and explain the quiz mechanics rather than the user's benefit**, the **CTA copy "Get My Results" creates a tense mismatch** (you don't have results yet — you haven't taken the quiz), and the **AppSwitcher nav bar at the top is a distraction/exit for cold traffic who has no context for what B-Suite apps are**. The strongest finding across all top-performing quiz funnels: the best ones either skip the landing page entirely (Warby Parker drops you into Q1) or keep the landing page to headline + one line + CTA + social proof — nothing else above the fold. HC Funnel's landing page has good raw material but needs restructuring to convert cold mobile traffic.

## What the Current Page Does

Based on the live page at hc-funnel.vercel.app (desktop screenshot captured):

**Above the fold (desktop):**
1. AppSwitcher nav bar (B Eddy, B Things, B Content, B People, B Marketing)
2. "HC" logo + "Humble Conviction" brand name
3. Headline: "Find Out What Investors See — Before They Tell You"
4. Subheadline: "This 3-minute assessment will show you exactly what investors see — the patterns they notice but will never tell you. Based on 2,500+ pitches coached by a 4x exited founder and venture investor."
5. CTA button: "Get My Results →"
6. Three feature cards (partially visible): "Investor-Tested Insights," "4-Dimension Scorecard," "Built From 2,500+ Pitches"

**Below the fold:**
7. Footer: "HUMBLE CONVICTION"

That's the entire page. No social proof, no testimonials, no participant count, no trust badges, no visual imagery.

## What the Research Says Top Quiz Funnels Do

### Pattern 1: Skip the landing page entirely
Warby Parker's quiz drops cold traffic directly into Question 1 — "1 of 8: What are you looking for?" No hero, no feature cards, no subheadline. The quiz IS the landing page. Full-screen, distraction-free, immediate engagement.

This pattern works when the ad creative has already pre-sold the value proposition. If your Meta ad says "Find out what investors see in your pitch — take the 3-minute assessment," the user arrives already knowing what they're doing. A landing page that re-explains the same thing adds friction between "I want this" and "let me do this."

### Pattern 2: Minimal landing page → immediate quiz start
V Shred, Hims, BetterMe, and Noom all use ultra-short pre-quiz screens: headline + time/benefit ("60 seconds for crazy results in 90 days") + single CTA. No feature cards. No multi-section layouts. Some include a single visual element (product image, illustration).

Key features of these landing pages:
- **Full-screen mode** — removes navigation, header, footer. The quiz owns the viewport.
- **Time + benefit upfront** — "60 seconds," "5-minute plan," "quick quiz" positioned as low effort, high reward
- **No navigation** — conversion rates increase 16-28% without top navigation (Heyflow data)
- **Social proof inline** — participant count or trust marker near the CTA, not as a separate section

### Pattern 3: Educational landing page with social proof
Prose, HelloFresh, and ThirdLove use slightly longer landing pages because their products require explanation. These include headline, brief benefit statement, visual, CTA, AND social proof (star ratings, review counts, media logos).

This pattern is relevant for HC Funnel because the quiz concept needs some explanation for cold traffic — "what investors see" is intriguing but not immediately obvious as a quiz.

### Structural patterns across ALL top-performing quiz landing pages:

1. **No extraneous navigation.** Zero of the top examples show navigation bars, app switchers, or links to other products. The page has one job: start the quiz.

2. **Social proof is universal.** Every single high-converting example includes at least one social proof element above or near the CTA: participant count ("50,000+ founders assessed"), star ratings, media logos, or a credibility statement. The research is unambiguous: landing pages with social proof convert 34% better than those without (MailerLite). Cold traffic bounces in 3-8 seconds without credibility markers (AdAmigo.ai).

3. **Benefit-first headlines.** Headlines that lead with the user's outcome ("Sleep Through the Night") outperform feature-first headlines ("Premium Magnesium Supplement") by 23-41% for cold traffic (Replo). HC Funnel's headline is benefit-first — "Find Out What Investors See" — which is correct.

4. **CTA copy matches the immediate next action.** "Take the Quiz," "Start My Assessment," "Get My Plan" — the CTA describes what happens when you click. HC Funnel's "Get My Results" describes the end state, not the next step, which creates a micro-confusion: "I don't have results yet."

5. **Above-the-fold = headline + benefit line + CTA + social proof.** Nothing else. Feature cards, methodology explanations, and detailed descriptions live below the fold (if they exist at all). The above-the-fold content has one job: get the click.

6. **74% of user attention is on above-the-fold content** (multiple eye-tracking studies). Everything that matters must be visible without scrolling on a 375px mobile viewport.

## Element-by-Element Audit

### 1. AppSwitcher Nav Bar
**Current:** Full B-Suite nav bar with links to B Eddy, B Things, B Content, B People, B Marketing.
**Research says:** Remove it entirely for cold quiz traffic. Every link is an exit. Heyflow data: removing top navigation increases conversion by 16-28%. No top quiz funnel includes navigation to unrelated products.
**Recommendation:** Hide the AppSwitcher on the landing page (and ideally on the quiz flow too). This is an internal tool for Brian/Nico — cold traffic from Meta ads has zero context for what these apps are, and every link is a leak.

### 2. Brand Header
**Current:** "HC" orange circle + "Humble Conviction" text.
**Research says:** Minimal branding is fine — it establishes legitimacy. Keep it but make it subtle. Don't let it eat vertical space on mobile.
**Recommendation:** Keep as-is. It's lightweight and establishes brand identity.

### 3. Headline
**Current:** "Find Out What Investors See — Before They Tell You"
**Research says:** Strong. Benefit-first, creates a curiosity gap, identity-relevant to the ICP. The em dash creates a dramatic pause that works.
**Recommendation:** Keep. This is the strongest element on the page. One potential A/B test: "What Do Investors Really See When You Pitch?" (question format, slightly more direct).

### 4. Subheadline
**Current:** "This 3-minute assessment will show you exactly what investors see — the patterns they notice but will never tell you. Based on 2,500+ pitches coached by a 4x exited founder and venture investor."
**Research says:** This is doing two jobs at once — explaining the quiz AND establishing credibility. On mobile, this is 3 lines of text between the headline and CTA, which pushes the CTA down. The "2,500+ pitches coached by a 4x exited founder and venture investor" credibility claim is buried in the subheadline instead of being a standalone social proof element.
**Recommendation:** Split this into two elements:
- **Subheadline (short):** "This 3-minute assessment reveals the patterns investors notice — but will never tell you."
- **Social proof line (standalone, near CTA):** "Based on 2,500+ pitches coached" or "2,500+ founders assessed" (once you have real numbers)

### 5. CTA Button
**Current:** "Get My Results →"
**Research says:** First-person possessive ("My") is good — changing "your" to "my" increased CTR by 90% in one study (VWO). But "Get My Results" describes the end state, not the next action. You don't have results yet — you haven't taken the quiz. This creates a micro-cognitive dissonance. Top quiz funnels use action-forward CTAs: "Take the Assessment," "Start My Assessment," "See What Investors See."
**Recommendation:** Change to **"Start My Assessment →"** or **"Take the Assessment →"**. This accurately describes what happens when you click AND maintains the first-person possessive. "Get My Results" could be repurposed as the final quiz button (currently "See My Results" on Q8, which is close).

### 6. Feature Cards
**Current:** Three cards below the CTA: "Investor-Tested Insights," "4-Dimension Scorecard," "Built From 2,500+ Pitches." Each includes a description paragraph.
**Research says:** These are below the fold on mobile and may never be seen by cold traffic. On desktop, they're partially visible. Their content explains quiz mechanics (scorecard dimensions, methodology) rather than user benefits. Top quiz funnels either skip these entirely or use 1-line benefit bullets above the CTA rather than card components below it.
**Recommendation:** Two options:
- **Option A (lean):** Remove the cards entirely. The headline + subheadline + CTA + social proof is the entire page. This matches the Warby Parker / V Shred pattern and reduces the page to its minimum effective form.
- **Option B (keep but restructure):** Move the card content into 3 tight bullet points ABOVE the CTA, reframed as benefits: "See what investors notice in the first 30 seconds" / "Get scored on the 4 dimensions that matter most" / "Built from 2,500+ real pitches." No cards, no descriptions — just benefit bullets.

### 7. Social Proof
**Current:** None. Zero social proof elements anywhere on the page.
**Research says:** This is the single biggest gap. Social proof increases landing page conversion by 34% (MailerLite). Cold traffic bounces in 3-8 seconds without credibility markers (AdAmigo.ai). Usage numbers ("Join 50,000+ businesses") reduce perceived risk through crowd validation (WiserNotify). Placing social proof near the CTA reduces hesitation (Nudgify, Flockler).
**Recommendation:** Add social proof. Options in order of preference:
1. **Participant count** (once you have real data): "2,500+ founders have taken this assessment"
2. **Credibility statement** (available now): "Based on 2,500+ pitches coached" — extract this from the subheadline and make it a standalone element near the CTA
3. **Authority marker:** "Created by a 4x exited founder and venture investor" — again, extract from subheadline
4. **Future addition:** Once you have testimonials or notable completers, add a single testimonial near the CTA

### 8. Visual Design
**Current:** Clean, minimal, navy text on cool-white background with orange accent CTA. No images, illustrations, or visual elements beyond the text and button.
**Research says:** The design is clean but text-heavy. Every top quiz funnel includes at least one visual element on the landing page — a product image, illustration, phone mockup, or branded graphic. Visuals increase engagement and make the page feel less like a text document and more like an experience.
**Recommendation:** Consider adding a single visual element — a preview of the scorecard result (blurred or stylized), a phone mockup showing the quiz, or an illustrated badge. This is a nice-to-have, not critical — the copy and structure changes above will have more impact.

### 9. Mobile Layout
**Current:** Based on the code, on mobile (375px) the page renders: AppSwitcher → brand header → large headline → 3-line subheadline → CTA button → 3 stacked feature cards → footer. The CTA is likely at or below the fold on mobile.
**Research says:** 74% of attention is above the fold. The CTA must be visible without scrolling. On a 375px screen, the AppSwitcher + brand header + headline + subheadline likely push the CTA below the fold.
**Recommendation:** On mobile, the above-the-fold content must be: headline → short subheadline → CTA → social proof line. Nothing else. This may require tightening the headline's font size on mobile or shortening the subheadline.

## Recommendation

### Priority changes (high impact, should implement before ad launch):

1. **Remove AppSwitcher from the landing page** (and quiz flow) for cold traffic. This is the easiest win — it removes exit links and reclaims vertical space on mobile.

2. **Add social proof near the CTA.** Start with "Based on 2,500+ pitches coached" as a standalone line below the CTA button. Upgrade to participant count once you have data.

3. **Change CTA copy from "Get My Results" to "Start My Assessment"** (or "Take the Assessment"). Matches the immediate action rather than the eventual outcome.

4. **Shorten the subheadline.** Pull the credibility claim out into standalone social proof. The subheadline becomes: "This 3-minute assessment reveals the patterns investors notice — but will never tell you."

5. **Ensure CTA is above the fold on mobile 375px.** This may require tightening top padding, reducing headline font size on mobile, or moving the feature cards below a clear visual break.

### Secondary changes (good to have, can iterate):

6. **Restructure or remove feature cards.** Either convert to 3 tight benefit bullets above the CTA or remove entirely. They're below the fold on mobile and explain mechanics rather than benefits.

7. **Add a single visual element.** A scorecard preview, phone mockup, or branded illustration would break up the text-only layout.

8. **A/B test the headline.** Current headline is strong, but worth testing a question format: "What Do Investors Really See When You Pitch?"

## Pressure Test

**Consequence check:** The landing page is the single most consequential element of the funnel — every dollar of Meta ad spend drives traffic here, and the page-to-quiz-start conversion rate is the first domino. Getting this wrong means wasted ad spend on traffic that never enters the funnel. However, all recommended changes are easily reversible (code changes, not structural rebuilds), and the Pancake Principle already budgets for a data-collection phase.

The changes are material enough to warrant a red team pass on the highest-impact recommendation.

**Red team on removing AppSwitcher:**

The strongest counter: the AppSwitcher establishes that Humble Conviction is a real company with a suite of products — it signals legitimacy. Removing it might make the page feel like a standalone landing page with no organizational context, which could reduce trust for sophisticated founders who check for legitimacy.

**This counter is weak.** Cold Meta ad traffic has zero context for what "B Eddy" or "B Things" means. These links look like internal tools, not trust signals. A sophisticated founder checking legitimacy would look for the brand name, credibility statement, and social proof — not a nav bar linking to unknown apps. The brand header ("HC Humble Conviction") provides sufficient organizational identity. The AppSwitcher is a power-user feature for Brian/Nico, not a conversion element for cold traffic.

**Red team on changing CTA copy:**

Counter: "Get My Results" creates anticipation and implies the value is already waiting for you — you just need to claim it. "Start My Assessment" is more honest but less compelling — it positions the user at the beginning of work rather than at the threshold of receiving something.

**This has some merit.** The possessive "My Results" implies personalization and value waiting to be unlocked. However, the tense mismatch remains: you don't have results yet, and clicking "Get My Results" takes you to a quiz, not to results. If the first thing after clicking is "Question 1 of 8," there's a micro-disappointment that doesn't exist with "Start My Assessment." A compromise: **"See What Investors See →"** — this echoes the headline, is benefit-forward, and doesn't promise results you don't have yet.

**Final synthesis:**

All recommendations hold. The AppSwitcher removal and social proof addition are the highest-impact, lowest-risk changes. The CTA copy change is worth doing but the exact wording is a judgment call between "Start My Assessment," "Take the Assessment," and "See What Investors See." I'd recommend "See What Investors See" as it echoes the headline and is benefit-forward, but this is a strong A/B test candidate.

**Key assumptions:**
1. 80%+ of traffic will be mobile from Meta ads (documented in handoff)
2. Cold traffic from Meta needs immediate credibility signals (well-established in research)
3. The ad creative will pre-sell the quiz concept, making a long landing page redundant

## Sources

- [Heyflow: 16 Quiz Funnel Examples](https://heyflow.com/blog/quiz-funnel-examples/) — Detailed breakdowns of Lemonade, Hims, V Shred, Warby Parker, Noom, Prose, HelloFresh, ThirdLove, BetterMe, Babbel, Wiser, Better.com, Huel, Branch
- [Heyflow: 10 High-Converting Quiz Funnel Examples](https://heyflow.com/blog/10-quiz-funnel-examples/) — Conversion data, full-screen mode, navigation removal
- [OptiMonk: 15 Successful Quiz Funnel Examples](https://www.optimonk.com/quiz-funnel-examples/) — E-commerce quiz patterns
- [Replo: How Landing Pages Affect Ad Conversion Rate](https://www.replo.app/blog/how-landing-pages-affect-ad-conversion-rate) — Benefit-first headlines 23-41% lift
- [AdAmigo: Top 7 Landing Page Fixes for Meta Ads](https://www.adamigo.ai/blog/top-7-landing-page-fixes-for-meta-ads) — Cold traffic bounces in 3-8 seconds
- [Dancing Chicken: Ultimate Guide to Landing Page Design for Meta Ads](https://www.dancingchicken.com/post/ultimate-guide-to-landing-page-design-for-meta-ads) — Above-the-fold optimization
- [MailerLite: 11 Social Proof Examples for Landing Pages](https://www.mailerlite.com/blog/social-proof-examples-for-landing-pages) — 34% conversion lift with social proof
- [KlientBoost: 18 Ways to Use Landing Page Social Proof](https://www.klientboost.com/landing-pages/landing-page-testimonials/) — Placement near CTAs
- [CXL: Is Social Proof Really That Important?](https://cxl.com/blog/is-social-proof-really-that-important/) — Evidence hierarchy for social proof types
- [WiserNotify: 10 High-Impact Social Proof Landing Page Examples](https://wisernotify.com/blog/landing-page-social-proof/) — Usage numbers and crowd validation
- [VWO: 5 Parameters of High Converting CTA Buttons](https://vwo.com/blog/high-converting-call-to-action-button-examples/) — "My" vs "Your" 90% CTR increase
- [Unbounce: What Makes a Great CTA](https://unbounce.com/conversion-rate-optimization/cta-copy-critiqued-for-conversion/) — CTA copy best practices
- [ConvertFlow: 6 Landing Page CTAs](https://www.convertflow.com/campaigns/landing-page-cta) — Quiz-specific CTA patterns
- [Ed Leake: 90 High Converting CTA Buttons Analyzed](https://edleake.com/call-to-action-buttons/) — CTA design patterns
- [involve.me: 11 Landing Page Best Practices 2026](https://www.involve.me/blog/landing-page-best-practices) — Navigation removal, single-focus pages
- Warby Parker live quiz (warbyparker.com/quiz) — No landing page, drops directly into Q1
