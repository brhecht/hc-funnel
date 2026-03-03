/**
 * Vercel Serverless Function — Kit (ConvertKit) subscribe proxy.
 *
 * The frontend calls /api/subscribe instead of api.convertkit.com directly,
 * so ad blockers can't intercept the request. The API key stays server-side.
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, fields } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  const apiKey = process.env.KIT_API_KEY
  const formId = process.env.KIT_FORM_ID

  if (!apiKey || !formId) {
    return res.status(500).json({ error: "Kit not configured" })
  }

  try {
    const kitRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          fields: fields || {},
        }),
      }
    )

    const data = await kitRes.json()
    return res.status(kitRes.ok ? 200 : 400).json(data)
  } catch (err) {
    return res.status(500).json({ error: "Failed to subscribe" })
  }
}
