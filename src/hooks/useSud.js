import { useState } from "react";

export default function useSudoku() {
    const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

    const[grid, setGrid] = useState(emptyGrid);
    const[selectedCell, setSelectedCell] = useState(null);

    const selectCell = (row, col) =>{
        setSelectedCell({ row, col });
    };

    const setCellValue = (value) => {
        if(!selectedCell) return;

        const { row, col } = selectedCell;

        setGrid(prev => {
            const newGrid = prev.map(r => [...r]);
            newGrid[row][col] = value;
            return newGrid;
        });
    };

    const resetGrid = () => {
        setGrid(emptyGrid);
        setSelectedCell(null);
    };

    return{
        grid,
        setGrid,
        selectedCell,
        selectCell,
        setCellValue,
        resetGrid
    };
}