import React from "react";

export default function NumberPad({ onNumberClick, onClear, canClear, selectedCell }) {
  return (
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
            onClick={() => onNumberClick(num)}
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
          onClick={onClear}
          style={{
            backgroundColor: !canClear ? "#bdc3c7" : "#e74c3c",
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: !canClear ? "not-allowed" : "pointer",
            fontSize: "16px"
          }}
          disabled={!canClear}
        >
          {!canClear ? "Неможливо очистити" : "Очистити клітинку"}
        </button>
      </div>
    </div>
  );
}