import { useState, useEffect, useCallback } from "react";
import useSudokuGenerator from "./sudGen";
import useSudoku from "./useSud";

export default function useSudokuGame(initialDifficulty = 'medium') {
  const { board, fullBoard, setDifficulty, regenerate } = useSudokuGenerator(initialDifficulty);

  const {
    grid,
    setGrid,
    selectedCell,
    selectCell,
    setCellValue,
    resetGrid,
    initialGrid,
    setInitialGridValues
  } = useSudoku();

  useEffect(() => {
    if (board && board.length) {
      setInitialGridValues(board);
    }
  }, [board, setInitialGridValues]);

  const changeDifficulty = useCallback((difficulty) => {
    setDifficulty(difficulty);
  }, [setDifficulty]);

  const startNewGame = useCallback((difficulty) => {
    setDifficulty(difficulty);
  }, [setDifficulty]);

  return {
    grid,
    initialGrid,
    selectedCell,

    selectCell,
    setCellValue,
    resetGrid,

    startNewGame,
    changeDifficulty,
    regenerate
  };
}