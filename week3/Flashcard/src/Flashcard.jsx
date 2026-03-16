import { useState } from 'react'

function Flashcard({question, answer, id, total, feedback}) {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(prev => !prev)
    }

  const glowClass = feedback === null
    ? ''
    : feedback
      ? 'flashcard--correct'
      : 'flashcard--incorrect'

  return (
    <div className={`flashcard ${glowClass}`} onClick={handleClick}>
      {isFlipped ? <h4>A: {answer}</h4> : <h4>Q: {question}</h4>}
      <p className='card-count'>Card {id} out of {total}</p>
    </div>
  )
}

export default Flashcard
