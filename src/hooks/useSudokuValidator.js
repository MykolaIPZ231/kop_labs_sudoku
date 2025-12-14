import { useCallback } from "react";

export function useSudokuValidator() {
  
  const validateSudoku = useCallback((board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return { isValid: false, message: "Не всі клітинки заповнені!" };
        }
      }
    }

    for (let row = 0; row < 9; row++) {
      const seen = new Set();
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num < 1 || num > 9) {
          return { isValid: false, message: "Некоректне значення у клітинці!" };
        }
        if (seen.has(num)) {
          return { isValid: false, message: `Помилка в рядку ${row + 1}: число ${num} повторюється` };
        }
        seen.add(num);
      }
    }

    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let row = 0; row < 9; row++) {
        const num = board[row][col];
        if (seen.has(num)) {
          return { isValid: false, message: `Помилка в стовпці ${col + 1}: число ${num} повторюється` };
        }
        seen.add(num);
      }
    }

    for (let blockRow = 0; blockRow < 3; blockRow++) {
      for (let blockCol = 0; blockCol < 3; blockCol++) {
        const seen = new Set();
        for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
          for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
            const num = board[row][col];
            if (seen.has(num)) {
              return { 
                isValid: false, 
                message: `Помилка в блоці (${blockRow + 1},${blockCol + 1}): число ${num} повторюється` 
              };
            }
            seen.add(num);
          }
        }
      }
    }

    return { isValid: true, message: "Судоку розв'язано" };
  }, []);

  const compareWithSolution = useCallback((board, solution) => {
    if (!solution) return validateSudoku(board);
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solution[row][col]) {
          return { 
            isValid: false, 
            message: `Помилка в клітинці (${row + 1},${col + 1}): має бути ${solution[row][col]}, а не ${board[row][col]}`
          };
        }
      }
    }
    
    return { isValid: true, message: "Судоку розв'язано" };
  }, [validateSudoku]);

  const validateCell = useCallback((board, row, col) => {
    const value = board[row][col];
    if (value === 0) return { isValid: true, message: "" };
    
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) {
        return { isValid: false, message: `Число ${value} повторюється в рядку ${row + 1}` };
      }
    }
    
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) {
        return { isValid: false, message: `Число ${value} повторюється в стовпці ${col + 1}` };
      }
    }
    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (r !== row && c !== col && board[r][c] === value) {
          return { isValid: false, message: `Число ${value} повторюється в блоці` };
        }
      }
    }
    
    return { isValid: true, message: "" };
  }, []);

  return {
    validateSudoku,
    compareWithSolution,
    validateCell
  };
}

export default useSudokuValidator;