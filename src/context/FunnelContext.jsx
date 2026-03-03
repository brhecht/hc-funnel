import { createContext, useContext, useState } from 'react'
import FUNNEL from '../config/funnel'

const FunnelContext = createContext()

export const useFunnel = () => useContext(FunnelContext)

export function FunnelProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const questions = FUNNEL.quiz.questions

  function answerQuestion(questionId, option) {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
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
    setCurrentQuestion(0)
  }

  function calculateArchetype() {
    // Sum points across all dimensions
    const totals = {}
    Object.values(answers).forEach(option => {
      if (option.points) {
        Object.entries(option.points).forEach(([dim, pts]) => {
          totals[dim] = (totals[dim] || 0) + pts
        })
      }
    })

    const totalScore = Object.values(totals).reduce((a, b) => a + b, 0)

    // Match archetype by score threshold (sorted high → low)
    const sorted = [...FUNNEL.archetypes].sort((a, b) => b.minScore - a.minScore)
    const archetype = sorted.find(a => totalScore >= a.minScore) || sorted[sorted.length - 1]

    return { archetype, totals, totalScore }
  }

  return (
    <FunnelContext.Provider value={{
      config: FUNNEL,
      answers,
      currentQuestion,
      questions,
      answerQuestion,
      nextQuestion,
      prevQuestion,
      resetQuiz,
      calculateArchetype,
    }}>
      {children}
    </FunnelContext.Provider>
  )
}
