import React from "react";

export default function SelectedCellInfo({ selectedCell, isInitial }) {
  if (!selectedCell) return null;

  return (
    <div style={{
      marginTop: 20,
      padding: 10,
      backgroundColor: isInitial ? "rgba(255, 193, 7, 0.2)" : "rgba(74, 158, 255, 0.2)",
      borderRadius: 5,
      border: `1px solid ${isInitial ? "#ffc107" : "#4a9eff"}`,
      color: "#ffffff"
    }}>
      <p style={{ margin: 0 }}>
        Вибрано клітинку: рядок {selectedCell.row + 1}, стовпець {selectedCell.col + 1}
        {isInitial && " (початкове значення, не можна змінити)"}
      </p>
    </div>
  );
}