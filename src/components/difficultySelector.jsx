import React from "react";

export default function DifficultySelector({ currentDifficulty, onSelect }) {
  const difficulties = [
    { id: 'easy', name: 'Легкий'},
    { id: 'medium', name: 'Середній'},
    { id: 'hard', name: 'Важкий'}
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Оберіть рівень складності:</h3>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelect(diff.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: currentDifficulty === diff.id ? '#4CAF50' : '#f0f0f0',
              color: currentDifficulty === diff.id ? 'white' : 'black',
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
  );
}