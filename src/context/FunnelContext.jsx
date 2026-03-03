import { createContext, useContext, useState } from "react"
import FUNNEL from "../config/funnel"

const FunnelContext = createContext()

export const useFunnel = () => useContext(FunnelContext)

export function FunnelProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [multiAnswers, setMultiAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [deepDiveAnswers, setDeepDiveAnswers] = useState({})
  const [emailCaptured, setEmailCaptured] = useState(false)

  const questions = FUNNEL.quiz.questions

  function answerQuestion(questionId, option) {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  function toggleMultiAnswer(questionId, option, maxSelections) {
    setMultiAnswers(prev => {
      const current = prev[questionId] || []
      const exists = current.find(o => o.value === option.value)
      if (exists) {
        return { ...prev, [questionId]: current.filter(o => o.value !== option.value) }
      }
      if (current.length >= maxSelections) {
        return { ...prev, [questionId]: [...current.slice(1), option] }
      }
      return { ...prev, [questionId]: [...current, option] }
    })
  }

  function isMultiSelected(questionId, optionValue) {
    return (multiAnswers[questionId] || []).some(o => o.value === optionValue)
  }

  function getAnswer(questionId) {
    const q = questions.find(q => q.id === questionId)
    if (q?.multiSelect) return multiAnswers[questionId] || []
    return answers[questionId]
  }

  function isQuestionAnswered(questionId) {
    const q = questions.find(q => q.id === questionId)
    if (q?.multiSelect) return (multiAnswers[questionId] || []).length > 0
    return !!answers[questionId]
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  function resetQuiz() {
    setAnswers({})
    setMultiAnswers({})
    setCurrentQuestion(0)
    setDeepDiveAnswers({})
    setEmailCaptured(false)
  }

  function updateDeepDive(questionId, value) {
    setDeepDiveAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  function calculateResults() {
    const dimensions = { readiness: 0, packaging: 0, strategy: 0, vcLiteracy: 0 }

    // Sum points from single-select answers
    Object.values(answers).forEach(option => {
      if (option?.points) {
        Object.entries(option.points).forEach(([dim, pts]) => {
          dimensions[dim] = (dimensions[dim] || 0) + pts
        })
      }
    })

    // Sum points from multi-select answers
    Object.values(multiAnswers).forEach(options => {
      options.forEach(option => {
        if (option?.points) {
          Object.entries(option.points).forEach(([dim, pts]) => {
            dimensions[dim] = (dimensions[dim] || 0) + pts
          })
        }
      })
    })

    // Determine readiness tier
    const readinessScore = dimensions.readiness
    const sorted = [...FUNNEL.readinessTiers].sort((a, b) => b.minScore - a.minScore)
    const tier = sorted.find(t => readinessScore >= t.minScore) || sorted[sorted.length - 1]

    // Determine primary friction area (lowest-scoring dimension, excluding readiness)
    const frictionDims = { packaging: dimensions.packaging, strategy: dimensions.strategy, vcLiteracy: dimensions.vcLiteracy }
    const lowestDim = Object.entries(frictionDims).sort(([, a], [, b]) => a - b)[0]
    const frictionKey = lowestDim[0]
    const friction = FUNNEL.frictionDiagnoses[frictionKey]

    return { dimensions, tier, friction, frictionKey, readinessScore }
  }

  // Build the full payload for the Phase 2 webhook
  function buildWebhookPayload(email) {
    const { dimensions, tier, friction, frictionKey } = calculateResults()
    return {
      email,
      quizAnswers: { ...answers, ...multiAnswers },
      deepDiveAnswers,
      scores: dimensions,
      tier: tier.id,
      frictionArea: frictionKey,
      timestamp: new Date().toISOString(),
    }
  }

  return (
    <FunnelContext.Provider value={{
      config: FUNNEL,
      answers,
      multiAnswers,
      currentQuestion,
      questions,
      emailCaptured,
      deepDiveAnswers,
      answerQuestion,
      toggleMultiAnswer,
      isMultiSelected,
      getAnswer,
      isQuestionAnswered,
      nextQuestion,
      prevQuestion,
      resetQuiz,
      calculateResults,
      setEmailCaptured,
      updateDeepDive,
      buildWebhookPayload,
    }}>
      {children}
    </FunnelContext.Provider>
  )
}
