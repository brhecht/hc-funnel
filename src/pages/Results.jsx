import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"
import { saveLead, subscribeToKit, requestActionPlan, updateLead } from "../firebase"
import { trackPixelEvent } from "../hooks/useMetaPixel"
import { trackGA } from "../utils/analytics"

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
      <div className="space-y-2">
        <p className="text-lg md:text-xl font-bold leading-snug" style={{ color: "#fff" }}>
          {config.emailGate.headline}
        </p>
        {config.emailGate.subline && (
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            {config.emailGate.subline}
          </p>
        )}
      </div>

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

        <div className="space-y-1.5">
          {config.emailGate.waitlistBridge && (
            <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.7)" }}>
              {config.emailGate.waitlistBridge}
            </p>
          )}
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={joinWaitlist}
              onChange={(e) => setJoinWaitlist(e.target.checked)}
              className="mt-0.5 w-5 h-5 shrink-0"
              style={{ accentColor: "#fff" }}
            />
            <span className="text-sm leading-snug font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
              {config.emailGate.waitlistLabel}
            </span>
          </label>
        </div>
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
    utms,
  } = useFunnel()
  const { theme } = config

  // Preview mode: ?preview=captured or ?preview=waitlist to skip quiz
  const previewMode = new URLSearchParams(window.location.search).get("preview")

  const pixelFired = useRef(false)

  // Track whether user checked waitlist (for confirmation variant)
  const [didJoinWaitlist, setDidJoinWaitlist] = useState(previewMode === "waitlist")
  const [waitlistJoinedLate, setWaitlistJoinedLate] = useState(false)
  const [leadDocId, setLeadDocId] = useState(null)
  const [capturedEmail, setCapturedEmail] = useState(null)

  // Force emailCaptured in preview mode
  useEffect(() => {
    if (previewMode) setEmailCaptured(true)
  }, [previewMode, setEmailCaptured])

  // Calculating pause — 2.5 seconds
  const [showResults, setShowResults] = useState(!calculating || !!previewMode)

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

  // Fire ViewContent once when results page renders
  useEffect(() => {
    if (pixelFired.current || !showResults) return
    pixelFired.current = true
    trackPixelEvent('ViewContent', { content_name: 'results_page' })
    trackGA('results_view', { content_name: 'results_page', tier: tier.name })
  }, [showResults])

  // ─── Email capture handler ──────────────────────────────
  async function handleEmailCaptured(email, joinWaitlist) {
    try {
      const docId = await saveLead({
        email,
        quizAnswers: { ...answers },
        rawTotal,
        displayScores: { ...displayScores },
        tier: tier.id,
        tierName: tier.name,
        waitlist: joinWaitlist,
        ...(Object.keys(utms).length ? { utms } : {}),
      })
      setLeadDocId(docId)
      setCapturedEmail(email)

      // Meta Pixel: Lead event
      trackPixelEvent('Lead', { content_name: tier.name, value: rawTotal })
      // GA4: Lead event
      trackGA('generate_lead', { content_name: tier.name, value: rawTotal })

      // Waitlist tracking (only when user checked the box)
      if (joinWaitlist) {
        trackPixelEvent('ViewContent', { content_name: 'waitlist_signup', content_category: 'conversion' })
        trackGA('waitlist_signup', { method: 'email_form_checkbox' })
      }

      // Find weakest dimension for action plan
      const dimEntries = Object.entries(displayScores)
      const weakest = dimEntries.reduce((min, curr) => curr[1] < min[1] ? curr : min, dimEntries[0])

      // Subscribe to Kit + request action plan (non-blocking, parallel)
      subscribeToKit(email, {
        tier: tier.name,
        frictionArea: tier.id,
        waitlist: joinWaitlist,
        utms,
      })
      requestActionPlan(email, {
        tier: tier.id,
        tierName: tier.name,
        displayScores: { ...displayScores },
        weakestDimension: weakest?.[0] || "",
      })
    } catch (err) {
      console.error("Failed to save lead:", err)
    }
    setDidJoinWaitlist(joinWaitlist)
    setEmailCaptured(true)
  }

  // ─── Late waitlist join (from confirmation page) ──────
  async function handleLateWaitlistJoin() {
    setWaitlistJoinedLate(true)
    trackPixelEvent('ViewContent', { content_name: 'waitlist_signup', content_category: 'conversion' })
    trackGA('waitlist_signup', { method: 'late_join_button' })
    try {
      if (leadDocId) {
        await updateLead(leadDocId, { waitlist: true })
      }
      if (capturedEmail) {
        subscribeToKit(capturedEmail, {
          tier: tier.name,
          frictionArea: tier.id,
          waitlist: true,
          utms,
        })
      }
    } catch (err) {
      console.error("Failed to update waitlist:", err)
    }
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

      {/* Post-capture: confirmation + authority + waitlist */}
      {emailCaptured && (
        <div className="space-y-8">

          {/* ── Section 1: Coral confirmation banner ── */}
          <div
            className="p-6 md:p-8 rounded-2xl text-center space-y-3"
            style={{ background: theme.accent }}
          >
            <div className="text-3xl">&#10003;</div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: theme.headingFont, color: "#fff" }}
            >
              Your action plan is on the way.
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Check your inbox in a few minutes.
            </p>
            {/* Waitlist acknowledgment (Variant A) */}
            {didJoinWaitlist && (
              <p className="text-sm font-medium pt-1" style={{ color: "#fff" }}>
                You're on the early access list — we'll let you know when the course opens.
              </p>
            )}
          </div>

          {/* ── Section 2+3: Dark authority block with videos ── */}
          <div
            className="p-6 md:p-8 rounded-2xl space-y-6"
            style={{ background: theme.text }}
          >
            {/* Authority intro */}
            <div className="space-y-3">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                The investor behind the assessment
              </p>
              <h3
                className="text-lg md:text-xl font-bold leading-snug"
                style={{ fontFamily: theme.headingFont, color: "#fff", letterSpacing: "-0.3px" }}
              >
                Brian Hecht
              </h3>
              <p
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                4x exited founder &middot; Venture investor &middot; 2,500+ pitches analyzed
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Brian built this assessment from the investor side of the table — to show founders the patterns investors notice but will never share. He's raised capital, invested it, and coached thousands of founders on how to close the gap.
              </p>
            </div>

            {/* Primary video (short) */}
            <div className="space-y-2">
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/iqw1IgRA2sw"
                  title="This One Trait Makes a Winning Startup Pitch"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                The one trait that separates winning pitches (0:52)
              </p>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />

            {/* Secondary video (long) */}
            <div className="space-y-3">
              <p
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Go deeper
              </p>
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/_3601d3OpYY"
                  title="Want VC Investment? Here's How to Nail Your Pitch"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                How to nail your VC pitch (8:16)
              </p>
            </div>

            {/* YouTube channel link */}
            <div className="pt-2">
              <a
                href="https://www.youtube.com/@HumbleConviction"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: theme.accent }}
              >
                More from Brian on YouTube →
              </a>
            </div>
          </div>

          {/* ── Section 4: Waitlist re-ask (Variant B — non-checkers only) ── */}
          {!didJoinWaitlist && !waitlistJoinedLate && (
            <div
              className="p-6 md:p-8 rounded-2xl text-center space-y-4"
              style={{ background: theme.accent + "0D", border: `1px solid ${theme.accent}33` }}
            >
              <p className="text-sm leading-relaxed" style={{ color: theme.text }}>
                We're building a course to help founders close these gaps.
              </p>
              <button
                onClick={handleLateWaitlistJoin}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] text-white"
                style={{ background: theme.accent }}
              >
                Get early access when it launches
              </button>
            </div>
          )}

          {/* Late waitlist confirmation */}
          {waitlistJoinedLate && (
            <p className="text-center text-sm font-medium" style={{ color: theme.accent }}>
              You're on the list — we'll let you know when it's ready.
            </p>
          )}
        </div>
      )}

      {/* Retake — only show before email capture */}
      {!emailCaptured && (
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
      )}
    </div>
  )
}
