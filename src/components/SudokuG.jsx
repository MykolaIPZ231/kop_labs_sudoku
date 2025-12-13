import Cell from "./Cell.jsx";

export default function SudokuG({ grid, selectedCell, onCellClick, initialGrid }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 40px)",
            gridTemplateRows: "repeat(9, 40px)",
            gap: "2px"
        }}>
            {grid.map((row, rIndex) =>
                row.map((value, cIndex) => {
                    const isInitial = initialGrid && initialGrid[rIndex][cIndex] !== 0;
                    return (
                    <Cell
                        key={`${rIndex}-${cIndex}`}
                        value={value}
                        isSelected={
                            selectedCell?.row === rIndex &&
                            selectedCell?.col === cIndex
                        }
                        onClick={onCellClick ? () => onCellClick(rIndex, cIndex) : undefined}
                        row={rIndex}
                        col={cIndex}
                        isInitial={isInitial}
                    />  
                    );
            }))}
        </div>
    );
}