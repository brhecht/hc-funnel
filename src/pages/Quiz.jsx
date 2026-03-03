import { useNavigate } from 'react-router-dom'
import { useFunnel } from '../context/FunnelContext'

export default function Quiz() {
  const navigate = useNavigate()
  const {
    config,
    questions,
    currentQuestion,
    answers,
    answerQuestion,
    nextQuestion,
    prevQuestion,
  } = useFunnel()
  const { theme } = config

  const q = questions[currentQuestion]
  const selectedOption = answers[q.id]
  const isLast = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  function handleSelect(option) {
    answerQuestion(q.id, option)
  }

  function handleNext() {
    if (isLast) {
      navigate('/results')
    } else {
      nextQuestion()
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 md:pt-16 space-y-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm" style={{ color: theme.muted }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">{q.text}</h2>

        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = selectedOption?.value === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className="w-full text-left p-5 rounded-xl border transition-all hover:scale-[1.01]"
                style={{
                  background: isSelected ? `${theme.accent}18` : `rgba(255,255,255,0.03)`,
                  borderColor: isSelected ? theme.accent : 'rgba(255,255,255,0.08)',
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
          disabled={!selectedOption}
          className="px-8 py-3 rounded-xl text-base font-semibold transition-all disabled:opacity-30 hover:scale-[1.02]"
          style={{
            background: selectedOption
              ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`
              : 'rgba(255,255,255,0.08)',
            color: selectedOption ? theme.bg : theme.muted,
          }}
        >
          {isLast ? 'See My Results' : 'Next'}
        </button>
      </div>
    </div>
  )
}
