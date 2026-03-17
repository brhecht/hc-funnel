import { createContext, useContext, useState, useCallback } from "react"
import FUNNEL from "../config/funnel"

const FunnelContext = createContext()

export const useFunnel = () => useContext(FunnelContext)

/**
 * Map raw dimension score (0–4) to display score (2/5, 3/5, 4/5).
 * Self-Awareness floors at 3/5.
 */
function rawToDisplay(raw, dimension) {
  if (dimension === "selfAwareness") {
    return raw >= 4 ? 4 : 3
  }
  if (raw >= 4) return 4
  if (raw >= 2) return 3
  return 2
}

/**
 * Determine tier from raw total score (0–16).
 * Tiers are sorted highest-first in config.
 */
function getTier(rawTotal) {
  for (const tier of FUNNEL.tiers) {
    if (rawTotal >= tier.minRaw) return tier
  }
  return FUNNEL.tiers[FUNNEL.tiers.length - 1]
}

export function FunnelProvider({ children }) {
  const [answers, setAnswers] = useState({})          // { questionId: optionId }
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [calculating, setCalculating] = useState(false)

  // Capture UTM params once on first render (before React Router strips them)
  const [utms] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const u = {}
    ;["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = params.get(k)
      if (v) u[k] = v
    })
    return u
  })

  const questions = FUNNEL.quiz.questions

  function answerQuestion(questionId, optionId) {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  function getAnswer(questionId) {
    return answers[questionId] || null
  }

  function isQuestionAnswered(questionId) {
    return !!answers[questionId]
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  function resetQuiz() {
    setAnswers({})
    setCurrentQuestion(0)
    setEmailCaptured(false)
    setCalculating(false)
  }

  const calculateResults = useCallback(() => {
    // Sum raw points per dimension
    const rawDimensions = {
      clarity: 0,
      investorFluency: 0,
      selfAwareness: 0,
      persuasionInstincts: 0,
    }

    for (const q of questions) {
      const selectedId = answers[q.id]
      if (!selectedId) continue
      const option = q.options.find(o => o.id === selectedId)
      if (!option) continue
      rawDimensions[q.dimension] += option.points
    }

    // Raw total for tier assignment
    const rawTotal = Object.values(rawDimensions).reduce((sum, v) => sum + v, 0)

    // Display scores per dimension
    const displayScores = {}
    for (const [dim, raw] of Object.entries(rawDimensions)) {
      displayScores[dim] = rawToDisplay(raw, dim)
    }

    // Tier
    const tier = getTier(rawTotal)

    return { rawDimensions, rawTotal, displayScores, tier }
  }, [answers, questions])

  return (
    <FunnelContext.Provider value={{
      config: FUNNEL,
      answers,
      currentQuestion,
      questions,
      emailCaptured,
      calculating,
      utms,
      answerQuestion,
      getAnswer,
      isQuestionAnswered,
      nextQuestion,
      resetQuiz,
      calculateResults,
      setEmailCaptured,
      setCalculating,
    }}>
      {children}
    </FunnelContext.Provider>
  )
}
