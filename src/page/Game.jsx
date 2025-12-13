import SudokuG from "../components/SudokuG";
import Button from "../components/Button";
import React, { useEffect } from "react";

export default function GamePage({
  board, selectedCell,
  selectCell, setCellValue, onFinish
 }) {
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

  const handleNumberClick = (num) => {
    setCellValue(num);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <p>Рівень: Середній (50% пустих клітинок)</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SudokuG
          grid={board}
          selectedCell={selectedCell}
          onCellClick={selectCell}
        />
      <div style={{
        marginTop: 30,
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: 20,
        borderRadius: 10,
      }}>
        <h3 style={{ marginBottom: 15, textAlign: "center" }}>Оберіть число:</h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            maxWidth: 300,
            margin: "0 auto"
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                style={{
                  padding: "15px 0",
                  fontSize: "24px",
                  fontWeight: "bold",
                  backgroundColor: "#4a6fa5",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#3a5a8c";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#4a6fa5";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {num}
              </button>
            ))}
          </div>
          
          <div style={{ 
            marginTop: 20, 
            display: "flex", 
            justifyContent: "center",
            gap: 10
          }}>
            <button
              onClick={() => setCellValue(0)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Очистити клітинку
            </button>
          </div>
        </div>
      </div>
      

        
      <SudokuG 
        grid={board} 
        selectedCell={null} 
        onCellClick={() => {}} 
      />

      <div style={{ marginTop: 16 }}>
        <Button onClick={onFinish}>Завершити гру</Button>
      </div>

      {selectedCell && (
        <div style={{
          marginTop: 20,
          padding: 10,
          backgroundColor:  "#e0e0e0",
          borderRadius: 5
        }}>
          <p style={{ margin: 0 }}>
            row - {selectedCell.row + 1}, col - {selectedCell.col + 1}
          </p>
        </div>
      )}
    </div>
  );
}