import React from "react";

export default function NumberPad({ onNumberClick, onClear, canClear, selectedCell }) {
  return (
    <div style={{
      marginTop: 30,
      width: "100%",
      backgroundColor: "#1a1a1a",
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
    }}>
      <h3 style={{ marginBottom: 15, textAlign: "center", color: "#ffffff" }}>Оберіть число:</h3>
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
              backgroundColor: "#2c3e50",
              color: "#4a9eff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#4a9eff";
              e.target.style.color = "#ffffff";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2c3e50";
              e.target.style.color = "#4a9eff";
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
            backgroundColor: !canClear ? "#555" : "#e74c3c",
            padding: "10px 20px",
            color: "#ffffff",
            border: "none",
            borderRadius: 5,
            cursor: !canClear ? "not-allowed" : "pointer",
            fontSize: "16px",
            transition: "all 0.2s"
          }}
          disabled={!canClear}
        >
          {!canClear ? "Неможливо очистити" : "Очистити клітинку"}
        </button>
      </div>
    </div>
  );
}