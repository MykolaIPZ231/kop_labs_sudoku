import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sudoku_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sudoku_users');
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sudoku_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sudoku_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sudoku_current_user');
    }
  }, [currentUser]);

  const createUser = (username) => {
    const newUser = {
      id: Date.now().toString(),
      username,
      createdAt: new Date().toISOString(),
      stats: {
        easy: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
        medium: { gamesPlayed: 0, gamesWon: 0, bestTime: null },
        hard: { gamesPlayed: 0, gamesWon: 0, bestTime: null }
      }
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    navigate(`/user/${newUser.id}`);
    return newUser;
  };

  const loginUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      navigate(`/user/${userId}`);
      return user;
    }
    return null;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const updateUserStats = (difficulty, won, timeSpent) => {
    if (!currentUser) return;

    setUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        const updatedStats = { ...user.stats };
        const levelStats = { ...updatedStats[difficulty] };

        levelStats.gamesPlayed += 1;
        if (won) {
          levelStats.gamesWon += 1;
          if (timeSpent && (!levelStats.bestTime || timeSpent < levelStats.bestTime)) {
            levelStats.bestTime = timeSpent;
          }
        }

        updatedStats[difficulty] = levelStats;
        return { ...user, stats: updatedStats };
      }
      return user;
    }));

    setCurrentUser(prev => {
      if (!prev) return null;
      const updatedStats = { ...prev.stats };
      const levelStats = { ...updatedStats[difficulty] };

      levelStats.gamesPlayed += 1;
      if (won) {
        levelStats.gamesWon += 1;
        if (timeSpent && (!levelStats.bestTime || timeSpent < levelStats.bestTime)) {
          levelStats.bestTime = timeSpent;
        }
      }

      updatedStats[difficulty] = levelStats;
      return { ...prev, stats: updatedStats };
    });
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      createUser,
      loginUser,
      logoutUser,
      updateUserStats
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}