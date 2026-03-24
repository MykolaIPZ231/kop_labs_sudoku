import React, { useState } from "react";
import Button from "../components/Button";
import DifficultySettings from "../components/DifficultySettings";
import { useDifficulty } from "../contexts/DifficultyContext";

export default function Start({ onStart }) {
  const [showSettings, setShowSettings] = useState(false);
    const { currentDifficulty, difficultyConfig, getStatsForDifficulty } = useDifficulty();
    const stats = getStatsForDifficulty(currentDifficulty);

  const handleStart = () => {
      onStart(currentDifficulty);
    };

  return (
    <div className="container">
      <h1>Welcome to Sudoku!</h1>

      <div style={styles.infoCard}>
              <h3>Поточний рівень: {difficultyConfig.name}</h3>
              <p>{difficultyConfig.cellsToRemove} пустих клітинок</p>
              <p>Множник часу: x{difficultyConfig.timeMultiplier}</p>

              {stats.gamesPlayed > 0 && (
                <div style={styles.stats}>
                  <h4>Ваша статистика:</h4>
                  <p>Зіграно: {stats.gamesPlayed}</p>
                  <p>Перемог: {stats.gamesWon}</p>
                  <p>Успішність: {Math.round((stats.gamesWon / stats.gamesPlayed) * 100)}%</p>
                </div>
              )}
            </div>
      
            <div style={styles.buttonGroup}>
              <Button onClick={handleStart}>Почати гру</Button>
              <Button
                onClick={() => setShowSettings(true)}
                style={{ backgroundColor: "#6c757d" }}
              >
                Налаштування
              </Button>
            </div>

            {showSettings && (
              <DifficultySettings
                onClose={() => setShowSettings(false)}
                onApply={() => setShowSettings(false)}
              />
            )}
          </div>
        );
      }

      const styles = {
        container: {
          textAlign: "center",
          padding: "40px",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#0a0a0a"
        },
        title: {
          color: "#ffffff",
          marginBottom: "30px"
        },
        cardTitle: {
            color: "#ffffff",
            marginTop: 0,
            marginBottom: "15px"
          },
          cardText: {
            color: "#cccccc",
            margin: "10px 0"
          },
          stats: {
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid #333"
          },
          statsTitle: {
            color: "#4a9eff",
            marginBottom: "10px"
          },
          statsText: {
            color: "#cccccc",
            margin: "5px 0"
          },
          buttonGroup: {
            display: "flex",
            gap: "15px",
            justifyContent: "center"
          }
        };