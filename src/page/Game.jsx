import SudokuG from "../components/SudokuG";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { useSudokuValidator } from "../hooks/useSudokuValidator";
import NumberPad from "../components/NumberPad";
import GameControls from "../components/GameControls";
import ErrorMessage from "../components/ErrorMessage";
import SelectedCellInfo from "../components/SelectedCellInfo";
import useGameLogic from "../hooks/useGameLogic";
import useInitialCellCheck from "../hooks/useInitialCellCheck";
import { useDifficulty } from "../contexts/DifficultyContext";
import DifficultySettings from "../components/DifficultySettings";
import GameCompletionDialog from "../components/GameCompletionDialog";

export default function GamePage({
  board, selectedCell,
  selectCell, setCellValue,
  onFinish, initialGrid, onNewGame
 }) {
    const { currentDifficulty, difficultyConfig } = useDifficulty();
      const [showSettings, setShowSettings] = useState(false);
      const [showCompletionDialog, setShowCompletionDialog] = useState(false);
      const [timeSpent, setTimeSpent] = useState(0);
      const [isGameFinished, setIsGameFinished] = useState(false);

      const {
        errorMessage,
        isChecking,
        handleNumberClick,
        handleClearCell,
        handleFinish,
        canEditSelected
      } = useGameLogic(board, initialGrid, selectedCell, setCellValue, () => {
        setIsGameFinished(true);
        setShowCompletionDialog(true);
      });

    const { isInitialCell } = useInitialCellCheck(initialGrid);

    useEffect(() => {
        let timer;
        if (!isGameFinished && board && !errorMessage) {
          timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [isGameFinished, board, errorMessage]);

      useEffect(() => {
        setTimeSpent(0);
        setIsGameFinished(false);
        setShowCompletionDialog(false);
      }, [board]);

      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };

      const handleFinishWithDialog = () => {
        handleFinish();
      };

      const handleRestart = () => {
        setShowCompletionDialog(false);
        setIsGameFinished(false);
        setTimeSpent(0);
        onFinish();
      };

      const handleNewGame = () => {
        setShowCompletionDialog(false);
        setIsGameFinished(false);
        setTimeSpent(0);
        if (onNewGame) {
          onNewGame();
        }
      };

    return (
      <div style={{ padding: 20 }}>
            <div style={styles.header}>
              <h2>Судоку - {difficultyConfig.name}</h2>
              <div style={styles.headerControls}>
                <div style={styles.timer}>Таймер {formatTime(timeSpent)}</div>
                <button
                  onClick={() => setShowSettings(true)}
                  style={styles.settingsButton}
                >
                  Налаштування
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SudokuG
                grid={board}
                selectedCell={selectedCell}
                onCellClick={selectCell}
                initialGrid={initialGrid}
              />

              <ErrorMessage message={errorMessage} />

              <NumberPad
                onNumberClick={handleNumberClick}
                onClear={handleClearCell}
                canClear={canEditSelected()}
                selectedCell={selectedCell}
              />
            </div>

            <GameControls onFinish={handleFinishWithDialog} isChecking={isChecking} />

            <SelectedCellInfo
              selectedCell={selectedCell}
              isInitial={selectedCell ? isInitialCell(selectedCell.row, selectedCell.col) : false}
            />

            {showSettings && (
              <DifficultySettings
                onClose={() => setShowSettings(false)}
                onApply={(settings) => {
                  console.log('Налаштування застосовано:', settings);
                  setShowSettings(false);
                }}
              />
            )}

            <GameCompletionDialog
              isOpen={showCompletionDialog}
              onClose={() => setShowCompletionDialog(false)}
              onRestart={handleRestart}
              onNewGame={handleNewGame}
              timeSpent={timeSpent}
            />
          </div>
    );
  }

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff'
  },
  title: {
    color: '#ffffff',
    margin: 0
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px 20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  headerControls: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  timer: {
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: '#2c3e50',
    color: '#4a9eff',
    padding: '5px 15px',
    borderRadius: '20px'
  },
  settingsButton: {
    padding: '8px 16px',
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    border: '1px solid #4a9eff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  gameArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorText: {
    color: '#ff6b6b'
  },
  testButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};