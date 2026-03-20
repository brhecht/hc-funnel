/**
 * Vercel Serverless Function — Personalized Action Plan Email
 *
 * Flow: User submits email on Results page →
 *   1. Build prompt from user's scores/tier
 *   2. Call Claude API (Sonnet) to generate personalized action plan
 *   3. Wrap response in HC-branded HTML email
 *   4. Send via Resend
 *   5. Return 200
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY — Claude API key
 *   RESEND_API_KEY    — Resend API key
 *   RESEND_FROM_EMAIL — e.g. results@humbleconviction.com
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, tier, tierName, displayScores, rawDimensions, weakestDimension, answers } = req.body || {}

  if (!email || !tier) {
    return res.status(400).json({ error: "email and tier are required" })
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || "results@humbleconviction.com"

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
      answers,
    })

    // 2. Build HTML email
    const html = buildEmailHtml({ tierName, actionPlan })

    // 3. Send via Resend
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Humble Conviction <${fromEmail}>`,
        to: [email],
        subject: `Your Pitch Assessment Action Plan — ${tierName}`,
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
 * Brian will define the final prompt template — this is the scaffold.
 */
async function generateActionPlan({ anthropicKey, tier, tierName, displayScores, rawDimensions, weakestDimension, answers }) {
  // TODO: Brian defines final prompt content/tone/structure (Task B8)
  // Individual answer data is now available for Brian's final prompt to use
  const answersBlock = Object.entries(answers || {}).map(([qId, optId]) => `  ${qId}: ${optId}`).join("\n")

  const prompt = `You are a pitch coaching expert at Humble Conviction. A founder just completed our Pitch Readiness Assessment.

Their results:
- Tier: ${tierName} (${tier})
- Clarity: ${displayScores?.clarity || "?"}/5
- Investor Fluency: ${displayScores?.investorFluency || "?"}/5
- Self-Awareness: ${displayScores?.selfAwareness || "?"}/5
- Persuasion Instincts: ${displayScores?.persuasionInstincts || "?"}/5
- Weakest dimension: ${weakestDimension || "unknown"}
- Raw scores (0-4 per dimension): Clarity ${rawDimensions?.clarity ?? "?"}/4, Investor Fluency ${rawDimensions?.investorFluency ?? "?"}/4, Self-Awareness ${rawDimensions?.selfAwareness ?? "?"}/4, Persuasion Instincts ${rawDimensions?.persuasionInstincts ?? "?"}/4

Individual answers (questionId: selectedOptionId):
${answersBlock}

Here's the question → answer mapping for reference (so you can interpret what each answer means):
- q1_clarity (clarity): a=problem-first(1pt), b=what-who-why(2pt BEST), c=background-first(0pt), d=traction-first(0pt)
- q2_persuasion (persuasionInstincts): a=open-deck-immediately(0pt), b=conversation-first(2pt BEST), c=let-them-choose(1pt), d=send-deck-beforehand(0pt)
- q3_fluency (investorFluency): a=strong-signal(0pt), b=polite-pass(0pt), c=timing-assessment(2pt BEST), d=promising(1pt)
- q4_awareness (selfAwareness): a=hard-to-explain(0pt), b=clarity-problem(2pt BEST), c=need-more-detail(0pt), d=deck-issue(1pt)
- q5_clarity (clarity): a=good-sign(0pt), b=buried-model(2pt BEST), c=testing-you(1pt), d=power-move(0pt)
- q6_fluency (investorFluency): a=move-on(0pt), b=ask-why(0pt), c=gracious-reply-nurture(2pt BEST), d=send-new-data(1pt)
- q7_awareness (selfAwareness): a=delivery-issue(1pt), b=confirms-simplify(2pt BEST), c=trim-but-non-negotiable(0pt), d=not-an-investor(0pt)
- q8_persuasion (persuasionInstincts): a=full-picture(0pt), b=tight-30-sec-stop(2pt BEST), c=ask-what-they-invest(1pt), d=high-level-caveat-early(0pt)

Write a personalized action plan for this founder. Focus on their weakest dimension first, then give 1-2 actionable tips for each other dimension. Keep it direct, practical, and under 500 words. Use "you" voice. No fluff. End with a single motivating sentence that reflects Humble Conviction's philosophy: it's a conversation, not a pitch.`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
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
 * Wrap the action plan text in HC-branded HTML email.
 * Plain-text-forward design (research: 42% more clicks for plain text with cold traffic).
 */
function buildEmailHtml({ tierName, actionPlan }) {
  // Convert newlines to paragraphs
  const paragraphs = actionPlan
    .split("\n\n")
    .filter(Boolean)
    .map((p) => `<p style="margin: 0 0 16px; line-height: 1.6;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("")

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F8F9FC; font-family: 'Inter', -apple-system, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8F9FC; padding: 32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background: #FFFFFF; border-radius: 12px; padding: 32px; border: 1px solid rgba(26,35,50,0.08);">
        <tr><td>
          <!-- Header -->
          <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #E8845A;">
            Your Action Plan
          </p>
          <h1 style="margin: 0 0 24px; font-size: 22px; font-weight: 700; color: #1A2332; line-height: 1.3;">
            ${tierName}
          </h1>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid rgba(26,35,50,0.08); margin: 0 0 24px;">

          <!-- Action plan content -->
          <div style="font-size: 15px; color: #1A2332;">
            ${paragraphs}
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid rgba(26,35,50,0.08); margin: 24px 0;">

          <!-- Footer -->
          <p style="margin: 0 0 8px; font-size: 13px; color: #5A6578; line-height: 1.5;">
            This action plan was generated based on your assessment results by <strong>Humble Conviction</strong> — built from 2,500+ pitches coached by a 4x exited founder and venture investor.
          </p>
          <p style="margin: 0; font-size: 13px; color: #9CA3AF;">
            <a href="https://www.youtube.com/@HumbleConviction" style="color: #E8845A; text-decoration: none;">Watch Brian on YouTube →</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
