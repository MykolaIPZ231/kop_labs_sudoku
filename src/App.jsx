import useNavigation from "./hooks/useNavigation";
import useSudokuGenerator from "./hooks/sudGen";
import Header from "./components/Header";
import Start from "./page/Start";
import Game from "./page/Game";
import Res from "./page/Res";
import "./style.css";

export default function App() {
    const { page, goToStart, goToGame, goToResults } = useNavigation();
    const { board, regenerate } = useSudokuGenerator('medium');

    const handleStart = (difficulty = 'medium') => {
        regenerate(difficulty); 
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
            board={board}
            onFinish={goToResults}
          />
        )}

        {page === "results" && (
          <Res onRestart={goToStart} />
        )}
      </>
    );
}