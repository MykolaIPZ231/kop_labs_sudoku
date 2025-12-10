import Cell from "./Cell.jsx";

export default function SudokuG(){
    const placeholderGrid = Array.from({length: 9}, () =>
        Array(9).fill(null)
    );

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 1fr)',
            gridTemplateRows: 'repeat(9, 1fr)',
            gap: "0"
        }}>
            {placeholderGrid.flat().map((val, idx) => (
                <Cell key={idx} value={val} />
            ))}
        </div>
    );
}