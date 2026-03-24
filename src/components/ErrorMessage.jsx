import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{
      marginTop: 20,
      padding: 15,
      backgroundColor: "rgba(231, 76, 60, 0.2)",
      border: "1px solid #ef5350",
      borderRadius: 8,
      color: "#ff6b6b",
      maxWidth: "100%",
      textAlign: "center"
    }}>
      {message}
    </div>
  );
}