import SudokuG from "../components/SudokuG";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { useSudokuValidator } from "../hooks/useSudokuValidator";
import NumberPad from "../components/NumberPad";
import GameControls from "../components/GameControls";
import ErrorMessage from "../components/ErrorMessage";
import SelectedCellInfo from "../components/SelectedCellInfo";
import useGameLogic from "../hooks/useGameLogic";
import useInitialCellCheck from "../hooks/useInitialCellCheck";

export default function GamePage({
  board, selectedCell,
  selectCell, setCellValue, 
  onFinish, initialGrid
 }) {
    const {
      errorMessage,
      isChecking,
      handleNumberClick,
      handleClearCell,
      handleFinish,
      canEditSelected
    } = useGameLogic(board, initialGrid, selectedCell, setCellValue, onFinish);

    const { isInitialCell } = useInitialCellCheck(initialGrid);

    if (!board || !Array.isArray(board) || board.length === 0) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Game Page</h2>
          <p style={{ color: "red" }}>Поле ще не згенероване або воно порожнє</p>
          <button onClick={onFinish}>Завершити (для тесту)</button>
        </div>
      );
    }

    return (
      <div style={{ padding: 20 }}>
        <h2>Судоку</h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SudokuG
            grid={board}
            selectedCell={selectedCell}
            onCellClick={selectCell}
            initialGrid={initialGrid}
          />

          <ErrorMessage message={errorMessage} />

          <NumberPad
            onNumberClick={handleNumberClick}
            onClear={handleClearCell}
            canClear={canEditSelected()}
            selectedCell={selectedCell}
          />
        </div>

        <GameControls onFinish={handleFinish} isChecking={isChecking} />

        <SelectedCellInfo
          selectedCell={selectedCell}
          isInitial={selectedCell ? isInitialCell(selectedCell.row, selectedCell.col) : false}
        />
      </div>
    );
  }