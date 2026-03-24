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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
    backgroundColor: '#f8f9fa'
  },
  radio: {
    cursor: 'pointer'
  },
  diffDesc: {
    display: 'block',
    fontSize: '12px',
    color: '#666'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    cursor: 'pointer'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  error: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: 0
  },
  statsContainer: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  statsTitle: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '16px',
    color: '#2c3e50'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};