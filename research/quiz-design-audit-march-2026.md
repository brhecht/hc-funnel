# Quiz Design Audit: HC Funnel Assessment
*Research memo — March 18, 2026*
*Question: What does current research say about optimal quiz-based lead generation funnel design — question count, format, scoring, results presentation, email capture, sequencing, and mobile UX — and how does the live HC Funnel quiz stack up?*

## TL;DR

The HC Funnel quiz is architecturally strong. Scenario-based format, config-driven architecture, emotional arc sequencing, no back button, progress bar, single-question-per-screen, mobile-first sizing, calculating pause, and partial-reveal-before-gate are all research-supported choices. The two areas where the research pushes back: **8 questions is at the upper boundary** of what the data supports (consensus sweet spot is 5-7, with a 15% completion drop per question after 7), and the **email gate positioning is unusually generous** — showing tier + full scorecard + all four dimension explanations + cracked door lines before asking for email, which may reduce opt-in urgency. These are the two decisions worth pressure-testing.

## What the Current Data Says

### 1. Quiz Length

The consensus across 2025-2026 sources clusters tightly around **5-7 questions** as the sweet spot for lead-gen quizzes:

- Interact's 2026 Quiz Conversion Report (2,100 live quizzes): average start-to-finish completion rate of 65%, with opt-in rates topping 40%. They don't segment by question count in the public report, but their guidance recommends 5-10 questions.
- Outgrow's engagement benchmarks: completion rates drop by **15% for every question beyond 7**. Top performers hit 70-80% completion.
- Survicate study on survey completion: 1-3 questions average 83% completion; 4-8 questions drop to 65%; 9-14 questions drop to 56%.
- HubSpot 2024: each additional form field decreases conversion by an average of 4.1%.
- Perspective (mobile-first quiz platform): recommends 6-10 questions, noting 66% quiz completion rate and 71% start rate.
- Multiple sources: visual progress bars increase completion by 12-18%.

**The critical nuance:** Completion rate ≠ lead quality. Outgrow explicitly warns that "a 90% completion rate does nothing if those leads never convert." Longer quizzes that filter for intent can produce higher downstream conversion even with lower completion. The question is whether questions 7 and 8 earn their place by improving lead quality or just add friction.

### 2. Question Format

Scenario-based (situational judgment) format is research-supported as superior to self-assessment for this specific use case:

- **SJTs are less prone to faking than self-report measures** (PLOS One, Situational Judgment Tests as a Method for Measuring Personality, 2019). This matters because the HC ICP includes founders with Dunning-Kruger blind spots — self-assessment would let them rate themselves high on the exact skills they lack.
- **Dunning & Kruger's original finding** (1999, Journal of Personality and Social Psychology): people who are unskilled in a domain tend to overestimate their own competence. Self-assessment quizzes are structurally vulnerable to this. Scenario-based questions reveal actual judgment without requiring self-awareness.
- Cathy Moore (instructional design): scenario-based questions require deeper thinking than knowledge-check or self-report formats, driving higher engagement and better assessment validity.
- Multiple marketing sources confirm scenarios "feel like personality tests" and create genuine self-reflection vs. surface-level data collection.

**For lead gen specifically:** ScoreApp distinguishes personality quizzes (top of funnel, brand awareness, casual browsers) from assessments (middle/bottom of funnel, qualifying leads). HC Funnel sits at the intersection — it's a top-of-funnel lead magnet via Meta ads but needs to qualify for a paid course. The scenario format threads this needle: engaging enough for cold traffic, substantive enough to signal quality.

### 3. Email Gate Positioning

The industry standard is **gate results behind email** — ask after the last question, before showing anything. The logic: curiosity about results is the primary motivator, so maximize it.

HC Funnel takes a different approach: **show tier + full scorecard with all four dimension scores, explanations, and cracked door lines, THEN ask for email to "Send My Recommendations."** This is a partial-reveal model — the diagnosis is on-page, the prescription is gated.

The data on this is thin — no rigorous A/B studies comparing partial-reveal vs. full-gate for lead gen quizzes. Available evidence:

- Interact 2026: the 40.1% average conversion assumes standard full-gate placement. HC Funnel's approach gives away more before asking, which could reduce the urgency to opt in.
- ThinkThemes and others: "show them a 'calculating results' page... it makes the whole process feel more valuable." HC Funnel does this (2.5s calculating pause). But the calculating pause typically precedes the gate, not the reveal.
- One source: a "skip this step" link that lets people see results without email "builds trust." This suggests partial-reveal can work, but at the cost of opt-in volume.
- ConvertFlow: the key is making the value proposition of the gated content distinct from what's already shown. "Your scores tell you what; your recommendations tell you what to do about it" is a valid distinction — if the user believes the gated content is genuinely different from what they already see.

### 4. Emotional Arc and Sequencing

The quiz follows a deliberate arc: easy entry (Q1-Q2) → uncomfortable middle (Q3-Q5) → mirror (Q6-Q7) → aspirational close (Q8). This aligns with:

- **Peak-end rule** (Kahneman, Fredrickson, Schreiber, 1993): people judge an experience based on its most intense moment and its ending. The quiz's aspirational close (Q8) ensures the final memory is empowering, not deflating.
- **Survey design best practice** (Qualtrics): start with broad, easy questions to warm up respondents and build rapport before introducing more complex or sensitive items.
- **Warm-up principle** (Typeform, Drag'n Survey, multiple UX sources): first questions should be "quick, easy, and lighthearted." Q1 (elevator pitch scenario) and Q2 (meeting start scenario) fit this pattern well.
- **Question order effects** (decades of survey research): order materially affects responses. The uncomfortable middle (Q3-Q5) lands after commitment is established, reducing abandonment vs. leading with hard questions.

### 5. Mobile-First UX

With 80%+ traffic expected from Meta ads (98.5% of Facebook users access via mobile per Meta's quarterly report), mobile optimization is critical:

- **Single question per screen:** HC Funnel does this. Research shows conversational mode (one question per screen) achieves 15-30% higher completion than traditional multi-field layouts (Feathery, FormFlux).
- **Tap targets:** HC Funnel uses full-width option cards with `minHeight: 56px`. Research recommends 44px minimum, with 48px showing 11% better first-click success.
- **Progress bar:** Present as thin accent-colored bar. Progress bars increase completion by 12-18%.
- **No back button:** Limited research directly comparing back vs. no-back in quiz funnels. The Baker & Couper survey study tested navigation configurations but didn't measure breakoff rates. The HC handoff cites "research-backed" for this choice. The survey research community is split — back buttons can help people fix mistakes (reducing frustration) but also create exit points and re-evaluation opportunities (increasing abandonment). For a fast, mobile, scenario-based quiz where there are no "correct" answers, no back button is defensible.

## Why It Works (Foundational Principles)

Three frameworks underpin the quiz architecture:

1. **Dunning-Kruger Effect** (Kruger & Dunning, 1999) — The core ICP (founders who think they're better at pitching than they are) cannot be accurately assessed via self-report. Scenario-based format is the only structurally sound approach for this audience. This is the single most important design decision in the quiz.

2. **Peak-End Rule** (Kahneman et al., 1993) — The emotional arc matters more than the average experience. Q8's aspirational close ensures the quiz ends on a high note, which shapes the user's memory of the experience and their willingness to engage with the email gate.

3. **Zeigarnik Effect** (Bluma Zeigarnik, 1927) — Incomplete tasks create psychological tension that drives completion. The calculating pause activates this ("my results are being prepared"), and the email gate leverages it ("you've seen the diagnosis, now get the prescription"). The partial-reveal model bets that showing diagnosis doesn't resolve the Zeigarnik tension because the user still needs the actionable recommendations.

## Recommendation

### What the quiz gets right (keep as-is):

- **Scenario-based format** — Research-validated, structurally superior for this ICP. Don't change.
- **Emotional arc** (easy → hard → mirror → aspirational) — Aligns with peak-end rule and warm-up research. Don't change.
- **No back button** — Defensible for scenario-based format on mobile. Don't change.
- **Single question per screen** — Mobile best practice. Don't change.
- **Progress bar** — 12-18% completion lift. Don't change.
- **Calculating pause** — Builds anticipation, supported by multiple practitioner sources. Don't change.
- **Config-driven architecture** — Not a UX feature but makes all of the below easy to test. Major asset.
- **4-dimension scoring with per-dimension copy** — Creates rich, personalized results that feel custom. This is the "value exchange" that makes the funnel work.
- **Cracked door lines** — Subtle "this is fixable" messaging that creates pull toward the course without hard-selling. Effective persuasion design.

### What the research flags as potential concerns:

**1. Quiz length: 8 questions is at the boundary.**

The data says 5-7 is the sweet spot. 8 isn't disqualifying — Interact supports up to 10-12 with visual elements, and Perspective recommends 6-10. But completion rates drop ~15% per question after 7 (Outgrow), and mobile users drop faster than desktop with each additional question (Lensym).

The counterargument: 8 questions are load-bearing for the 4-dimension, 2-questions-each scoring model. Cutting to 6 (3 dimensions × 2) would lose a dimension entirely, fundamentally weakening the scorecard value. Cutting to 4 (1 per dimension) eliminates the scoring reliability that the Monte Carlo validation established.

**My position:** 8 is justified. The 4-dimension × 2-question architecture is the minimum for a credible scorecard, and the scorecard is the core value proposition. The ~15% completion cost of questions 7-8 is likely offset by higher lead quality and a more compelling results page. Monitor completion rate post-launch — if it's below 55%, consider whether Q7 or Q8 can be tightened (shorter option text, simpler scenario) rather than cut.

**2. Email gate: the partial reveal is generous — possibly too generous.**

The quiz shows tier badge, tier description, all four dimension scores with dot visualization, all four explanations, and all four cracked door lines BEFORE the email gate. That's a lot of value delivered without capturing the lead. The email gate copy promises "full results and recommendations" — but the user has already received quite detailed results.

The risk: a founder reads their scorecard, gets the "aha" moment, and bounces without entering email because they feel they've already gotten the insight. The email gate's value proposition ("what to do about it") has to feel distinctly more valuable than "what investors see" — and right now, the on-page content gives a pretty complete picture of both what's happening and the direction of the fix (cracked door lines are explicitly "this is fixable, here's the shape of how").

**My position:** This is the highest-risk design choice in the quiz. It's a bet on trust-first over urgency-first, and it's a legitimate strategic choice — but it's one worth A/B testing. Two options:

- **Option A (current):** Keep partial reveal. Monitor email capture rate. If it's above 30%, the trust-first approach is working. If below 20%, the reveal is too generous.
- **Option B (tighter gate):** Show tier + tier description + overall score visualization only. Gate the per-dimension breakdown (scores, explanations, cracked door lines) behind email. This gives a compelling but incomplete picture — "you're in The Pieces Are There tier" is interesting, but "here's exactly which dimensions are strong and weak" is the real value. This more closely matches the standard quiz funnel pattern.

## Pressure Test

**Consequence check:** This is material. The quiz is the top of the entire HC funnel — every downstream conversion (email capture, waitlist, course sale) depends on it. The quiz content and structure can be changed post-launch (it's code, not print), so it's technically reversible. But first impressions with paid Meta traffic are expensive, and a quiz that bleeds completions or fails to capture emails wastes ad spend directly. The decision space has moderate second-order complexity — quiz design affects ad creative strategy (what to promise in the ad), email content (what the user already knows), and course positioning (what gap the course fills).

**Red team activated.**

### Red Team: The Case Against 8 Questions

The strongest counter-argument: HC Funnel is sending **cold Meta ad traffic** to this quiz, not warm email list subscribers. Cold traffic has lower patience, lower commitment, and higher bounce rates than any other traffic source. The 5-7 question consensus was established partly in this context. Outgrow's "15% completion drop per question after 7" applies with extra force to cold mobile traffic where attention spans are compressed.

Furthermore: the scenario-based format, while superior for assessment validity, requires **more cognitive effort per question** than a simple "rate yourself 1-5" self-assessment. Each HC Funnel question is a full paragraph scenario with 4 multi-sentence options. That's a heavier cognitive load than typical quiz funnels benchmarking 5-7 questions (which often use short, lightweight questions). So "8 questions" in this quiz is arguably equivalent to 10-12 questions of cognitive load in a typical personality quiz.

**Assumption dependency:** The 8-question structure depends on the assumption that scorecard richness (4 dimensions × 2 questions) drives enough value to overcome the completion friction. If the target audience (cold Meta traffic, early-stage founders, mostly mobile) values "fast insight" over "comprehensive assessment," this assumption breaks.

**Failure mode:** Quiz completion rate comes in at 40-50% instead of the 65%+ benchmark. At a $5-10 CPM and assuming a 2% CTR, you're paying ~$0.25-0.50 per quiz start. If half abandon before completing, your cost-per-completed-quiz doubles, and your cost-per-lead (email capture) could balloon to $5-10+ before you've even validated demand.

**Mitigant:** The config-driven architecture means question count can be reduced post-launch if completion data warrants it. This is a reversible decision. The real cost is wasted ad spend during the testing period, not a permanent structural flaw.

### Red Team: The Case Against Partial Reveal

The strongest counter-argument: the partial-reveal email gate is fighting decades of behavioral economics. The **endowment effect** (Thaler, 1980) suggests that once someone "has" their results, they value the additional recommendations less — they already feel like they've received the benefit. Standard quiz funnels gate ALL results for exactly this reason: the unrevealed result creates maximum Zeigarnik tension, maximum curiosity, maximum willingness to exchange an email.

The HC Funnel's bet is that "diagnosis on-page, prescription in email" creates a distinct enough value proposition. But the cracked door lines ARE prescriptive — they describe the shape of the fix. A user who reads "Founders who fix this one thing typically see the entire dynamic of their investor meetings shift" already knows the direction. They may not feel they need the email.

**Assumption dependency:** The partial-reveal model depends on the assumption that the cracked door lines create *more* desire for the full recommendations rather than *satisfying* the user's curiosity. This is a bet on the "curiosity gap" (Loewenstein, 1994) — that partial information increases rather than decreases desire for the full picture. Loewenstein's theory supports this, BUT it requires that the partial information creates a clear sense of what's missing. The email gate copy ("Your full results and recommendations will show you exactly what to do about it") needs to make the gap vivid.

**Failure mode:** Email capture rate comes in at 15-20% instead of the 30-40% benchmark. Users read their scorecard, feel satisfied, and close the tab. The funnel generates quiz completions but not leads. Ad spend is wasted on insights delivery, not lead capture.

**Coherence tension:** HC's brand is "Conversation, Not Pitch" — a trust-first, value-first ethos. A full email gate (show nothing until you give us your email) feels more transactional and less aligned with the brand. The partial reveal is more coherent with HC's positioning, even if it costs some opt-ins. This is a genuine tension with no clean answer.

### Final Synthesis

After the red team pass, the recommendations hold with modifications:

1. **Keep 8 questions** — but monitor completion rate aggressively in the first 1-2 weeks. If completion drops below 55% on mobile, consider tightening Q7 and Q8 (shorter option text, simpler scenario framing) before cutting questions entirely. The 4-dimension architecture is worth defending.

2. **The email gate is the real gamble.** The red team strengthened my concern here. The current design gives away a lot before asking for anything. My revised recommendation:
   - **Launch with the current partial-reveal model** (it's brand-coherent and HC shouldn't launch with a design that feels transactional to cold traffic)
   - **Pre-commit to an A/B test** within the first 2 weeks: current partial reveal vs. a tighter gate that shows only tier + tier description (no per-dimension scores, explanations, or cracked door lines)
   - **Success threshold:** If partial reveal captures 25%+ of quiz completers as email leads, keep it. If below 20%, switch to tighter gate.

3. **Key assumptions the recommendation depends on:**
   - Cold Meta traffic will invest the cognitive effort for scenario-based questions (vs. lightweight personality quizzes)
   - The scorecard richness justifies the 8-question length
   - "Diagnosis on-page, prescription in email" creates a curiosity gap rather than satisfying curiosity

4. **Risk mitigation:** The config-driven architecture means both question count and gate positioning can be changed with a code push — no structural rebuild needed. The main risk is wasted ad spend during the learning period, not a permanent architectural flaw. Budget the first 2-3 weeks as a data collection phase (this aligns with the "Pancake Principle" already documented in the handoff).

## Sources

- [Interact Quiz Conversion Rate Report 2026](https://www.tryinteract.com/blog/quiz-conversion-rate-report/) — 40.1% average conversion, 65% completion rate across 2,100 quizzes
- [Outgrow Quiz Engagement Benchmarks](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates) — 15% completion drop per question after 7, top performers at 70-80%
- [Survicate Survey Completion Rate Study](https://survicate.com/blog/survey-completion-rate/) — Completion by question count brackets
- [Brixon Group: Lead Forms in B2B](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate) — 4.1% conversion decrease per additional field (HubSpot 2024)
- [Perspective Quiz Funnel Software Review 2026](https://www.perspective.co/article/quiz-funnel-software) — Mobile-first data, 66% completion, 71% start rate
- [SurveyMonkey: Does Adding One More Question Impact Completion](https://www.surveymonkey.com/curiosity/survey_questions_and_completion_rates/) — Drop-off patterns by question count
- [Lensym: Survey Completion Rates and Drop-Off](https://lensym.com/blog/survey-completion-rates-drop-off) — Mobile drops faster than desktop per additional question
- [PLOS One: Situational Judgment Tests as Personality Measures](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0211884) — SJTs less prone to faking than self-report
- [PMC: The Social Psychology of Biased Self-Assessment](https://pmc.ncbi.nlm.nih.gov/articles/PMC6041499/) — Self-assessment unreliability
- [Wikipedia: Dunning-Kruger Effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) — Foundational reference
- [NN/g: The Peak-End Rule](https://www.nngroup.com/articles/peak-end-rule/) — Memory bias toward peak and end moments
- [Qualtrics: Survey Question Sequence, Flow & Style](https://www.qualtrics.com/experience-management/research/question-sequence-flow-style/) — Warm-up question best practices
- [FormFlux: Form Completion Rates Guide](https://formflux.io/blog/form-completion-rates-guide) — Mobile completion rates, tap targets, one-question-per-screen
- [CXL: Optimizing Mobile Forms](https://cxl.com/blog/mobile-forms/) — Mobile form conversion optimization
- [ScoreApp: Personality Quiz vs Assessment](https://www.scoreapp.com/personality-quiz-vs-assessment/) — Quiz type positioning (TOF vs BOF)
- [Typeform: Effective Question Phrasing](https://www.typeform.com/blog/response-rates-effective-question-phrasing) — Warm-up question design
- [Cathy Moore: Scenario-Based Training](https://blog.cathy-moore.com/scenarios-what-are-they-good-for/) — Deeper thinking from scenario format
- [Survey Practice: Navigation Buttons in Web Surveys](https://www.surveypractice.org/article/3054-placement-and-design-of-navigation-buttons-in-web-surveys) — Back button research
