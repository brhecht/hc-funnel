import { useNavigate } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"

export default function Quiz() {
  const navigate = useNavigate()
  const {
    config,
    questions,
    currentQuestion,
    answerQuestion,
    toggleMultiAnswer,
    isMultiSelected,
    getAnswer,
    isQuestionAnswered,
    nextQuestion,
    prevQuestion,
  } = useFunnel()
  const { theme } = config

  const q = questions[currentQuestion]
  const isMulti = !!q.multiSelect
  const answered = isQuestionAnswered(q.id)
  const selectedOption = !isMulti ? getAnswer(q.id) : null
  const isLast = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  function handleSelect(option) {
    if (isMulti) {
      toggleMultiAnswer(q.id, option, q.multiSelect)
    } else {
      answerQuestion(q.id, option)
    }
  }

  function handleNext() {
    if (isLast) {
      navigate("/results")
    } else {
      nextQuestion()
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 md:pt-16 space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium" style={{ color: theme.muted }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: theme.border }}>
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: theme.accent }}
          />
        </div>
      </div>

      {/* Section label */}
      {q.section && (
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>
          {q.section}
        </p>
      )}

      {/* Question */}
      <div className="space-y-6">
        <h2
          className="text-2xl md:text-3xl font-bold leading-snug"
          style={{ fontFamily: theme.headingFont, letterSpacing: "-0.5px" }}
        >
          {q.text}
        </h2>

        {isMulti && (
          <p className="text-sm" style={{ color: theme.muted }}>
            Choose up to {q.multiSelect}
          </p>
        )}

        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = isMulti
              ? isMultiSelected(q.id, opt.value)
              : selectedOption?.value === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className="w-full text-left p-5 rounded-2xl border transition-all hover:shadow-sm"
                style={{
                  background: isSelected ? `${theme.accent}12` : theme.card,
                  borderColor: isSelected ? theme.accent : theme.border,
                }}
              >
                <span className="text-base font-medium">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
          style={{ color: theme.muted }}
        >
          Back
        </button>
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
