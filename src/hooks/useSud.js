import { useState, useCallback } from "react";

export default function useSudoku() {
    const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

    const[grid, setGrid] = useState(emptyGrid);
    const [initialGrid, setInitialGrid] = useState(emptyGrid);
    const[selectedCell, setSelectedCell] = useState(null);

    const selectCell = (row, col) => {
        if(initialGrid[row][col] !== 0){
            return;
        }
        setSelectedCell({ row, col });
    };

        const setCellValue = useCallback((value) => {
            setGrid(prev => {
                if (!selectedCell) return prev;

                const { row, col } = selectedCell;

                if (initialGrid[row]?.[col] !== 0) {
                    return prev;
                }

                const newGrid = prev.map(r => [...r]);
                newGrid[row][col] = value;
                return newGrid;
            });
        }, [selectedCell, initialGrid]);

        const resetGrid = useCallback(() => {
            setGrid(initialGrid.map(row => [...row]));
            setSelectedCell(null);
        }, [initialGrid]);

    const setInitialGridValues = useCallback((newGrid) => {
            const gridCopy = newGrid.map(row => [...row]);
            setInitialGrid(gridCopy);
            setGrid(gridCopy);
            setSelectedCell(null);
        }, []);

    return{
        grid,
        setGrid,
        selectedCell,
        selectCell,
        setCellValue,
        resetGrid,
        initialGrid,
        setInitialGridValues
    };
}