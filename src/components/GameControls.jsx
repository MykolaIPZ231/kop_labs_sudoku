import React from "react";
import Button from "./Button";

export default function GameControls({ onFinish, isChecking }) {
  return (
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <Button
        onClick={onFinish}
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
  );
}