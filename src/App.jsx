import useNavigation from "./hooks/useNavigation";
import useSudoku from "./hooks/useSud";
import useSudokuGenerator from "./hooks/sudGen";
import Header from "./components/Header";
import Start from "./page/Start";
import Game from "./page/Game";
import Res from "./page/Res";
import useSudokuGame from "./hooks/useSudokuGame";
import "./style.css";
import { useState } from "react";

function App() {
    const { page, goToStart, goToGame, goToResults } = useNavigation();
    const {
        grid,
        initialGrid,
        selectedCell,
        selectCell,
        setCellValue,
        startNewGame,
        resetGrid
      } = useSudokuGame();

    const handleStartGame = (difficulty) => {
        startNewGame(difficulty);
        goToGame();
    };

    const handleFinishGame = () =>{
        goToResults();
    };

    const handleRestartGame = () => {
      resetGrid();
      goToStart();
    };

    const handleBackToStart = () => {
      goToStart();
    }
    return (
       <div className="App">
            {page === "start" && <Start onStart={handleStartGame} />}
            {page === "game" && (
              <Game
                board={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                selectCell={selectCell}
                setCellValue={setCellValue}
                onFinish={handleFinishGame}
              />
            )}

        {page === "results" && (
          <Res
          onStart={handleRestartGame}
          onRestart={handleBackToStart}
          />
        )}
      </div>
    );
}

export default App;