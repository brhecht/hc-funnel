import { useState } from "react"
import { Link } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"
import { saveLead, updateLead, subscribeToKit } from "../firebase"

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="you@startup.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border text-base outline-none focus:ring-2"
          style={{
            background: theme.bg,
            borderColor: theme.border,
            color: theme.text,
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] whitespace-nowrap text-white"
          style={{ background: theme.accent }}
        >
          {submitting ? "Sending..." : "Get My Full Diagnostic"}
        </button>
      </div>
      <label
        className="flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-all"
        style={{
          background: joinWaitlist ? `${theme.accent}08` : "transparent",
          border: `1px solid ${joinWaitlist ? theme.accent + "30" : "transparent"}`,
        }}
      >
        <input
          type="checkbox"
          checked={joinWaitlist}
          onChange={(e) => setJoinWaitlist(e.target.checked)}
          className="mt-1 w-4 h-4 accent-current shrink-0"
          style={{ accentColor: theme.accent }}
        />
        <span className="text-sm leading-snug">
          <strong>Also add me to the {config.waitlist.courseName} waitlist.</strong>{" "}
          <span style={{ color: theme.muted }}>
            Get early access + {config.waitlist.freeGift} when we launch.
          </span>
        </span>
      </label>
    </form>
  )
}

function DeepDive({ config, deepDiveAnswers, updateDeepDive, onSubmit }) {
  const { theme, deepDive } = config
  const [submitting, setSubmitting] = useState(false)

  const answeredCount = Object.values(deepDiveAnswers).filter(v => v && String(v).trim()).length
  const canSubmit = answeredCount >= 2

  async function handleSubmit() {
    setSubmitting(true)
    await onSubmit()
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold" style={{ fontFamily: theme.headingFont }}>{deepDive.title}</h3>
        <p className="text-sm" style={{ color: theme.muted }}>{deepDive.subtitle}</p>
      </div>

      <div className="space-y-5">
        {deepDive.questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <label className="text-sm font-semibold">{q.text}</label>
            {q.type === "text" ? (
              <input
                type="text"
                placeholder={q.placeholder}
                value={deepDiveAnswers[q.id] || ""}
                onChange={(e) => updateDeepDive(q.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-base outline-none focus:ring-2"
                style={{
                  background: theme.bg,
                  borderColor: theme.border,
                  color: theme.text,
                }}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const isSelected = deepDiveAnswers[q.id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => updateDeepDive(q.id, opt.value)}
                      className="px-4 py-2 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        background: isSelected ? `${theme.accent}12` : theme.card,
                        borderColor: isSelected ? theme.accent : theme.border,
                      }}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || submitting}
        className="w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-30 hover:scale-[1.01] text-white"
        style={{ background: canSubmit ? theme.accent : theme.border }}
      >
        {submitting ? "Submitting..." : "Send Me the Deep Diagnostic"}
      </button>
    </div>
  )
}

function WaitlistCTA({ config, frictionKey, onJoin, joined }) {
  const { theme, waitlist } = config
  const hook = waitlist.hooks[frictionKey] || waitlist.hooks.readiness

  if (joined) {
    return (
      <div className="text-center space-y-3 py-4">
        <div className="text-3xl" style={{ color: theme.accent }}>&#10003;</div>
        <h3 className="text-xl font-bold" style={{ fontFamily: theme.headingFont }}>
          You're on the list.
        </h3>
        <p style={{ color: theme.muted }}>
          We'll let you know as soon as the course opens. In the meantime, check your inbox for your diagnostic.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>
          Need help with this?
        </p>
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: theme.headingFont, letterSpacing: "-0.5px" }}
        >
          {hook.headline}
        </h3>
        <p className="leading-relaxed" style={{ color: theme.muted }}>
          {hook.body}
        </p>
      </div>
      <div
        className="p-5 rounded-xl space-y-4"
        style={{ background: `${theme.accent}08`, border: `1px solid ${theme.accent}20` }}
      >
        <p className="text-sm font-medium">
          <strong>{waitlist.courseName}</strong> is coming soon. Join the waitlist and get {waitlist.freeGift} when we launch.
        </p>
        <button
          onClick={onJoin}
          className="w-full py-3 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] text-white"
          style={{ background: theme.accent, boxShadow: `0 8px 30px ${theme.accent}33` }}
        >
          {waitlist.buttonText}
        </button>
      </div>
    </div>
  )
}

export default function Results() {
  const {
    config,
    answers,
    multiAnswers,
    calculateResults,
    resetQuiz,
    emailCaptured,
    setEmailCaptured,
    deepDiveAnswers,
    updateDeepDive,
  } = useFunnel()
  const { theme } = config
  const { tier, friction, frictionKey, dimensions, readinessScore } = calculateResults()

  const [leadDocId, setLeadDocId] = useState(null)
  const [deepDiveSubmitted, setDeepDiveSubmitted] = useState(false)
  const [waitlistJoined, setWaitlistJoined] = useState(false)

  async function handleEmailCaptured(email, joinWaitlist) {
    try {
      const docId = await saveLead({
        email,
        quizAnswers: { ...answers },
        multiSelectAnswers: { ...multiAnswers },
        scores: dimensions,
        readinessScore,
        tier: tier.id,
        tierName: tier.name,
        frictionArea: frictionKey,
        frictionLabel: friction.label,
        waitlist: joinWaitlist,
        waitlistStage: joinWaitlist ? "phase1" : null,
        deepDiveCompleted: false,
      })
      setLeadDocId(docId)
      if (joinWaitlist) setWaitlistJoined(true)

      // Subscribe to Kit in parallel (non-blocking)
      subscribeToKit(email, {
        tier: tier.name,
        frictionArea: frictionKey,
        waitlist: joinWaitlist,
      })
    } catch (err) {
      console.error("Failed to save lead:", err)
    }
    setEmailCaptured(true)
  }

  async function handleDeepDiveSubmit() {
    if (leadDocId) {
      try {
        await updateLead(leadDocId, {
          deepDiveAnswers: { ...deepDiveAnswers },
          deepDiveCompleted: true,
        })
      } catch (err) {
        console.error("Failed to update deep dive:", err)
      }
    }
    setDeepDiveSubmitted(true)
  }

  async function handleWaitlistJoin() {
    if (leadDocId) {
      try {
        await updateLead(leadDocId, { waitlist: true, waitlistStage: "phase2" })
      } catch (err) {
        console.error("Failed to update waitlist:", err)
      }
    }
    setWaitlistJoined(true)
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 md:pt-16 space-y-10">
      {/* Readiness Tier */}
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.muted }}>
          Your Pitch Readiness
        </p>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ fontFamily: theme.headingFont, color: tier.color, letterSpacing: "-1.5px" }}
        >
          {tier.name}
        </h1>
        <p className="text-lg leading-relaxed max-w-lg mx-auto" style={{ color: theme.muted }}>
          {tier.description}
        </p>
      </div>

      {/* Primary Friction Diagnosis */}
      <div
        className="p-8 rounded-2xl space-y-5"
        style={{ background: theme.card, border: `1px solid ${theme.border}` }}
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>
            Where the friction is
          </p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: theme.headingFont, letterSpacing: "-0.5px" }}>
            {friction.label}
          </h2>
        </div>
        <p className="leading-relaxed" style={{ color: theme.muted }}>
          {friction.summary}
        </p>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-semibold uppercase tracking-wide">
            What to do next
          </p>
          {friction.nextSteps.map((step, i) => (
            <div key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: theme.muted }}>
              <span className="font-bold shrink-0" style={{ color: theme.accent }}>{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Email Capture */}
      {!emailCaptured && (
        <div
          className="p-8 rounded-2xl space-y-5"
          style={{ background: theme.card, border: `1px solid ${theme.border}` }}
        >
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold" style={{ fontFamily: theme.headingFont }}>
              Want the full picture?
            </h3>
            <p className="text-sm" style={{ color: theme.muted }}>
              Drop your email and we'll send a personalized diagnostic — specific to your startup, your stage, and your pitch.
            </p>
          </div>
          <EmailCapture theme={theme} config={config} onCaptured={handleEmailCaptured} />
          <p className="text-xs text-center" style={{ color: theme.faint }}>
            By submitting, you agree to receive your personalized diagnostic and occasional insights from Humble Conviction. Unsubscribe anytime.
          </p>
        </div>
      )}

      {/* Deep Dive (after email capture) */}
      {emailCaptured && !deepDiveSubmitted && (
        <div
          className="p-8 rounded-2xl space-y-5"
          style={{ background: theme.card, border: `1px solid ${theme.border}` }}
        >
          <DeepDive
            config={config}
            deepDiveAnswers={deepDiveAnswers}
            updateDeepDive={updateDeepDive}
            onSubmit={handleDeepDiveSubmit}
          />
        </div>
      )}

      {/* Deep Dive confirmation */}
      {deepDiveSubmitted && (
        <div
          className="p-8 rounded-2xl space-y-3 text-center"
          style={{ background: theme.card, border: `1px solid ${theme.border}` }}
        >
          <div className="text-3xl" style={{ color: theme.accent }}>&#10003;</div>
          <h3 className="text-xl font-bold" style={{ fontFamily: theme.headingFont }}>
            Your deep diagnostic is on the way.
          </h3>
          <p style={{ color: theme.muted }}>
            Check your inbox in a few minutes.
          </p>
        </div>
      )}

      {/* Waitlist CTA (shown after email capture) */}
      {emailCaptured && (
        <div
          className="p-8 rounded-2xl space-y-5"
          style={{ background: theme.card, border: `1px solid ${theme.border}` }}
        >
          <WaitlistCTA
            config={config}
            frictionKey={frictionKey}
            onJoin={handleWaitlistJoin}
            joined={waitlistJoined}
          />
        </div>
      )}

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
