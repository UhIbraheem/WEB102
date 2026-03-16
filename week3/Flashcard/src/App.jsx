import './App.css'
import Flashcard from './Flashcard'
import flashcards from './info'
import { useState } from 'react'

const App = () => {
  // indexing use states to traverse or display each index in order
  const [currentIndex, setCurrentIndex] = useState(0)

  // user answer to veridy/ check user input
  const [userAnswer, setUserAnswer] = useState('')

  //feedback fro checking the answer
  const [feedback, setFeedback] = useState(null)

  const normalizeText = (text) => text.trim().toLowerCase()

  // handle click function for the next button to move through cards
  const handleNext = () => {
    setCurrentIndex(prev => (prev >= flashcards.length-1) ? 0 : prev+1)
    setUserAnswer('')
    setFeedback(null)
  }

  // handling function to go back one card
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev < 1) ? flashcards.length-1 : prev-1)
    setUserAnswer('')
    setFeedback(null)
  }

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value)
    // Clear prior result while user is editing a new answer.
    if (feedback !== null) {
      setFeedback(null)
    }
  }

  // Compare normalized input to the current card answer.
  const handleCheck = () => {
    const normalizedUser = normalizeText(userAnswer)

    if (normalizedUser === '') {
      setFeedback(false)
      return
    }

    const normalizedAnswer = normalizeText(currentCard.answer)
    const isMatch = normalizedUser === normalizedAnswer
    setFeedback(isMatch)
  }

  // refined the current card based on the user clicking next
  const currentCard = flashcards[currentIndex]
  return (
    <>
      <div className='Heading'>
        <h1>Programming Flashcards</h1>
        <p className='description'>Comprehensive flashcards for programming exam</p>
      </div>

      {/* Flashcard component with card info props passed in*/}
      <Flashcard 
        question={currentCard.question}
        answer={currentCard.answer}
        id={currentCard.id}
        key={currentCard.id}
        total ={flashcards.length}
        feedback={feedback}
      />
      <div className='controls'>
        <button className='previous-button' onClick={handlePrevious}>Previous</button>
        <input
          type="text"
          className='answer-input'
          value={userAnswer}
          onChange={handleInputChange}
          placeholder='Type your answer'
        />
        <button className='check-button' onClick={handleCheck}>Check</button>
        <button className='next-button' onClick={handleNext}>Next</button>
      </div>
      {feedback !== null && (
        <p className={feedback ? 'feedback feedback-correct' : 'feedback feedback-incorrect'}>
          {feedback ? 'Correct answer.' : 'Not quite. Try again.'}
        </p>
      )}
    </>
  )
}

export default App
