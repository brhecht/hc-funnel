import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFunnel } from '../context/FunnelContext'

export default function Results() {
  const { config, calculateArchetype, resetQuiz } = useFunnel()
  const { theme, email } = config
  const { archetype, totalScore } = calculateArchetype()

  const [emailInput, setEmailInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!emailInput.trim()) return

    setSubmitting(true)

    // TODO: Wire to Kit API
    // POST to Kit form with email + archetype tag
    // For now, just simulate success
    if (email.formId) {
      try {
        await fetch(`https://api.convertkit.com/v3/forms/${email.formId}/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: import.meta.env.VITE_KIT_API_KEY,
            email: emailInput,
            tags: email.tagByArchetype ? [archetype.id] : [],
          }),
        })
      } catch (err) {
        console.error('Kit submission error:', err)
      }
    }

    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 md:pt-16 space-y-10">
      {/* Archetype result */}
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>
          Your Founder Archetype
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {archetype.name}
        </h1>
        <p className="text-lg leading-relaxed max-w-lg mx-auto" style={{ color: theme.muted }}>
          {archetype.description}
        </p>
      </div>

      {/* Email capture */}
      <div
        className="p-8 rounded-2xl border space-y-5"
        style={{
          background: `${theme.bg}cc`,
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {submitted ? (
          <div className="text-center space-y-3 py-4">
            <div className="text-3xl">&#10003;</div>
            <h3 className="text-xl font-semibold">You're in.</h3>
            <p style={{ color: theme.muted }}>
              Check your inbox — we'll send your personalized playbook shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-center">
              {archetype.cta}
            </h3>
            <p className="text-sm text-center" style={{ color: theme.muted }}>
              Drop your email and we'll send you a personalized action plan based on your results.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="you@startup.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border text-base outline-none focus:ring-2"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: theme.text,
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] whitespace-nowrap"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                  color: theme.bg,
                }}
              >
                {submitting ? 'Sending...' : 'Get My Playbook'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Retake */}
      <div className="text-center">
        <Link
          to="/quiz"
          onClick={resetQuiz}
          className="text-sm underline underline-offset-4 transition-colors hover:opacity-80"
          style={{ color: theme.muted }}
        >
          Retake assessment
        </Link>
      </div>
    </div>
  )
}
