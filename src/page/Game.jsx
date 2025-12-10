import React from "react";

import SudokuG from "../components/SudokuG";
import Button from "../components/Button";

export default function Game({onFinish}) {
    return(
        <div className="container">
            <SudokuG />

            <div style={{ marginTop: "20px" }}>
                <Button onClick={onFinish}>finish</Button>
            </div>
        </div>
    );
}