import { useState, useCallback } from "react";

export function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
    if (board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

export function generateFullSudokuBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function fillCell(row, col) {
    if (row === 9) return true;

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;

    const shuffled = [...nums].sort(() => Math.random() - 0.5);

    for (let num of shuffled) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (fillCell(nextRow, nextCol)) {
          return true;
        }
        board[row][col] = 0;
      }
    }

    return false;
  }

  fillCell(0, 0);
  return board;
}

export function createPuzzle(board, difficulty = 'medium') {
  const puzzle = board.map(row => [...row]);
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50   
  };
  
  const cells = cellsToRemove[difficulty] || cellsToRemove.medium;

  const positions = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (let i = 0; i < cells; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = 0;
  }
  
  return puzzle;
}

export function generateSudokuBoard(difficulty = 'medium') {
  const fullBoard = generateFullSudokuBoard();
  const puzzle = createPuzzle(fullBoard, difficulty);
  
  return {
    fullBoard, 
    puzzle,    
    difficulty
  };
}

export default function useSudokuGenerator(initialDifficulty = 'medium') {
  const [gameState, setGameState] = useState(() => 
    generateSudokuBoard(initialDifficulty)
  );

  const regenerate = useCallback((difficulty = initialDifficulty) => {
    setGameState(generateSudokuBoard(difficulty));
  }, [initialDifficulty]);

  const setDifficulty = useCallback((difficulty) => {
    setGameState(generateSudokuBoard(difficulty));
  }, []);

  return { 
    board: gameState.puzzle, 
    fullBoard: gameState.fullBoard,
    difficulty: gameState.difficulty,
    regenerate,
    setDifficulty
  };
}