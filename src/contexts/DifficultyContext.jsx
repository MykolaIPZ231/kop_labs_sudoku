import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DifficultyContext = createContext();

const DIFFICULTY_LEVELS = {
  easy: { id: 'easy', name: 'Легкий', cellsToRemove: 30, timeMultiplier: 1.5 },
  medium: { id: 'medium', name: 'Середній', cellsToRemove: 40, timeMultiplier: 1 },
  hard: { id: 'hard', name: 'Важкий', cellsToRemove: 50, timeMultiplier: 0.7 }
};

export function DifficultyProvider({ children }) {
  const [currentDifficulty, setCurrentDifficulty] = useState(() => {
    const saved = localStorage.getItem('sudoku_difficulty');
    return saved && DIFFICULTY_LEVELS[saved] ? saved : 'medium';
  });

  const [difficultyStats, setDifficultyStats] = useState(() => {
    const saved = localStorage.getItem('sudoku_stats');
    return saved ? JSON.parse(saved) : {
      easy: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
      medium: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
      hard: { gamesPlayed: 0, gamesWon: 0, bestTime: null }
    };
  });

  useEffect(() => {
    localStorage.setItem('sudoku_difficulty', currentDifficulty);
  }, [currentDifficulty]);

  useEffect(() => {
    localStorage.setItem('sudoku_stats', JSON.stringify(difficultyStats));
  }, [difficultyStats]);

  const changeDifficulty = useCallback((difficulty) => {
    if (DIFFICULTY_LEVELS[difficulty]) {
      setCurrentDifficulty(difficulty);
    }
  }, []);

  const updateStats = useCallback((difficulty, won, timeSpent = null) => {
    setDifficultyStats(prev => {
      const newStats = { ...prev };
      const levelStats = { ...newStats[difficulty] };

      levelStats.gamesPlayed += 1;
      if (won) {
        levelStats.gamesWon += 1;
        if (timeSpent && (!levelStats.bestTime || timeSpent < levelStats.bestTime)) {
          levelStats.bestTime = timeSpent;
        }
      }

      newStats[difficulty] = levelStats;
      return newStats;
    });
  }, []);

  const getDifficultyConfig = useCallback(() => {
    return DIFFICULTY_LEVELS[currentDifficulty];
  }, [currentDifficulty]);

  const getStatsForDifficulty = useCallback((difficulty) => {
    return difficultyStats[difficulty] || { gamesPlayed: 0, gamesWon: 0, bestTime: null };
  }, [difficultyStats]);

  return (
    <DifficultyContext.Provider value={{
      currentDifficulty,
      difficultyConfig: DIFFICULTY_LEVELS[currentDifficulty],
      allDifficulties: DIFFICULTY_LEVELS,
      changeDifficulty,
      updateStats,
      getDifficultyConfig,
      getStatsForDifficulty,
      difficultyStats
    }}>
      {children}
    </DifficultyContext.Provider>
  );
}

export function useDifficulty() {
  const context = useContext(DifficultyContext);
  if (!context) {
    throw new Error('useDifficulty must be used within DifficultyProvider');
  }
  return context;
}