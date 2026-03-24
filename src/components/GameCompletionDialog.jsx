import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDifficulty } from '../contexts/DifficultyContext';

export default function GameCompletionDialog({ isOpen, onClose, onRestart, onNewGame, timeSpent }) {
  const { currentDifficulty, difficultyConfig, updateStats, getStatsForDifficulty } = useDifficulty();
  const [animation, setAnimation] = useState('');
  const stats = getStatsForDifficulty(currentDifficulty);
  const isNewRecord = stats.bestTime === null || (timeSpent && timeSpent < stats.bestTime);

  useEffect(() => {
    if (isOpen) {
      setAnimation('fadeIn');
      if (timeSpent) {
        updateStats(currentDifficulty, true, timeSpent);
      }
    } else {
      setAnimation('fadeOut');
    }
  }, [isOpen, currentDifficulty, timeSpent, updateStats]);

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const portalRoot = document.getElementById('portal-root') || document.body;

  const dialogContent = (
    <div style={{ ...styles.overlay, animation: `${animation} 0.3s ease` }}>
      <div style={styles.dialog}>
        <div style={styles.icon}>🎉</div>
        <h2 style={styles.title}>Вітаємо!</h2>
        <p style={styles.message}>
          Ви успішно розв'язали судоку рівня <strong>{difficultyConfig.name}</strong>!
        </p>

        {timeSpent && (
          <div style={styles.timeContainer}>
            <p>Ваш час: <strong>{formatTime(timeSpent)}</strong></p>
            {isNewRecord && (
              <p style={styles.recordMessage}>
                🏆 Новий рекорд! 🏆
              </p>
            )}
          </div>
        )}

        <div style={styles.statsPreview}>
          <h4>Статистика рівня {difficultyConfig.name}:</h4>
          <p>Зіграно ігор: {stats.gamesPlayed}</p>
          <p>Перемог: {stats.gamesWon}</p>
          <p>Відсоток перемог: {stats.gamesPlayed > 0
            ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
            : 0}%</p>
          {stats.bestTime && (
            <p>⚡ Найкращий час: {formatTime(stats.bestTime)}</p>
          )}
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={() => {
              onRestart();
              onClose();
            }}
            style={styles.restartButton}
          >
            Грати знову
          </button>
          <button
            onClick={() => {
              onNewGame();
              onClose();
            }}
            style={styles.newGameButton}
          >
            Нова гра
          </button>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialogContent, portalRoot);
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)'
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    maxWidth: '450px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'slideUp 0.3s ease'
  },
  icon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  title: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#2ecc71',
    fontSize: '28px'
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#555',
    lineHeight: 1.5
  },
  timeContainer: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  recordMessage: {
    color: '#f39c12',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: 0
  },
  statsPreview: {
    backgroundColor: '#e8f5e9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
    textAlign: 'left'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  restartButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  newGameButton: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);