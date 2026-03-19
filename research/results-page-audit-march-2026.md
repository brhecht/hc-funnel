# Results Page & Email Capture Audit: HC Funnel
*Research memo — March 18, 2026*
*Question: Does the HC Funnel results/email capture page follow current best practices for converting quiz completers into email leads? Evaluate every element: reveal sequence, tier badge, scorecard, email gate CTA block (design, copy, placement), waitlist checkbox, form layout, post-capture confirmation, and mobile optimization.*

## TL;DR

The results page is well-structured and the content is strong. The biggest opportunities are in the email gate block itself: the **CTA headline is too long and buries the value proposition**, the **email input + button side-by-side layout will break on mobile** (stacking vertically with button full-width would be better), the **waitlist checkbox is undersized and the label is vague** ("Also notify me when the course launches" — what course?), and the **post-capture confirmation is a dead end** with no next action. The reveal sequence (calculating pause → tier badge → scorecard → email gate) is sound and matches best practices. The most impactful change would be tightening the email gate CTA copy and making the checkbox more compelling.

## What the Current Page Does

Based on the live page and code in Results.jsx:

**Full page flow (top to bottom):**
1. Calculating pause animation (2.5 seconds) — "Calculating your results..."
2. Tier badge (colored pill: "LOST IN THE NOISE" / "THE PIECES ARE THERE" / "SO CLOSE IT HURTS")
3. Tier description paragraph (centered, muted text)
4. Scorecard card (white background, bordered):
   - "Your Scorecard" heading
   - 4 dimensions, each with: dimension name + dot visualization (X/5) + explanation paragraph + cracked door line (italic, faint)
5. Email gate CTA block (coral/orange background, white text):
   - Headline: "Your scores tell you what investors see. Your full results and recommendations will show you exactly what to do about it — specific to each dimension, starting with the one that matters most."
   - Email input (placeholder "you@startup.com") + "Send My Recommendations" button (side-by-side on desktop)
   - Checkbox: "Also notify me when the course launches"
   - Disclaimer: "By submitting, you agree to receive your personalized recommendations and occasional insights from Humble Conviction. Unsubscribe anytime."
6. Post-capture confirmation (replaces email gate): checkmark + "Your recommendations are on the way." + "Check your inbox in a few minutes."
7. "Retake assessment" link
8. Footer

## Element-by-Element Audit

### 1. Calculating Pause (2.5s)

**Current:** "Calculating your results..." with animated dots, centered vertically.

**Research says:** Multiple sources confirm this is a best practice. The calculating pause creates perceived value — if results appear instantly, they feel generic. A brief processing delay (2-5 seconds) signals that something personalized is being computed (Heyflow, Typebot, OptiMonk all cite this). ThinkThemes: "Show them a 'calculating results' page with a progress bar or loading animation — it makes the whole process feel more valuable."

**Recommendation:** Keep as-is. 2.5 seconds is within the sweet spot. One optional enhancement: add a subtle progress indicator (thin bar or percentage) rather than just dots, to give a sense of forward motion. Low priority.

### 2. Tier Badge

**Current:** Colored pill badge centered above tier description. "LOST IN THE NOISE" (amber), "THE PIECES ARE THERE" (teal), "SO CLOSE IT HURTS" (green). All caps, small text, rounded-full.

**Research says:** Clear tier/result naming is critical for the emotional response. ScoreApp: "Personalized results that show what they're already doing well and what they need to work on." The tier names are evocative and specific — they don't feel generic. The color-coding creates instant visual hierarchy. All caps is standard for badge/pill elements.

**Recommendation:** Keep the names and design. One consideration: on mobile, "LOST IN THE NOISE" at uppercase may feel harsh as the very first thing the user sees after the calculating pause. The tier description softens it ("The good news: this isn't about your idea"), but the initial emotional hit is real. This is a deliberate design choice — the research on the quiz's emotional arc already accounted for ending on an aspirational note (Q8), and the calculating pause provides a buffer. The tier copy itself then pivots to hope. Keep as-is.

### 3. Tier Description

**Current:** Centered paragraph, muted color, describing the tier in encouraging but honest terms.

**Research says:** The copy is strong — each tier description validates the user ("You have real strengths"), names the problem ("important blind spots"), and opens the door ("The good news: this isn't about your idea. It's about how you're presenting it. And that's fixable."). This follows the psychological pattern of validation → diagnosis → hope that ScoreApp and Pointerpro recommend for results pages.

**Recommendation:** Keep as-is. The copy is doing exactly what it needs to.

### 4. Scorecard

**Current:** White card with border. "Your Scorecard" heading. 4 dimensions stacked vertically. Each dimension has: name (left-aligned) + dots + X/5 (right-aligned), explanation paragraph (muted), cracked door line (italic, faint).

**What works well:**
- The dot visualization is clean and instantly scannable — you can read your score before reading any text
- Each dimension has three layers of depth: score (visual) → explanation (what it means) → cracked door (why it matters and why it's fixable)
- The cracked door lines are persuasion-forward without being salesy

**What the research flags:**
- **Length.** The scorecard is 4 dimensions × 3 elements each = 12 blocks of content before the email gate. On mobile, this is substantial scrolling. The user has to scroll through the entire scorecard before seeing the email capture. Every extra scroll increases the chance they feel "I got what I came for" and bounce.
- **Visual monotony.** All 4 dimensions look identical — same layout, same typography, same spacing. There's no visual differentiation between a strong score (4/5) and a weak score (2/5) beyond the dots. ScoreApp and Pointerpro examples use color-coding per score level (green for strong, amber for mid, red for weak) to make the scorecard instantly scannable without reading every explanation.

**Recommendation:**
- Consider adding subtle color-coding to the dimension score — green dots for 4/5, navy for 3/5, amber for 2/5. This makes the scorecard scannable at a glance and creates visual variety that breaks the monotony.
- Consider whether all 4 cracked door lines are necessary before the email gate. They're strong copy, but they're also quasi-prescriptive (they hint at the fix). An alternative: show explanations on-page, gate cracked door lines behind email ("Want to know what changes?"). This would tighten the on-page content and strengthen the email gate value proposition. However, this conflicts with the trust-first approach already decided — flagging but not recommending.

### 5. Email Gate CTA Block

This is the conversion-critical element. Evaluating each piece:

#### 5a. CTA Headline

**Current:** "Your scores tell you what investors see. Your full results and recommendations will show you exactly what to do about it — specific to each dimension, starting with the one that matters most."

**Issues:**
- **Too long.** This is 39 words — nearly a paragraph. On mobile it'll be 4-5 lines of white-on-coral text. By the time the user reaches the email input, they've done significant reading. CTA headlines should be scannable in under 2 seconds (Unbounce).
- **Starts with a backward reference** ("Your scores tell you what investors see") that restates what the user already knows. The value proposition doesn't start until the second sentence.
- **"Full results and recommendations"** is vague — the user just saw their "results" (scores + explanations + cracked door lines). What additional "full results" are there? The distinction between what they've seen and what they'll get in email isn't crisp.

**Recommendation:** Shorten dramatically. Lead with what the email delivers that the page doesn't. Examples:
- "Get your personalized action plan — specific to each dimension, starting with the one that matters most."
- "We'll send you exactly what to work on first — and how."
- "Your scorecard shows the gaps. Your action plan shows the fix."

The last one is the cleanest because it makes the diagnosis/prescription split explicit in a single short line.

#### 5b. Email Input + Button Layout

**Current:** Side-by-side on desktop (`flex-col sm:flex-row`). Input is `flex-1` with button `whitespace-nowrap`.

**Issues:**
- On mobile (375px), `sm:flex-row` breaks to `flex-col`, which is correct. But the button text "Send My Recommendations" is long — on a stacked mobile layout, this will be a full-width button with a lot of text.
- The email input placeholder "you@startup.com" is good — it signals the ICP identity (startup founder). Keep.

**Recommendation:**
- Shorten button text. "Send My Recommendations" is 23 characters. Consider "Send My Action Plan" (19 chars) or "Get My Action Plan" (18 chars) — shorter, and "action plan" reinforces the diagnosis→prescription value prop. Also aligns with the shortened headline if changed.
- The side-by-side → stacked responsive behavior is correct. No layout change needed.

#### 5c. Waitlist Checkbox

**Current:** Small unchecked checkbox + "Also notify me when the course launches." Appears below the email form, above the disclaimer. Checkbox is `w-4 h-4`.

**Issues:**
- **"the course"** — what course? The user just took a pitch assessment. There's been no mention of a course anywhere in the quiz or results. This is the first time "course" appears. It's a contextual jump that the user hasn't been primed for.
- **Checkbox is small.** `w-4 h-4` = 16px. On mobile, this is hard to tap accurately. Research recommends 44px minimum tap targets. The checkbox itself doesn't need to be 44px, but the tap area (checkbox + label as a single tap target) should be.
- **"Also" is weak.** It positions the waitlist as an afterthought. The waitlist is actually your primary demand signal for whether to build the course. It deserves more prominence — or at least less dismissive framing.
- **Unchecked by default** is correct for compliance (GDPR best practice, MailerLite) and for data quality (opt-in signals genuine interest).

**Recommendation:**
- Rewrite the label to connect to the quiz experience: "I want to learn how to fix this — notify me when the program launches" or "Let me know when the pitch coaching program opens." This bridges from the assessment to the product without the cold jump to "course."
- Increase the tap area. The `label` element wraps the checkbox + text, which is good for tap area. But adding `py-2` to the label would increase the vertical tap zone. The checkbox itself at 16px is fine as long as the label tap area is generous.
- Consider moving the checkbox ABOVE the disclaimer, which it already is. Good placement.

#### 5d. Disclaimer Text

**Current:** "By submitting, you agree to receive your personalized recommendations and occasional insights from Humble Conviction. Unsubscribe anytime."

**Research says:** This is clean and compliant. It tells the user what they'll get, from whom, and how to stop. MailerLite recommends consent language that answers "What will you send? How often? What's the topic?" — this hits all three. "Unsubscribe anytime" reduces perceived risk.

**Recommendation:** Keep as-is. The only note: "occasional insights" is vague — but being more specific ("weekly emails") would be a commitment you may not want to make pre-launch. Leave it.

### 6. Post-Capture Confirmation

**Current:** Replaces the email gate block. Orange checkmark + "Your recommendations are on the way." + "Check your inbox in a few minutes."

**Issues:**
- **This is a dead end.** After the user submits their email, there's nothing to do except "Retake assessment" (why would they?) or leave. The momentum dies.
- **Research is unambiguous:** Thank you / confirmation moments are the highest-engagement moment in the funnel — the user just took action and is maximally receptive. HubSpot, Unbounce, CXL, OptinMonster all recommend using this moment for a secondary CTA: social sharing, referral prompt, calendar booking, or deeper engagement.
- **The waitlist checkbox is gone.** If the user checked it, great. If they didn't, the opportunity to ask again is lost. The confirmation could reinforce the waitlist for non-checkers.

**Recommendation:** Replace the dead-end confirmation with something that maintains momentum. Options in order of impact:
1. **Social sharing prompt:** "Know a founder who should take this? Share your results." with a share link. This is zero-cost traffic acquisition. ScoreApp reports that quizzes with shareable results generate 20-30% additional traffic.
2. **Waitlist reinforcement (for non-checkers):** "We're building something to help founders like you fix these gaps. Want early access?" — one more chance to capture waitlist intent.
3. **Expectation setting:** "Your action plan is on its way. Here's what to look for: [preview of what the email contains]." This reduces the "did it work?" anxiety and primes them to open the email.

At minimum, add the share prompt. It's the highest-leverage low-effort change.

### 7. Mobile Layout

**Current:** The page is a single scrolling column. On mobile (375px): brand header → tier badge → tier description → scorecard (4 dimensions stacked) → email gate CTA block → retake link → footer.

**Issues:**
- The scorecard is long. On mobile, the user scrolls through approximately 4 screens of scorecard content before reaching the email gate. This is a lot of scrolling between "I got my results" and "enter your email."
- The email gate block uses coral/orange background — which is visually distinct and attention-grabbing. This is good. It breaks the pattern and signals "this is different, pay attention."
- The email input and button stack vertically on mobile, which is correct.

**Recommendation:**
- The coral CTA block's visual break is a strength — it clearly signals the transition from results to action. Keep.
- Consider whether the scorecard could have a "collapsed" state on mobile — show scores + dimension names, with explanations expandable on tap. This would surface the email gate sooner without removing content. However, this adds interaction complexity that may not be worth it for V1. Flag for future optimization.

### 8. Overall Design

**Current:** Clean, minimal, consistent with the quiz and landing page. Navy text on white cards on cool-white background. Coral accent for the email gate block.

**What works:**
- The coral CTA block creates strong visual contrast against the white/gray scorecard. It's unmissable.
- Typography is consistent (Inter throughout).
- Spacing is generous — nothing feels cramped.
- The dot visualization is elegant and scannable.

**What could improve:**
- The page is entirely text-based — no icons, no visual elements, no graphics. The scorecard could benefit from a minimal visual element (a small icon per dimension, or a radar/spider chart summary at the top of the scorecard) to break the text wall. This is a nice-to-have, not critical.

## Recommendation

### Priority changes (high impact, implement before ad launch):

1. **Shorten the email gate CTA headline.** Replace with: "Your scorecard shows the gaps. Your action plan shows the fix." (or similar — 2 short sentences max). The current 39-word paragraph is too long for a CTA headline.

2. **Shorten the CTA button text.** "Send My Recommendations" → "Send My Action Plan" or "Get My Action Plan." Shorter, and "action plan" reinforces the diagnosis→prescription value prop that justifies the email gate.

3. **Rewrite the waitlist checkbox label.** "Also notify me when the course launches" → "Let me know when the pitch coaching program opens" or "I want to learn how to fix this — notify me when the program launches." Bridges from the quiz experience to the product; removes the unexplained reference to "the course."

4. **Upgrade the post-capture confirmation.** At minimum, add a share prompt: "Know a founder who should take this?" with a shareable link. At most, add waitlist reinforcement for non-checkers + expectation setting for the incoming email.

### Secondary changes (iterate post-launch):

5. **Add subtle score color-coding to the scorecard.** Green dots for 4/5, navy for 3/5, amber for 2/5. Makes the scorecard instantly scannable and breaks visual monotony.

6. **Consider a collapsed scorecard on mobile.** Show scores + names, expand explanations on tap. Surfaces the email gate sooner. Adds complexity — test only if email capture rate is below target.

7. **Add a small visual element** (radar chart, dimension icons, or summary graphic) to the top of the scorecard to break the text wall.

## Pressure Test

**Consequence check:** The email gate is the primary conversion event — every dollar of ad spend converts here or doesn't. The CTA headline, button copy, and waitlist label changes are all easily reversible text changes. The post-capture confirmation upgrade is a code change but not structurally complex. All changes are low-risk individually; collectively they optimize the highest-leverage page in the funnel.

**Consequence assessment: moderate.** The changes are individually reversible, but this page is where revenue lives. Worth a brief red team on the highest-impact change.

**Red team on shortening the CTA headline:**

Counter: The current long headline does important work — it explicitly differentiates what the user already has (scores = diagnosis) from what the email delivers (recommendations = prescription). A shorter headline like "Your scorecard shows the gaps. Your action plan shows the fix" makes the same distinction more elegantly, BUT it introduces the phrase "action plan" which hasn't appeared anywhere in the funnel. The user was promised "recommendations" (on the email gate) and "results" (on the landing page). Introducing new terminology at the conversion point could create micro-confusion: "Wait, is this different from what I was promised?"

**This is a valid concern but solvable.** If you change the CTA headline, also change the button text to match ("Send My Action Plan" vs "Send My Recommendations"). Consistency between headline and button resolves the terminology issue. The word "recommendations" is still fine too — "Your scorecard shows the gaps. Your recommendations show the fix." works equally well without introducing new terminology.

**Red team on upgrading post-capture confirmation:**

Counter: Adding a share prompt or waitlist reinforcement at the confirmation step could feel pushy — the user just gave you their email, and now you're asking for more. The "your recommendations are on the way" simplicity creates a clean, satisfying ending that respects the user's time and attention.

**This has merit.** The HC brand is trust-first, not maximizer. A heavy post-capture upsell would contradict the tone. The solution: keep the confirmation clean and warm, and add ONE light secondary element (share link, not a hard push). "Know a founder who needs this? Share your results." is an invitation, not a demand. It matches the conversational HC tone. Don't add multiple secondary CTAs — pick one.

**Final synthesis:** All priority recommendations hold. Use "recommendations" not "action plan" in the button to maintain terminology consistency. Add one light share prompt to the confirmation, not multiple secondary CTAs.

## Sources

- [Heyflow: 16 Quiz Funnel Examples](https://heyflow.com/blog/quiz-funnel-examples/) — Results page patterns from Lemonade, Hims, V Shred, etc.
- [ScoreApp: Quiz Results Page Best Practices](https://www.scoreapp.com/quiz-results-page/) — Scorecard design, personalization
- [OpinionStage: How to Create a Quiz Results Page](https://www.opinionstage.com/blog/quiz-results-page/) — Layout, visual elements
- [Pointerpro: Quiz Landing Page Examples](https://pointerpro.com/blog/quiz-landing-page-examples/) — Results flow patterns
- [Unbounce: 5 Thank You Pages That Take Post-Conversion to the Next Level](https://unbounce.com/conversion-rate-optimization/thank-you-pages/) — Post-capture confirmation optimization
- [HubSpot: Anatomy of Conversion-Optimized Thank You Pages](https://blog.hubspot.com/blog/tabid/6307/bid/30650/the-anatomy-of-conversion-optimized-thank-you-pages.aspx) — Secondary CTAs on confirmation
- [CXL: Creating The Perfect Thank You Page](https://cxl.com/blog/thank-you-page/) — Post-conversion momentum
- [OptinMonster: Thank You Page Examples](https://optinmonster.com/anatomy-of-the-perfect-thank-you-page/) — Social sharing, referral prompts
- [MailerLite: GDPR Opt-In Form Best Practices](https://www.mailerlite.com/blog/how-to-create-opt-in-forms-that-still-work-under-gdpr) — Checkbox state, consent language
- [Omnisend: Email Capture Best Practices 2026](https://www.omnisend.com/blog/email-capture/) — Form design, CTA copy
- [Elfsight: Web Form Design Best Practices 2025](https://elfsight.com/blog/website-form-best-practices/) — Multi-step layouts, mobile forms
- [VWO: High Converting CTA Buttons](https://vwo.com/blog/high-converting-call-to-action-button-examples/) — Button copy research, "My" vs "Your"
- [Smartrmail: How to Design CTAs to Improve Email Capture Rates](https://www.smartrmail.com/blog/improve-email-capture-rates/) — CTA design principles
