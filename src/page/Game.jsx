import React from "react";

import SudokuG from "../components/SudokuG";
import Button from "../components/Button";

export default function Game({
    grid,
    selectedCell,
    selectCell,
    setCellValue,
    onFinish
}) {
    return (
        <div className="container">
            <SudokuG
                grid={grid}
                selectedCell={selectedCell}
                selectCell={selectCell}
            />

            <div style={{ marginTop: "20px" }}>
                <Button onClick={() => setCellValue(1)}>1</Button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <Button onClick={onFinish}>Finish Game</Button>
            </div>
        </div>
    );
}