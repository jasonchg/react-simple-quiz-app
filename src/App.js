import { useState, useEffect } from 'react'
import QuestionLists from './components/QuestionLists'

const API_URL =
  'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'

const App = () => {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((questions) => ({
          ...questions,
          answers: [
            questions.correct_answer,
            ...questions.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }))
        setQuestions(questions)
      })
  }, [])

  const handleAnswer = (answer) => {
    if (!showCorrectAnswer) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1)
      }
    }

    setShowCorrectAnswer(true)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1)
    setShowCorrectAnswer(false)
  }

  return questions.length !== 0 ? (
    questions.length > currentIndex ? (
      <div style={{ background: 'purple' }}>
        <QuestionLists
          data={questions[currentIndex]}
          showCorrectAnswer={showCorrectAnswer}
          handleNext={handleNext}
          handleAnswer={handleAnswer}
        />
      </div>
    ) : (
      <>
        <span>Your score: {score}</span> <br />
        <button onClick={() => setCurrentIndex(0)}>Try again ? </button>
      </>
    )
  ) : (
    'Loading...'
  )
}

export default App
