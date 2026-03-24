import React from "react";

export default function SelectedCellInfo({ selectedCell, isInitial }) {
  if (!selectedCell) return null;

  return (
    <div style={{
      marginTop: 20,
      padding: 10,
      backgroundColor: isInitial ? "#ffecb3" : "#e8f4fc",
      borderRadius: 5,
      border: `1px solid ${isInitial ? "#ffd54f" : "#b3d9ff"}`
    }}>
      <p style={{ margin: 0 }}>
        Вибрано клітинку: рядок {selectedCell.row + 1}, стовпець {selectedCell.col + 1}
        {isInitial && " (початкове значення, не можна змінити)"}
      </p>
    </div>
  );
}