import React, { useState } from 'react';
import './App.css';

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className="flashcard-content">
        {isFlipped ? (
          <div className="answer">
            <p className="label">Answer:</p>
            <p className="text">{answer}</p>
          </div>
        ) : (
          <div className="question">
            <p className="label">Question:</p>
            <p className="text">{question}</p>
          </div>
        )}
      </div>
      <p className="flip-hint">Click card to flip</p>
    </div>
  );
};

export default Flashcard;
