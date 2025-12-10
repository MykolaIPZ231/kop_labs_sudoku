import React from "react";

import Button from "../components/Button";

export default function Res({onRestart}) {
    return(
        <div className="container">
            <h2>Results</h2>

            <Button onClick={onRestart}>Restart</Button>
        </div>
    )
}