import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"
import { trackPixelEvent } from "../hooks/useMetaPixel"
import { trackGA } from "../utils/analytics"

const LETTERS = ["A", "B", "C", "D"]

export default function Quiz() {
  const navigate = useNavigate()
  const pixelFired = useRef(false)
  const {
    config,
    questions,
    currentQuestion,
    answerQuestion,
    getAnswer,
    isQuestionAnswered,
    nextQuestion,
    setCalculating,
  } = useFunnel()
  const { theme } = config

  // Fire ViewContent once when quiz page mounts (quiz_start)
  useEffect(() => {
    if (pixelFired.current) return
    pixelFired.current = true
    trackPixelEvent('ViewContent', { content_name: 'quiz_start' })
    trackGA('quiz_start')
  }, [])

  const q = questions[currentQuestion]
  const answered = isQuestionAnswered(q.id)
  const selectedId = getAnswer(q.id)
  const isLast = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  function handleSelect(optionId) {
    answerQuestion(q.id, optionId)
  }

  function handleNext() {
    if (isLast) {
      trackPixelEvent('QuizComplete', { content_name: 'quiz_complete', value: questions.length })
      trackGA('quiz_complete', { value: questions.length })
      setCalculating(true)
      navigate("/results")
    } else {
      trackPixelEvent('ViewContent', { content_name: `Quiz_Q${currentQuestion + 1}_Completed` })
      trackGA(`quiz_q${currentQuestion + 1}_completed`, { question_id: q.id })
      nextQuestion()
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-4 md:pt-12 space-y-6">
      {/* Progress bar — thin, sticky-look, no text */}
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ background: theme.border }}
      >
        <div
          className="h-1 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%`, background: theme.accent }}
        />
      </div>

      {/* Question */}
      <div className="space-y-5 pt-2">
        <h2
          className="text-xl md:text-2xl font-bold leading-snug"
          style={{ fontFamily: theme.headingFont, letterSpacing: "-0.5px", color: theme.text }}
        >
          {q.text}
        </h2>

        {/* Option cards */}
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selectedId === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-150"
                style={{
                  background: isSelected ? theme.selectedBg : theme.card,
                  borderColor: isSelected ? theme.selectedBorder : theme.border,
                  minHeight: "56px",
                }}
              >
                {/* Letter badge */}
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                  style={{
                    background: isSelected ? theme.accent : theme.bg,
                    color: isSelected ? "#fff" : theme.muted,
                    border: isSelected ? "none" : `1px solid ${theme.border}`,
                  }}
                >
                  {LETTERS[i]}
                </span>
                {/* Answer text */}
                <span
                  className="text-sm md:text-base font-medium leading-snug"
                  style={{ color: theme.text }}
                >
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Next button — no back button */}
      <div className="flex justify-end pt-2 pb-8">
        <button
          onClick={handleNext}
          disabled={!answered}
          className="px-8 py-3 rounded-xl text-base font-semibold transition-all disabled:opacity-30 hover:scale-[1.02] text-white"
          style={{
            background: answered ? theme.accent : theme.border,
            color: answered ? "#fff" : theme.muted,
          }}
        >
          {isLast ? "See My Results" : "Next"}
        </button>
      </div>
    </div>
  )
}
