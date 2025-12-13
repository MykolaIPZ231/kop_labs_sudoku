import SudokuG from "../components/SudokuG";
import Button from "../components/Button";
import React, { useEffect } from "react";

export default function GamePage({ board, onFinish }) {
  useEffect(() => {
    console.log("GamePage mounted, board:", board);
  }, [board]);

  if (!board || !Array.isArray(board) || board.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Game Page</h2>
        <p style={{ color: "red" }}>Поле ще не згенероване або воно порожнє</p>
        <button onClick={onFinish}>Завершити (для тесту)</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <p>Рівень: Середній (50% пустих клітинок)</p>
      
      <SudokuG 
        grid={board} 
        selectedCell={null} 
        onCellClick={() => {}} 
      />

      <div style={{ marginTop: 16 }}>
        <Button onClick={onFinish}>Завершити гру</Button>
      </div>
    </div>
  );
}