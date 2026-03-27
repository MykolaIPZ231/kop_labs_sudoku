import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { DifficultyProvider } from './contexts/DifficultyContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { NavBar, NavContainer, NavLink } from './styles/StyledComponents';
import UserSelection from './page/UserSelection';
import UserProfile from './page/UserProfile';
import GameWrapper from './page/GameWrapper';
import Res from './page/Res';
import useSudokuGame from './hooks/useSudokuGame';

function Navigation() {
  const { currentUser } = useUser();

  return (
    <NavBar>
      <NavContainer>
        <NavLink href="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Sudoku
        </NavLink>
        <div style={{ display: 'flex', gap: '16px' }}>
          <NavLink href="/">Головна</NavLink>
          {currentUser && (
            <>
              <NavLink href={`/user/${currentUser.id}`}>Профіль</NavLink>
              <NavLink href="/game">Грати</NavLink>
            </>
          )}
        </div>
      </NavContainer>
    </NavBar>
  );
}

function GameRoute() {
  const { userId } = useParams();
  const { currentUser, loginUser } = useUser();
  const { grid, initialGrid, selectedCell, selectCell, setCellValue, startNewGame } = useSudokuGame();

  React.useEffect(() => {
    if (userId && (!currentUser || currentUser.id !== userId)) {
      loginUser(userId);
    }
  }, [userId, currentUser, loginUser]);

  const handleFinishGame = () => {
    window.location.href = '/results';
  };

  const handleNewGame = () => {
    startNewGame('medium');
  };

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <GameWrapper
      board={grid}
      initialGrid={initialGrid}
      selectedCell={selectedCell}
      selectCell={selectCell}
      setCellValue={setCellValue}
      onFinish={handleFinishGame}
      onNewGame={handleNewGame}
    />
  );
}

function ResultsRoute() {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/game');
  };

  const handleStart = () => {
    navigate('/');
  };

  return (
    <Res
      onRestart={handleRestart}
      onStart={handleStart}
      username={currentUser?.username}
    />
  );
}

function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/game" element={<GameRoute />} />
        <Route path="/game/user/:userId" element={<GameRoute />} />
        <Route path="/results" element={<ResultsRoute />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <DifficultyProvider>
          <GlobalStyles />
          <AppRoutes />
        </DifficultyProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;