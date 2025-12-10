import React, { useState } from "react";

import Header from "./components/Header";
import Start from "./page/Start";
import Game from "./page/Game";
import Res from "./page/Res";
import "./style.css";

export default function App() {
  const[page, setPage] = useState("start");

  return(
    <>
      <Header />

      {page === "start" && <Start onStart={() => setPage("game")} />}
      {page === "game" && <Game onFinish={() => setPage("res")} />}
      {page === "res" && <Res onRestart={() => setPage("start")} />}  
    </>
  );
}
