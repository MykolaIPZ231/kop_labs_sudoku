import useNavigation from "./hooks/useNavigation";
import useSudoku from "./hooks/useSud";
import useSudokuGenerator from "./hooks/sudGen";
import Header from "./components/Header";
import Start from "./page/Start";
import Game from "./page/Game";
import Res from "./page/Res";
import "./style.css";

export default function App() {
    const { page, goToStart, goToGame, goToResults } = useNavigation();
    const sudoku = useSudoku();
    const generator = useSudokuGenerator('medium');

    const handleStart = (difficulty) => {
        generator.regenerate(difficulty); 
        sudoku.setGrid(generator.board);
        goToGame();
    };

    return (
      <>
        <Header />
        {page === "start" && (
          <Start onStart={handleStart} />
        )}

        {page === "game" && (
          <Game
            board={sudoku.grid}
            selectedCell={sudoku.selectedCell}
            selectCell={sudoku.selectCell}
            setCellValue={sudoku.setCellValue}
            onFinish={goToResults}
          />
        )}

        {page === "results" && (
          <Res onRestart={goToStart} />
        )}
      </>
    );
}