import React from "react";
import Button from "../components/Button";

export default function Start({onStart}) {
  return (
    <div className="container">
      <h1>Welcome to Sudoku!</h1>
      <Button onClick={onStart}>Start</Button>
    </div>
  );
}