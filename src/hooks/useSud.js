import { useState } from "react";

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

    const setCellValue = (value) => {
        if(!selectedCell) return;

        const { row, col } = selectedCell;

        if(initialGrid[row][col] !== 0){
            return;
        }

        setGrid(prev => {
            const newGrid = prev.map(r => [...r]);
            newGrid[row][col] = value;
            return newGrid;
        });
    };

    const resetGrid = () => {
        setGrid(initialGrid);
        setSelectedCell(null);
    };

    const setInitialGridValues = (newGrid) => {
        setInitialGrid(newGrid.map(row => [...row]));
        setGrid(newGrid.map(row => [...row]));
        setSelectedCell(null);
    };

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