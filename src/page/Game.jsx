import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import useGameLogic from '../hooks/useGameLogic';
import useInitialCellCheck from '../hooks/useInitialCellCheck';
import GameCompletionDialog from '../components/GameCompletionDialog';
import DifficultySettings from '../components/DifficultySettings';
import {
  Container,
  Card,
  Title,
  Button,
  Flex,
  SudokuGrid,
  NumberPadGrid,
  NumberButton,
  StatsCard,
  StatValue
} from '../styles/StyledComponents';
import SudokuG from '../components/SudokuG';

export default function GamePage({
  board, selectedCell,
  selectCell, setCellValue,
  onFinish, initialGrid, onNewGame
 }) {
    const { currentDifficulty, difficultyConfig, updateStats } = useDifficulty();
    const { currentUser, updateUserStats } = useUser();
    const navigate = useNavigate();
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

        if (currentUser) {
              updateUserStats(currentDifficulty, true, timeSpent);
            }
            updateStats(currentDifficulty, true, timeSpent);
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

    if (!board || !Array.isArray(board) || board.length === 0) {
      return (
        <Container>
          <Card>
            <Title center>Завантаження...</Title>
          </Card>
        </Container>
      );
    }

    return (
          <Container>
            {/* Header */}
            <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
              <Title size="28px">Судоку - {difficultyConfig.name}</Title>
              <Flex gap="15px">
                <StatsCard style={{ padding: '10px 20px' }}>
                  <StatValue style={{ fontSize: '20px' }}>⏱️ {formatTime(timeSpent)}</StatValue>
                </StatsCard>
                <Button warning onClick={() => setShowSettings(true)}>
                  ⚙️ Налаштування
                </Button>
                <Button onClick={() => navigate(`/user/${currentUser?.id}`)}>
                  👤 Профіль
                </Button>
              </Flex>
            </Flex>

            {/* Game Area */}
            <Flex column align="center" gap="20px">
              <SudokuG
                grid={board}
                selectedCell={selectedCell}
                onCellClick={selectCell}
                initialGrid={initialGrid}
              />

              {errorMessage && (
                <Card style={{ background: 'rgba(231, 76, 60, 0.2)', border: '1px solid #e74c3c' }}>
                  <p style={{ color: '#ff6b6b' }}>{errorMessage}</p>
                </Card>
              )}

              {/* Number Pad */}
              <Card style={{ width: '100%' }}>
                <Title size="20px" center mb="15px">Оберіть число:</Title>
                <NumberPadGrid>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <NumberButton key={num} onClick={() => handleNumberClick(num)}>
                      {num}
                    </NumberButton>
                  ))}
                </NumberPadGrid>

                <Flex justify="center" style={{ marginTop: '20px' }}>
                  <Button
                    danger
                    onClick={handleClearCell}
                    disabled={!canEditSelected()}
                  >
                    {!canEditSelected() ? "Неможливо очистити" : "Очистити клітинку"}
                  </Button>
                </Flex>
              </Card>

              {/* Game Controls */}
              <Button
                primary
                onClick={handleFinishWithDialog}
                disabled={isChecking}
                style={{ padding: '12px 40px', fontSize: '18px' }}
              >
                {isChecking ? "Перевірка..." : "Завершити гру"}
              </Button>

              {/* Selected Cell Info */}
              {selectedCell && (
                <Card style={{ background: isInitialCell(selectedCell.row, selectedCell.col)
                  ? 'rgba(255, 193, 7, 0.2)'
                  : 'rgba(74, 158, 255, 0.2)'
                }}>
                  <p>
                    Вибрано клітинку: рядок {selectedCell.row + 1}, стовпець {selectedCell.col + 1}
                    {isInitialCell(selectedCell.row, selectedCell.col) && " (початкове значення, не можна змінити)"}
                  </p>
                </Card>
              )}
            </Flex>

            {showSettings && (
              <DifficultySettings
                onClose={() => setShowSettings(false)}
                onApply={() => setShowSettings(false)}
              />
            )}

            <GameCompletionDialog
              isOpen={showCompletionDialog}
              onClose={() => setShowCompletionDialog(false)}
              onRestart={handleRestart}
              onNewGame={handleNewGame}
              timeSpent={timeSpent}
            />
          </Container>
    );
  }