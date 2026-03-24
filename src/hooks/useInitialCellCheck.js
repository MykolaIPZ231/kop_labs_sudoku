import { useCallback } from "react";

export default function useInitialCellCheck(initialGrid) {
  const isInitialCell = useCallback((row, col) => {
    return initialGrid && initialGrid[row]?.[col] !== 0;
  }, [initialGrid]);

  const canEditCell = useCallback((row, col) => {
    return !isInitialCell(row, col);
  }, [isInitialCell]);

  return {
    isInitialCell,
    canEditCell
  };
}