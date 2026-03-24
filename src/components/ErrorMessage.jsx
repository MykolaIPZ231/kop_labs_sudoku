import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
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
      {message}
    </div>
  );
}