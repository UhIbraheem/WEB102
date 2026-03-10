import { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';

function App() {
  // Array of flashcard pairs about plant biology
  const cardSet = [
    {
      question: "What are the main characteristics of red algae?",
      answer: "Red algae (Rhodophyta) are mostly marine, contain phycobilins (red pigments), can live at great depths, and have complex life cycles. They lack flagella."
    },
    {
      question: "What pigments do red algae contain?",
      answer: "Red algae contain chlorophyll a and phycobilins (phycoerythrin and phycocyanin), which give them their red color and allow photosynthesis at deeper water levels."
    },
    {
      question: "What are the defining features of green algae (Chlorophyta)?",
      answer: "Green algae contain chlorophyll a and b, store starch, have cell walls with cellulose, and are the ancestors of land plants. They can be unicellular or multicellular."
    },
    {
      question: "What are charophytes (green algae group 2)?",
      answer: "Charophytes are a group of green algae that are the closest relatives to land plants. They share features like similar chloroplasts, cell division patterns, and some have branching structures."
    },
    {
      question: "What are the key innovations that allowed plants to colonize land?",
      answer: "Key innovations include: cuticle (waxy coating to prevent water loss), stomata (pores for gas exchange), vascular tissue (for transport), and alternation of generations life cycle."
    },
    {
      question: "What is alternation of generations in plants?",
      answer: "Alternation of generations is a life cycle where plants alternate between a diploid sporophyte generation (produces spores) and a haploid gametophyte generation (produces gametes)."
    },
    {
      question: "What are bryophytes?",
      answer: "Bryophytes are non-vascular land plants including mosses, liverworts, and hornworts. They lack true roots, stems, and leaves, and the gametophyte is the dominant generation."
    },
    {
      question: "What are vascular plants (tracheophytes)?",
      answer: "Vascular plants have specialized tissues (xylem and phloem) for transporting water, minerals, and nutrients. This includes ferns, gymnosperms, and angiosperms."
    },
    {
      question: "What is the difference between xylem and phloem?",
      answer: "Xylem transports water and minerals from roots upward. Phloem transports sugars and organic compounds from leaves to other parts of the plant."
    },
    {
      question: "What are the main differences between gymnosperms and angiosperms?",
      answer: "Gymnosperms have naked seeds (usually in cones) and no flowers. Angiosperms have seeds enclosed in fruits and produce flowers for reproduction."
    },
    {
      question: "Why are green algae considered ancestors of land plants?",
      answer: "Green algae share key characteristics with land plants: same chlorophyll types (a and b), cellulose cell walls, similar starch storage, and DNA evidence showing evolutionary relationships."
    },
    {
      question: "What adaptations do land plants have for water conservation?",
      answer: "Land plants have a waxy cuticle to reduce water loss, stomata that can open/close to regulate gas exchange, and in vascular plants, specialized tissues for efficient water transport."
    }
  ];

  // State to track the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCardNumber, setCurrentCardNumber] = useState(1);

  // Function to go to the next card in order
  const getNextCard = () => {
    // Go to next card, or loop back to first card if at the end
    const nextIndex = (currentCardIndex + 1) % cardSet.length;
    
    setCurrentCardIndex(nextIndex);
    setCurrentCardNumber(nextIndex + 1);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Plant Biology Flashcards</h1>
        <p className="description">
          A study guide covering the evolution and characteristics of plants, from algae to land plants
        </p>
        <p className="card-count">Total Cards: {cardSet.length}</p>
        <p className="card-progress">Card {currentCardNumber} of {cardSet.length}</p>
      </div>

      <div className="card-container">
        <Flashcard 
          key={currentCardIndex}
          question={cardSet[currentCardIndex].question}
          answer={cardSet[currentCardIndex].answer}
        />
      </div>

      <button className="next-button" onClick={getNextCard}>
        Next Card
      </button>
    </div>
  );
}

export default App;
