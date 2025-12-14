import useNavigation from "./hooks/useNavigation";
import useSudoku from "./hooks/useSud";
import useSudokuGenerator from "./hooks/sudGen";
import Header from "./components/Header";
import Start from "./page/Start";
import Game from "./page/Game";
import Res from "./page/Res";
import "./style.css";
import { useState } from "react";

export default function App() {
    const { page, goToStart, goToGame, goToResults } = useNavigation();
    const sudoku = useSudoku();
    const generator = useSudokuGenerator('medium');
    const [currentDifficulty, setCurrentDifficulty] =  useState('medium');

    const handleStart = (difficulty) => {
        setCurrentDifficulty(difficulty);
        generator.regenerate(difficulty); 
        sudoku.setInitialGridValues(generator.board);
        goToGame();
    };

    const handleRestart = () => {
      generator.regenerate(currentDifficulty);
      sudoku.setInitialGridValues(generator.board);
      goToGame();
    }

    const handleGoHome = () => {
      goToStart();
    }
    return (
      <>
        <Header />
        {page === "start" && (
          <Start onStart={handleStart} />
        )}

        {page === "game" && (
          <Game
            board={sudoku.grid}
            initialGrid={sudoku.initialGrid}
            selectedCell={sudoku.selectedCell}
            selectCell={sudoku.selectCell}
            setCellValue={sudoku.setCellValue}
            onFinish={goToResults}
          />
        )}

        {page === "results" && (
          <Res
          onStart={handleGoHome}
          onRestart={handleRestart} 
          />
        )}
      </>
    );
}