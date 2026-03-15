import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"
import { saveLead, subscribeToKit } from "../firebase"

// ─── Score Dots Component ─────────────────────────────────
function ScoreDots({ score, maxScore = 5, theme }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: maxScore }, (_, i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full inline-block"
          style={{
            background: i < score ? theme.dotFilled : theme.dotEmpty,
          }}
        />
      ))}
    </div>
  )
}

// ─── Calculating Pause Screen ─────────────────────────────
function CalculatingScreen({ theme }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <p
        className="text-xl font-semibold"
        style={{ color: theme.text, fontFamily: theme.headingFont }}
      >
        Calculating your results
        <span className="inline-flex ml-1">
          <span className="animate-pulse" style={{ animationDelay: "0ms" }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: "300ms" }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: "600ms" }}>.</span>
        </span>
      </p>
    </div>
  )
}

// ─── Email Capture Form ───────────────────────────────────
function EmailCapture({ theme, config, onCaptured }) {
  const [email, setEmail] = useState("")
  const [joinWaitlist, setJoinWaitlist] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    await onCaptured(email, joinWaitlist)
    setSubmitting(false)
  }

  return (
    <div
      className="p-6 md:p-8 rounded-2xl space-y-5"
      style={{ background: theme.accent, color: "#fff" }}
    >
      <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.95)" }}>
        {config.emailGate.headline}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="you@startup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-base outline-none"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: theme.text,
              border: "none",
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{
              background: theme.text,
              color: "#fff",
            }}
          >
            {submitting ? "Sending..." : config.emailGate.buttonText}
          </button>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={joinWaitlist}
            onChange={(e) => setJoinWaitlist(e.target.checked)}
            className="mt-1 w-4 h-4 shrink-0"
            style={{ accentColor: "#fff" }}
          />
          <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
            {config.emailGate.waitlistLabel}
          </span>
        </label>
      </form>

      <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
        {config.emailGate.disclaimer}
      </p>
    </div>
  )
}

// ─── Main Results Component ───────────────────────────────
export default function Results() {
  const {
    config,
    answers,
    calculating,
    setCalculating,
    calculateResults,
    resetQuiz,
    emailCaptured,
    setEmailCaptured,
  } = useFunnel()
  const { theme } = config

  // Calculating pause — 2.5 seconds
  const [showResults, setShowResults] = useState(!calculating)

  useEffect(() => {
    if (calculating) {
      const timer = setTimeout(() => {
        setCalculating(false)
        setShowResults(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [calculating, setCalculating])

  const { rawTotal, displayScores, tier } = calculateResults()
  const tierColor = theme[tier.themeColor]

  // ─── Email capture handler ──────────────────────────────
  async function handleEmailCaptured(email, joinWaitlist) {
    try {
      await saveLead({
        email,
        quizAnswers: { ...answers },
        rawTotal,
        displayScores: { ...displayScores },
        tier: tier.id,
        tierName: tier.name,
        waitlist: joinWaitlist,
      })

      // Subscribe to Kit in parallel (non-blocking)
      subscribeToKit(email, {
        tier: tier.name,
        frictionArea: tier.id,
        waitlist: joinWaitlist,
      })
    } catch (err) {
      console.error("Failed to save lead:", err)
    }
    setEmailCaptured(true)
  }

  // ─── Calculating screen ─────────────────────────────────
  if (!showResults) {
    return <CalculatingScreen theme={theme} />
  }

  // ─── Dimension order for display ────────────────────────
  const dimensionKeys = ["clarity", "investorFluency", "selfAwareness", "persuasionInstincts"]

  return (
    <div
      className="max-w-2xl mx-auto pt-6 md:pt-12 space-y-8 transition-opacity duration-500"
      style={{ opacity: showResults ? 1 : 0 }}
    >
      {/* Tier Badge */}
      <div className="text-center space-y-4">
        <div
          className="inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide text-white"
          style={{ background: tierColor }}
        >
          {tier.name}
        </div>
        <p
          className="text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          style={{ color: theme.muted }}
        >
          {tier.description}
        </p>
      </div>

      {/* Scorecard */}
      <div
        className="p-6 md:p-8 rounded-2xl space-y-6"
        style={{ background: theme.card, border: `1px solid ${theme.border}` }}
      >
        <h3
          className="text-lg font-bold"
          style={{ fontFamily: theme.headingFont, color: theme.text, letterSpacing: "-0.3px" }}
        >
          Your Scorecard
        </h3>

        <div className="space-y-6">
          {dimensionKeys.map((dimKey) => {
            const dimConfig = config.dimensions[dimKey]
            const score = displayScores[dimKey]
            const level = dimConfig.levels[score]

            return (
              <div key={dimKey} className="space-y-2">
                {/* Dimension name + dots */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: theme.text }}>
                    {dimConfig.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <ScoreDots score={score} theme={theme} />
                    <span className="text-xs font-medium" style={{ color: theme.faint }}>
                      {score}/5
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                {level && (
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {level.explanation}
                  </p>
                )}

                {/* Cracked door */}
                {level && (
                  <p
                    className="text-sm leading-relaxed italic"
                    style={{ color: theme.faint }}
                  >
                    {level.crackedDoor}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Email Gate CTA */}
      {!emailCaptured && (
        <EmailCapture
          theme={theme}
          config={config}
          onCaptured={handleEmailCaptured}
        />
      )}

      {/* Post-capture confirmation */}
      {emailCaptured && (
        <div
          className="p-6 rounded-2xl text-center space-y-3"
          style={{ background: theme.card, border: `1px solid ${theme.border}` }}
        >
          <div className="text-3xl" style={{ color: theme.accent }}>&#10003;</div>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: theme.headingFont, color: theme.text }}
          >
            Your recommendations are on the way.
          </h3>
          <p className="text-sm" style={{ color: theme.muted }}>
            Check your inbox in a few minutes.
          </p>
        </div>
      )}

      {/* Retake */}
      <div className="text-center pb-8">
        <Link
          to="/quiz"
          onClick={resetQuiz}
          className="text-sm underline underline-offset-4 transition-colors hover:opacity-80"
          style={{ color: theme.faint }}
        >
          Retake assessment
        </Link>
      </div>
    </div>
  )
}
