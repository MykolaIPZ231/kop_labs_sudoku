import React, { useState } from "react";
import Button from "../components/Button";

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  difficultyContainer: {
    marginBottom: "20px"
  },
  buttonsContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    justifyContent: "center"
  },
  difficultyButton: (isSelected) => ({
    padding: "10px 20px",
    backgroundColor: isSelected ? "#4CAF50" : "#f0f0f0",
    color: isSelected ? "white" : "black",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s"
  })
};

export default function Start({ onStart }) {
  const [difficulty, setDifficulty] = useState('medium');

  const difficulties = [
    { id: 'easy', name: 'Легкий' },
    { id: 'medium', name: 'Середній' },
    { id: 'hard', name: 'Важкий' }
  ];

  const handleStart = () => {
    onStart(difficulty);
  };

  return (
    <div className="container">
      <h1>Welcome to Sudoku!</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Оберіть рівень складності:</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setDifficulty(diff.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: difficulty === diff.id ? '#4CAF50' : '#f0f0f0',
                color: difficulty === diff.id ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              <div>{diff.name}</div>
              <small>{diff.description}</small>
            </button>
          ))}
        </div>
      </div>
      
      <Button onClick={handleStart}>Start Game</Button>
    </div>
  );
}