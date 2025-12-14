import SudokuG from "../components/SudokuG";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { useSudokuValidator } from "../hooks/useSudokuValidator";

export default function GamePage({
  board, selectedCell,
  selectCell, setCellValue, 
  onFinish, initialGrid
 }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const { validateSudoku } = useSudokuValidator();

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
    setErrorMessage(null);
    setCellValue(num);
  };

  const handleClearCell = () => {
    setErrorMessage(null);
    if(selectedCell) {
      const { row, col } = selectedCell;
      if(initialGrid && initialGrid[row][col] === 0){
        setCellValue(0);
      }
    }
  };

  const handleFinish = () =>{
    setIsChecking(true);
    setErrorMessage(null);

    const result = validateSudoku(board);

      if(result.isValid){
        onFinish();
      } else {
        setErrorMessage(result.message);
      }
      setIsChecking(false);
  };

  const handleCellClick = (row, col) => {
    setErrorMessage(null);
    selectCell(row, col);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <p>Рівень: Середній (50% пустих клітинок)</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SudokuG
          grid={board}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          initialGrid={initialGrid}
        />

        {errorMessage && (
          <div style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#ffebee",
            border: "1px solid #ef5350",
            borderRadius: 8,
            color: "#c62828",
            maxWidth: "100%",
            textAlign: "center"
          }}>
            {errorMessage}
          </div>
        )}

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
              onClick={handleClearCell}
              style={{
                backgroundColor: selectedCell && initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0
                  ? "#bdc3c7"
                  : "#e74c3c",
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: selectedCell && initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0
                  ? "not-allowed"
                  : "pointer",
                fontSize: "16px"
              }}
              disabled={selectedCell && initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0}
            >
              {selectedCell && initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0
              ? "Неможливо очистити"
              : "Очистити клітинку"}
            </button>
          </div>
        </div>
      </div>
    
      <div style={{ marginTop: 30 }}>
          <Button 
            onClick={handleFinish}
            style={{
              padding: "12px 30px",
              fontSize: "18px",
              backgroundColor: isChecking ? "#95a5a6" : "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: isChecking ? "wait" : "pointer",
              minWidth: "150px"
            }}
            disabled={isChecking}
          >
            {isChecking ? "Перевірка..." : "Завершити"}
          </Button>
        </div>

      {selectedCell && !errorMessage && (
        <div style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0 
          ? "#ffecb3" 
          : "#e8f4fc",
          borderRadius: 5,
          border: `1px solid ${initialGrid && initialGrid[selectedCell.row][selectedCell.col] !== 0 
              ? "#ffd54f" 
              : "#b3d9ff"}`
        }}>
          <p style={{ margin: 0 }}>
            row - {selectedCell.row + 1}, col - {selectedCell.col + 1}
          </p>
        </div>
      )}
    </div>
  );
}