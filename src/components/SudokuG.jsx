import Cell from "./Cell.jsx";

export default function SudokuG({ grid, selectedCell, onCellClick }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 40px)",
            gridTemplateRows: "repeat(9, 40px)",
            gap: "2px"
        }}>
            {grid.map((row, rIndex) =>
                row.map((value, cIndex) => (
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
                    />  
                )))}
        </div>
    );
}