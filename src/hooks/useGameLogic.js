import { useState, useCallback } from "react";
import { useSudokuValidator } from "./useSudokuValidator";
import useInitialCellCheck from "./useInitialCellCheck";

export default function useGameLogic(grid, initialGrid, selectedCell, setCellValue, onFinish) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const { validateSudoku } = useSudokuValidator();
  const { canEditCell } = useInitialCellCheck(initialGrid);

  const handleNumberClick = useCallback((num) => {
    setErrorMessage(null);
    setCellValue(num);
  }, [setCellValue]);

  const handleClearCell = useCallback(() => {
    setErrorMessage(null);
    if (selectedCell && canEditCell(selectedCell.row, selectedCell.col)) {
      setCellValue(0);
    }
  }, [selectedCell, canEditCell, setCellValue]);

  const handleFinish = useCallback(() => {
    setIsChecking(true);
    setErrorMessage(null);

    const result = validateSudoku(grid);

    if (result.isValid) {
      onFinish();
    } else {
      setErrorMessage(result.message);
    }
    setIsChecking(false);
  }, [grid, validateSudoku, onFinish]);

  const canEditSelected = useCallback(() => {
    return selectedCell && canEditCell(selectedCell.row, selectedCell.col);
  }, [selectedCell, canEditCell]);

  return {
    errorMessage,
    isChecking,
    handleNumberClick,
    handleClearCell,
    handleFinish,
    canEditSelected
  };
}