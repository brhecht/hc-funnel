/**
 * Vercel Serverless Function — Kit (ConvertKit) subscribe proxy.
 *
 * The frontend calls /api/subscribe instead of api.convertkit.com directly,
 * so ad blockers can't intercept the request. The API key stays server-side.
 *
 * Supports:
 *  - Custom fields (tier, friction_area, waitlist, UTMs)
 *  - Tag application via KIT_TAG_QUIZ_LEAD env var
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, fields, tags } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  const apiKey = process.env.KIT_API_KEY
  const formId = process.env.KIT_FORM_ID

  if (!apiKey || !formId) {
    return res.status(500).json({ error: "Kit not configured" })
  }

  // Build tag IDs array from env vars + any passed tag keys
  const tagIds = []
  const tagEnvMap = {
    "quiz-lead": process.env.KIT_TAG_QUIZ_LEAD,
  }
  if (Array.isArray(tags)) {
    tags.forEach((t) => {
      const envId = tagEnvMap[t]
      if (envId) tagIds.push(Number(envId))
    })
  }

  try {
    // 1. Subscribe to form with fields
    const kitRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          fields: fields || {},
          tags: tagIds.length ? tagIds : undefined,
        }),
      }
    )

    const data = await kitRes.json()

    // 2. Apply tags individually (belt-and-suspenders — Kit sometimes
    //    ignores tags on the subscribe call for existing subscribers)
    if (tagIds.length && data.subscription) {
      await Promise.allSettled(
        tagIds.map((tagId) =>
          fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: apiKey, email }),
          })
        )
      )
    }

    return res.status(kitRes.ok ? 200 : 400).json(data)
  } catch (err) {
    return res.status(500).json({ error: "Failed to subscribe" })
  }
}
