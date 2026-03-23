/**
 * Vercel Serverless Function — Personalized Action Plan Email
 *
 * Flow: User submits email on Results page →
 *   1. Build prompt from user's scores/tier/answers
 *   2. Call Claude API (Sonnet) to generate personalized action plan
 *   3. Run 3-layer self-eval audit (recipient sim, course flow, parity check)
 *   4. Wrap response in HC-branded HTML email with hardcoded intro
 *   5. Send via Resend
 *   6. Return 200
 *
 * Prompt template: ACTION-PLAN-PROMPT.md (Brian's final version, March 19 2026)
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY — Claude API key
 *   RESEND_API_KEY    — Resend API key
 *   RESEND_FROM_EMAIL — e.g. results@humbleconviction.com
 *   LAUNCH_STATUS     — "pre_launch" (default) or "post_launch"
 */

// Dimension key → human label
const DIM_LABELS = {
  clarity: "Clarity",
  investorFluency: "Investor Fluency",
  selfAwareness: "Self-Awareness",
  persuasionInstincts: "Persuasion Instincts",
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const {
    email,
    tier,
    tierName,
    displayScores,
    rawDimensions,
    weakestDimension,
    weakestScore,
    secondWeakest,
    secondWeakestScore,
    strongestDimension,
    strongestScore,
    answers,
    answerLabels,
    waitlistStatus,
    scorecardCopy,
  } = req.body || {}

  if (!email || !tier) {
    return res.status(400).json({ error: "email and tier are required" })
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || "results@humbleconviction.com"
  const launchStatus = process.env.LAUNCH_STATUS || "pre_launch"

  if (!anthropicKey || !resendKey) {
    return res.status(500).json({ error: "API keys not configured" })
  }

  try {
    // 1. Generate action plan with Claude
    const actionPlan = await generateActionPlan({
      anthropicKey,
      tier,
      tierName,
      displayScores,
      rawDimensions,
      weakestDimension,
      weakestScore,
      secondWeakest,
      secondWeakestScore,
      strongestDimension,
      strongestScore,
      answers,
      answerLabels,
      waitlistStatus,
      launchStatus,
      scorecardCopy,
    })

    // 2. Run self-eval audit and get revised version
    const auditedPlan = await auditActionPlan({
      anthropicKey,
      actionPlan,
      quizAnswers: Object.entries(answers || {}).map(([qId, optId]) => {
        const label = answerLabels?.[qId] || ""
        return `${qId}: ${optId}${label ? ` — "${label}"` : ""}`
      }).join("\n"),
      displayScores,
    })

    // 3. Build HTML email
    const html = buildEmailHtml({ tierName, actionPlan: auditedPlan })

    // 4. Send via Resend
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Brian Hecht <${fromEmail}>`,
        to: [email],
        subject: "Your personalized pitch action plan is ready",
        html,
      }),
    })

    if (!sendRes.ok) {
      const err = await sendRes.json().catch(() => ({}))
      console.error("Resend error:", err)
      return res.status(500).json({ error: "Failed to send email" })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error("Action plan error:", err)
    return res.status(500).json({ error: "Failed to generate action plan" })
  }
}

/**
 * Call Claude API to generate a personalized action plan.
 * Prompt from ACTION-PLAN-PROMPT.md (Brian's final, March 19 2026).
 */
async function generateActionPlan({
  anthropicKey,
  tier,
  tierName,
  displayScores,
  rawDimensions,
  weakestDimension,
  weakestScore,
  secondWeakest,
  secondWeakestScore,
  strongestDimension,
  strongestScore,
  answers,
  answerLabels,
  waitlistStatus,
  launchStatus,
  scorecardCopy,
}) {
  const allScores = JSON.stringify(displayScores || {})
  const quizAnswers = Object.entries(answers || {}).map(([qId, optId]) => {
    const label = answerLabels?.[qId] || ""
    return `${qId}: ${optId}${label ? ` — "${label}"` : ""}`
  }).join("\n")
  const wLabel = DIM_LABELS[weakestDimension] || weakestDimension
  const swLabel = DIM_LABELS[secondWeakest] || secondWeakest
  const sLabel = DIM_LABELS[strongestDimension] || strongestDimension

  const prompt = `You are Brian Hecht writing a personalized action plan email. Brian is a venture investor (Venture Partner at ERA Accelerator), 4x exited founder, and has analyzed 2,500+ startup pitches from the investor side of the table. He also lectures at Columbia Business School on pitching.

The recipient just took the Humble Conviction Investor Assessment — an 8-question scenario-based quiz that scored them on 4 dimensions of pitch readiness. They've already seen their scorecard on the web page (the "Scorecard"). This email is the "Action Plan" — a deeper, personalized follow-up that delivers NEW insight, not a restatement of the scorecard.

Their results:
- Tier: ${tierName} (${tier})
- Weakest dimension: ${wLabel} (${weakestScore}/5)
- Second weakest: ${swLabel} (${secondWeakestScore}/5)
- Strongest dimension: ${sLabel} (${strongestScore}/5)
- Full scores: ${allScores}
- Their specific quiz answers: ${quizAnswers}
- Waitlist status: ${waitlistStatus || "not_on_waitlist"}

IMPORTANT — Reference their specific quiz answers where natural. For example, if they chose "Start with your background" on Q1, you can say "You mentioned you'd lead with your background — in my experience, that instinct tends to work against founders because..." This is the single most powerful personalization tool — it makes the email feel like you actually reviewed their specific responses, not just their scores. But NEVER overreach: you have 8 quiz answers, not a window into their meetings. Frame observations as patterns you recognize, not diagnoses of their specific situation.

ALSO IMPORTANT — Here is the EXACT copy they already saw on the Scorecard for each dimension. DO NOT repeat, closely paraphrase, or echo any of this language. Every sentence in this email must be NEW insight they haven't read:
${scorecardCopy || ""}

## Voice & Tone

Write in first person as Brian. The tone is a mentor who genuinely likes this person and sees their potential — but is going to be honest about the problems. Think of a tutor with an underperforming student: not coddling, but meeting them where they are. "Hey buddy, that wasn't half bad. But I see some things I've seen a lot, and I can help you fix them." The reader should feel SEEN and ENCOURAGED, not judged or diagnosed.

This means: when describing their weaknesses, frame them as RECOGNIZABLE PATTERNS ("I've seen this before, and I know what it looks like") not as personal failings ("your clarity is bad"). The reader should feel like you're letting them in on something, not pointing out what's wrong with them.

Sound like the newsletters — conversational, anecdote-driven, direct but warm. NOT like a coach, a professor, or a marketing email.

Key phrases and patterns from Brian's actual writing:
- Starts insights with "Here's the thing..." or "One thing I've found..."
- Uses specific anecdotes from ERA: "At ERA, I used to..." or "I had a founder once who..."
- Calls out patterns, not people: "Here's what this pattern usually looks like from the investor side of the table..."
- Uses contrast to make points: "Founders who struggle do X. Founders who get funded do Y."
- Hates jargon: prefers "use" over "leverage," "help" over "empower," "earn" over "monetize"
- Short paragraphs — never more than 3 sentences
- Talks TO the reader, not AT them

Brian's core teaching principles (draw on these for advice):
- "The breakthrough never comes from polishing — it comes from ruthlessly stripping things down to the essentials."
- "Always start with 'what is it.' Not the problem, not the backstory — what is it, who is it for, why does it matter."
- "The goal of a pitch isn't answers — it's questions. If the investor is asking questions, you're winning."
- "What you say should sound like magic — specific, visual, and impossible to forget."
- "Investors don't fund spending — they fund progress."
- "Don't talk too much. Fewer, better words. Know when to shut up."
- "There's always a question behind the question."
- "VCs are human too — speak to them like a human being, not the King of Siam."
- "At Demo Day, no one remembers your name. They remember 'that guy who does construction stuff.'"
- "True cliché: show, don't tell."
- "Speak with humble conviction — not a steamroller, not a pushover."

## Structure (follow this exactly)

Use these section markers so the endpoint can apply formatting:

### [HOLISTIC]
One paragraph (3-5 sentences). This is the mentor-meets-student moment. Synthesize ACROSS the dimensions — don't list scores, interpret the PATTERN. Frame it as recognition, not diagnosis: "Your scores follow a pattern I've seen often..." The tone should make them feel like you're letting them in on something — "I recognize you, I've seen this before, and I know how this story can go." Explain what the COMBINATION means. End with genuine encouragement that validates coaching — not cheerleading, but honest optimism. Also, plant a seed that a structured approach to fixing these patterns exists — something like "I've spent years turning these patterns into a framework that helps founders fix them" or "The patterns are consistent enough that I've built a system around addressing them." Do NOT name the course yet.

### [WEAKEST] — ${wLabel}
The main event — roughly 40% of the email.
- Name the dimension as a bold header.
- 2-3 sentences explaining what their score means IN PRACTICE. Ground this in THEIR SPECIFIC QUIZ ANSWERS — reference what they chose and explain what that choice reveals about their current approach. Do NOT invent scenarios about what happens in their investor meetings (you weren't there). Instead, explain the PATTERN you've seen in founders who think this way: "When founders lead with X approach, what tends to happen is..." Use "often," "tends to," "in my experience" — never state as fact what you're inferring from 8 quiz answers. DO NOT repeat the scorecard explanation.
- One specific, concrete action step. Not "practice your pitch" — something they could do TODAY.
- Course mention (FIRST INTRODUCTION — see Course Mention Architecture above): introduce the course naturally as part of the action step. Connect to the relevant module:
  - Clarity: "the 30-second pitch module" or "building your one-liner"
  - Investor Fluency: "reading the room" or "the four types of investor questions"
  - Self-Awareness: "learning from investor feedback"
  - Persuasion Instincts: "the conversation framework" or "storytelling for investors"
  - Waitlist CTA: ${waitlistStatus === "on_waitlist" ? "\"You're already on the early access list — you'll be first to know when it opens.\"" : launchStatus === "post_launch" ? "Include link to course page." : "\"If you want early access when it launches, just reply 'interested' and I'll add you.\""}
- End with a two-line contrast closer. BOTH lines must use IDENTICAL formatting — each wrapped in single asterisks, each on its own line, with a blank line between them. No other markup (no bold, no extra asterisks). Format EXACTLY:

*Founders who struggle [common mistake].*

*Founders who get funded [counterintuitive truth].*

### [SECOND] — ${swLabel}
Shorter — roughly 20% of the email.
- Bold dimension name as header.
- 1-2 sentences on what the score means practically, grounded in their specific answer for this dimension. Same rules as WEAKEST: reference what they chose, explain the pattern it reveals, never fabricate scenarios or state as fact what you're inferring. New insight, not scorecard repetition.
- One sentence pointing them in the right direction with a concrete action or reframe.
- Course callback (ONE sentence MAX — see Course Mention Architecture): reference the course as already-introduced, e.g. "The course also covers..." or "There's a module on this too." Do NOT re-introduce it.
- Pithy closer in italic (same two-line format).

### [STRENGTH] — ${sLabel}
Brief — roughly 10% of the email.
- Bold dimension name as header.
- 1-2 sentences acknowledging the strength genuinely — why this specific strength matters and how it gives them an edge.
- One sentence on how to leverage this strength or take it further.

### [FOURTH]
If there's a 4th dimension not yet addressed:
- Bold dimension name as header.
- 1-2 sentences — this section is brief but NOT throwaway. Mid-range scores (2-3/5) deserve care: the reader may feel "average" here, which stings more than a clear weakness. Acknowledge where they are with specificity, and give them ONE concrete thing to think about or try. Every dimension must leave the reader with something actionable, regardless of score level. Never just label a score without a direction forward.

### [CLOSING]
2-3 sentences. Bring it back to the big picture. Frame the gap as smaller than they think — but only if they work on the right things in the right order.

Sign off: "— Brian"

### [PS]
Output this EXACT text as the PS (do not generate your own):
${waitlistStatus === "on_waitlist" ? "P.S. — You're on the early access list for the course. I'll let you know as soon as it opens." : launchStatus === "post_launch" ? "P.S. — Everything in this action plan is covered in depth in Pitch Better, Get Funded Faster." : "P.S. — I'm building a course around exactly what your scorecard revealed. Reply 'interested' if you want early access when it launches."}

## Course Mention Architecture (follow this precisely)

The course must be introduced and referenced with intentional narrative flow, not scattered randomly. Follow this exact sequence:

1. **[HOLISTIC] — Plant the seed.** Mention that you've built a framework/system around these patterns. Do NOT name the course, do NOT link it, do NOT say "I'm building a course." Just hint that a structured approach exists: "I've spent years turning these patterns into a framework that helps founders fix them."

2. **[WEAKEST] — First real mention.** This is where the reader first learns a course exists. Introduce it naturally as part of the action step: "The course I'm building tackles exactly this — [specific module]." This is the ONE section where the course gets a proper introduction. Include the waitlist/access CTA here.

3. **[SECOND] — Callback only.** One sentence MAX. Must reference the course as already-introduced: "The course also covers..." or "There's a module on this too." Never re-introduce it as if the reader hasn't heard about it yet.

4. **[STRENGTH], [FOURTH], [CLOSING] — No course mentions.** These sections are pure coaching. Zero promotion. The reader should finish the email feeling coached, not sold to.

5. **[PS] — Final CTA.** This is hardcoded (not AI-generated). It handles the waitlist/launch CTA.

**Total course mentions in the AI-generated portion: exactly 2** (one intro in WEAKEST, one callback in SECOND). If you find yourself writing a third, delete it.

## What NOT to do
- DO NOT repeat or closely paraphrase the scorecard copy.
- DO NOT give generic advice. Be specific. Use Brian's actual exercises and frameworks.
- DO NOT hard-sell the course. Content-to-promotion ratio must be at least 5:1 in every section. Maximum 1 sentence of Eddy nudge per section.
- DO NOT use jargon.
- DO NOT exceed 700 words. Aim for 500-600.
- DO NOT use bullet points or numbered lists. Prose only, with section headers.
- DO NOT start any section with "Great news!" or "Congratulations!" or any false enthusiasm.
- DO NOT use emojis.
- DO NOT invent specific anecdotes about ERA events, Demo Days, cohorts, or name specific founders. Keep anecdotes generic enough to be unfalsifiable.
- Maximum 2-3 sentences per paragraph.
- DO NOT use absolutes. Use "often," "tend to," "in my experience."
- When referencing weaker dimensions, use RELATIVE language ("lower," "not as strong") not ABSOLUTE labels ("low," "weak," "bad").
- Never make a claim without the payoff.
- The FIRST SENTENCE of each section must work as a standalone insight for skimmers.
- CONTEXT ANCHORING: Each dimension section must re-establish what the quiz asked and what the reader chose before interpreting it. The reader took this quiz days ago — they don't remember which question mapped to which dimension. A brief anchor like "On the question about [topic], you chose [their answer]..." before the interpretation. Never jump straight into analysis of an answer without reminding the reader what the question was about.`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(`Claude API error: ${JSON.stringify(err)}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text || "Unable to generate action plan."
}

/**
 * 3-layer self-eval audit. Reads the draft action plan as the recipient would,
 * flags issues, and returns a revised version.
 *
 * Layer 1: Recipient Simulation — flags sentences that feel fabricated or overreaching
 * Layer 2: Course Flow Audit — checks introduction/callback/frequency
 * Layer 3: Parity Check — ensures every dimension has an action item, parallel structures match
 */
async function auditActionPlan({ anthropicKey, actionPlan, quizAnswers, displayScores }) {
  const auditPrompt = `You are an editor reviewing a personalized action plan email before it gets sent. Your job is to read this email AS THE RECIPIENT would read it, flag problems, and return a revised version.

The recipient is a startup founder who took an 8-question scenario-based quiz. Here are their answers:
${quizAnswers}

Their scores: ${JSON.stringify(displayScores || {})}

Here is the draft action plan email:
---
${actionPlan}
---

Run these three audit layers and revise the email:

## Layer 1: Recipient Simulation
Read every sentence as the founder who answered those specific questions. Flag and fix any sentence where:
- You'd think "that's not what I said" or "how would you know that?" — the writer is fabricating a scenario about your meetings that you never described
- You'd think "that doesn't apply to me" — the writer is being too specifically diagnostic based on limited information
- A claim is stated as definitive fact rather than a pattern ("investors can't..." → "investors often struggle to...")
- Something references a quiz answer without reminding you what the question was about

## Layer 2: Course Flow Audit
Read the full email top to bottom and check:
- Where does the reader FIRST learn a course exists? It should be in the WEAKEST section, not before.
- The HOLISTIC section should only hint that a framework/system exists — NOT name or describe the course.
- Is there exactly ONE callback in the SECOND section that references the course as already-introduced?
- Are there any course mentions in STRENGTH, FOURTH, or CLOSING? There should be ZERO.
- Total course mentions in the body (excluding PS): exactly 2. Fix if more or fewer.
- Does any mention feel like it interrupts the coaching value or reads as a sales pitch?

## Layer 3: Parity Check
- Does EVERY dimension section (including FOURTH/STRENGTH) end with something actionable or a concrete direction forward? Mid-range scores (2-3/5) need MORE care, not less — fix any section that just labels a score without a prescription.
- Are the "Founders who struggle / Founders who get funded" contrast pairs formatted identically? Both lines must be wrapped in single *asterisks* with identical markup. Fix any asymmetry.
- Do all section markers ([HOLISTIC], [WEAKEST], etc.) appear exactly once and in the correct order?

## Output
Return ONLY the revised action plan text. Keep ALL section markers ([HOLISTIC], [WEAKEST], [SECOND], [STRENGTH], [FOURTH], [CLOSING], [PS]) in place — the rendering engine needs them. Do not add commentary, explanations, or notes about what you changed. Just output the clean revised email text, ready to send.

If the draft is already good and passes all three layers, return it unchanged.`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [{ role: "user", content: auditPrompt }],
    }),
  })

  if (!response.ok) {
    // If audit fails, fall back to the original — don't block the email
    console.error("Audit API error, falling back to original:", await response.text().catch(() => ""))
    return actionPlan
  }

  const data = await response.json()
  return data.content?.[0]?.text || actionPlan
}

/**
 * Wrap the action plan text in HC-branded HTML email.
 * White bg, max-width 600px, Inter font, 15px body, 1.7 line-height.
 * Brian header, hardcoded intro, section headers with dividers,
 * contrast closers with coral left border, HC footer + unsubscribe.
 */
function buildEmailHtml({ tierName, actionPlan }) {
  // Parse section markers and format accordingly
  const formatted = formatActionPlan(actionPlan)

  const INTRO_TEXT = `I'm Brian Hecht — venture investor, 4x exited founder, and the person behind the assessment you just took. I've always been passionate about helping founders tell their story, and nothing gives me more satisfaction than when focused coaching helps a founder get funded and take the next step toward building something great.`

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F8F9FC; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8F9FC; padding: 32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #FFFFFF; border-radius: 12px; padding: 40px 32px; border: 1px solid rgba(26,35,50,0.08);">
        <tr><td>

          <!-- Header: Brian's headshot + name + HC -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
            <tr>
              <td style="vertical-align: middle; padding-right: 12px;">
                <img src="https://quiz.humbleconviction.com/brian-headshot.jpg" alt="Brian Hecht" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; display: block; object-fit: cover;" />
              </td>
              <td style="vertical-align: middle;">
                <p style="margin: 0; font-size: 15px; font-weight: 700; color: #1A2332;">Brian Hecht</p>
                <p style="margin: 2px 0 0; font-size: 13px; color: #5A6578;">Humble Conviction</p>
              </td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 16px 0 24px;">

          <!-- Hardcoded intro -->
          <p style="margin: 0 0 24px; font-size: 14px; font-style: italic; color: #5A6578; line-height: 1.7;">
            ${INTRO_TEXT}
          </p>

          <!-- Action plan content -->
          <div style="font-size: 15px; color: #1A2332; line-height: 1.7;">
            ${formatted}
          </div>

          <!-- Footer divider -->
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0 24px;">

          <!-- Footer -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <p style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #1A2332;">Humble Conviction</p>
              <p style="margin: 0 0 12px; font-size: 12px; color: #5A6578;">Investor-Tested Insights</p>
              <p style="margin: 0 0 8px; font-size: 11px; color: #9CA3AF;">
                <a href="https://www.youtube.com/@HumbleConviction" style="color: #E8845A; text-decoration: none;">YouTube</a>
                &nbsp;&middot;&nbsp;
                <a href="https://humbleconviction.com" style="color: #9CA3AF; text-decoration: none;">humbleconviction.com</a>
              </p>
              <p style="margin: 0; font-size: 10px; color: #C0C5CE;">
                You're receiving this because you completed the Humble Conviction Pitch Assessment.
                <a href="https://humbleconviction.com/unsubscribe" style="color: #C0C5CE; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td></tr>
          </table>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/**
 * Parse Claude's section-marked output into formatted HTML.
 * Handles: [HOLISTIC], [WEAKEST], [SECOND], [STRENGTH], [FOURTH], [CLOSING], [PS]
 * Contrast closers (italic lines starting with *) get coral left border.
 * Section headers get bold formatting with divider above.
 */
function formatActionPlan(text) {
  // Remove section markers but use them for formatting
  let html = text

  // Replace section markers with styled headers
  // Flexible: matches with or without ### prefix, handles ## and ### and bare [MARKER]
  const sectionDivider = '<hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0 16px;">'
  const sectionHeader = (title) => `${sectionDivider}<p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#1A2332;">${title}</p>`

  html = html.replace(/^#{0,3}\s*\[HOLISTIC\][^\n]*/gm, "")
  html = html.replace(/^#{0,3}\s*\[WEAKEST\]\s*[-—]?\s*(.*)/gm, (_, title) => sectionHeader(title.trim()))
  html = html.replace(/^#{0,3}\s*\[SECOND\]\s*[-—]?\s*(.*)/gm, (_, title) => sectionHeader(title.trim()))
  html = html.replace(/^#{0,3}\s*\[STRENGTH\]\s*[-—]?\s*(.*)/gm, (_, title) => sectionHeader(title.trim()))
  html = html.replace(/^#{0,3}\s*\[FOURTH\]\s*[-—]?\s*(.*)/gm, (_, title) => title.trim() ? sectionHeader(title.trim()) : sectionDivider)
  html = html.replace(/^#{0,3}\s*\[CLOSING\][^\n]*/gm, sectionDivider)
  html = html.replace(/^#{0,3}\s*\[PS\][^\n]*/gm, sectionDivider)
  // Also catch "Output this EXACT text as the PS" instruction if Claude echoes it
  html = html.replace(/Output this EXACT text as the PS[^\n]*/gm, "")

  // Catch remaining markdown headers (### Title or ## Title) that weren't part of a section marker
  // Also strip any leftover [BRACKETS] from the title text
  html = html.replace(/^#{1,3}\s+(.+)$/gm, (_, title) => {
    const clean = title.replace(/\[([^\]]*)\]/g, "$1").trim()
    return clean ? sectionHeader(clean) : ""
  })

  // Strip any remaining standalone [SECTION_MARKER] lines Claude may output
  html = html.replace(/^\[(?:HOLISTIC|WEAKEST|SECOND|STRENGTH|FOURTH|CLOSING|PS|INTRO)\][^\n]*/gm, "")
  // Strip leftover brackets around dimension names (e.g., "[Investor Fluency]" → "Investor Fluency")
  html = html.replace(/\[([A-Z][^\]]{2,})\]/g, "$1")

  // Bold text: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")

  // Contrast closers: lines wrapped in single *italics* — both lines get identical styling
  // Both "struggle" and "get funded" lines should be same size, weight, color — visual parity
  html = html.replace(/^\*([^*]+)\*$/gm, '<p style="margin:4px 0;font-size:15px;font-style:italic;color:#1A2332;border-left:3px solid #E8845A;padding-left:16px;line-height:1.6;">$1</p>')

  // Convert remaining paragraphs (double newline separated)
  const blocks = html.split(/\n\n+/).filter(Boolean)
  const formatted = blocks.map((block) => {
    block = block.trim()
    // Already has HTML tags (our formatted sections)
    if (block.startsWith("<")) return block
    // Sign-off
    if (block.trim() === "— Brian") {
      return '<p style="margin:24px 0 0;font-size:15px;font-weight:600;color:#1A2332;">— Brian</p>'
    }
    // PS section
    if (block.startsWith("P.S.")) {
      return `<p style="margin:0 0 16px;font-size:14px;color:#5A6578;line-height:1.7;">${block.replace(/\n/g, "<br>")}</p>`
    }
    // Regular paragraph
    return `<p style="margin:0 0 16px;line-height:1.7;">${block.replace(/\n/g, "<br>")}</p>`
  }).join("")

  return formatted
}
