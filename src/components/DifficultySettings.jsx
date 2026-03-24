import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDifficulty } from '../contexts/DifficultyContext';

const schema = yup.object({
  difficulty: yup.string()
    .oneOf(['easy', 'medium', 'hard'], 'Оберіть доступний рівень складності')
    .required('Будь ласка, оберіть рівень складності'),
  rememberChoice: yup.boolean(),
  customMessage: yup.string()
    .max(50, 'Повідомлення не може перевищувати 50 символів')
    .optional()
});

export default function DifficultySettings({ onClose, onApply }) {
  const { currentDifficulty, changeDifficulty, getStatsForDifficulty, allDifficulties } = useDifficulty();
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      difficulty: currentDifficulty,
      rememberChoice: true,
      customMessage: ''
    }
  });

  const selectedDifficulty = watch('difficulty');
  const stats = getStatsForDifficulty(selectedDifficulty);

  const onSubmit = async (data) => {
    try {
      changeDifficulty(data.difficulty);

      if (data.rememberChoice) {
        localStorage.setItem('sudoku_remember_difficulty', 'true');
        localStorage.setItem('sudoku_custom_message', data.customMessage || '');
      } else {
        localStorage.removeItem('sudoku_remember_difficulty');
        localStorage.removeItem('sudoku_custom_message');
      }

      if (onApply) onApply(data);
      if (onClose) onClose();
      setIsOpen(false);
    } catch (error) {
      console.error('Помилка збереження налаштувань:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Налаштування складності</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Рівень складності:</label>
            <div style={styles.radioGroup}>
              {Object.values(allDifficulties).map((diff) => (
                <label key={diff.id} style={styles.radioLabel}>
                  <input
                    type="radio"
                    value={diff.id}
                    {...register('difficulty')}
                    style={styles.radio}
                  />
                  <div>
                    <strong>{diff.name}</strong>
                    <small style={styles.diffDesc}>
                      ({diff.cellsToRemove} пустих клітинок)
                    </small>
                  </div>
                </label>
              ))}
            </div>
            {errors.difficulty && (
              <p style={styles.error}>{errors.difficulty.message}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register('rememberChoice')}
                style={styles.checkbox}
              />
              Запам'ятати мій вибір
            </label>
          </div>

          {stats && (
            <div style={styles.statsContainer}>
              <h4 style={styles.statsTitle}>Статистика:</h4>
              <p>Зіграно ігор: {stats.gamesPlayed}</p>
              <p>Перемог: {stats.gamesWon}</p>
              <p>Відсоток перемог: {stats.gamesPlayed > 0
                ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
                : 0}%</p>
              {stats.bestTime && (
                <p>Найкращий час: {Math.floor(stats.bestTime / 60)}хв {stats.bestTime % 60}с</p>
              )}
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              style={styles.cancelButton}
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={styles.submitButton}
            >
              {isSubmitting ? 'Збереження...' : 'Застосувати'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    backgroundColor: '#1a1a1a',
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    border: '1px solid #333'
  },
  title: {
    marginTop: 0,
    marginBottom: '24px',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#cccccc',
    fontSize: '14px'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    backgroundColor: '#2a2a2a',
    border: '1px solid #3a3a3a'
  },
  radio: {
    cursor: 'pointer',
    accentColor: '#4a9eff'
  },
  radioContent: {
    flex: 1
  },
  diffName: {
    color: '#ffffff',
    fontSize: '16px'
  },
  diffDesc: {
    display: 'block',
    fontSize: '12px',
    color: '#888888',
    marginTop: '4px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#cccccc'
  },
  checkbox: {
    cursor: 'pointer',
    accentColor: '#4a9eff'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #3a3a3a',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: '#2a2a2a',
    color: '#ffffff'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: 0
  },
  statsTabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '1px solid #333',
    paddingBottom: '10px'
  },
  tabButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#888888',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  activeTab: {
    backgroundColor: '#4a9eff',
    color: '#ffffff'
  },
  statsContainer: {
    backgroundColor: '#2a2a2a',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #3a3a3a'
  },
  statsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  statsIcon: {
    fontSize: '20px'
  },
  statsTitle: {
    margin: 0,
    fontSize: '16px',
    color: '#ffffff'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '16px'
  },
  statCard: {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    border: '1px solid #3a3a3a'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4a9eff',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#888888'
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#1a1a1a',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a9eff',
    transition: 'width 0.3s ease'
  },
  allStatsContainer: {
    marginBottom: '20px'
  },
  difficultyStatsCard: {
    backgroundColor: '#2a2a2a',
    padding: '16px',
    borderRadius: '10px',
    marginBottom: '12px',
    border: '1px solid #3a3a3a'
  },
  difficultyStatsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #3a3a3a'
  },
  difficultyStatsName: {
    color: '#ffffff',
    fontSize: '16px'
  },
  difficultyStatsBadge: {
    backgroundColor: '#4a9eff',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  difficultyStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  difficultyStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '12px',
    color: '#888888'
  },
  totalStatsCard: {
    backgroundColor: '#4a9eff',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '16px',
    textAlign: 'center'
  },
  totalStatsHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '16px'
  },
  totalStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  totalStatValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffffff'
  },
  totalStatLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#3a3a3a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4a9eff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  }
};