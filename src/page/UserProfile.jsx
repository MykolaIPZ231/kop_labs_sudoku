import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  Container,
  Card,
  Title,
  Button,
  Flex,
  StatsCard,
  StatValue,
  StatLabel,
  ProgressBar,
  ProgressFill
} from '../styles/StyledComponents';

const difficulties = {
  easy: { name: 'Легкий', color: '#2ecc71' },
  medium: { name: 'Середній', color: '#f39c12' },
  hard: { name: 'Важкий', color: '#e74c3c' }
};

export default function UserProfile() {
  const { userId } = useParams();
  const { users, currentUser, logoutUser } = useUser();
  const navigate = useNavigate();

  const user = users.find(u => u.id === userId) || currentUser;

  if (!user) {
    return (
      <Container>
        <Card>
          <Title center>Користувача не знайдено</Title>
          <Button onClick={() => navigate('/')}>Повернутися на головну</Button>
        </Card>
      </Container>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  const formatTime = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalStats = () => {
    const totalGames = Object.values(user.stats).reduce((sum, s) => sum + s.gamesPlayed, 0);
    const totalWins = Object.values(user.stats).reduce((sum, s) => sum + s.gamesWon, 0);
    return { totalGames, totalWins, winRate: totalGames > 0 ? (totalWins / totalGames) * 100 : 0 };
  };

  const totalStats = getTotalStats();

  return (
    <Container>
      <Flex justify="space-between" align="center" style={{ marginBottom: '30px' }}>
        <Title size="32px">👤 Профіль: {user.username}</Title>
        {isOwnProfile && (
          <Button danger onClick={logoutUser}>Вийти</Button>
        )}
      </Flex>

      <StatsCard gradient style={{ marginBottom: '30px' }}>
        <Title size="24px" mb="20px">Загальна статистика</Title>
        <Flex justify="space-around" wrap>
          <div style={{ textAlign: 'center' }}>
            <StatValue large>{totalStats.totalGames}</StatValue>
            <StatLabel>Всього ігор</StatLabel>
          </div>
          <div style={{ textAlign: 'center' }}>
            <StatValue large>{totalStats.totalWins}</StatValue>
            <StatLabel>Перемог</StatLabel>
          </div>
          <div style={{ textAlign: 'center' }}>
            <StatValue large>{Math.round(totalStats.winRate)}%</StatValue>
            <StatLabel>Успішність</StatLabel>
          </div>
        </Flex>
        <ProgressBar>
          <ProgressFill width={totalStats.winRate} />
        </ProgressBar>
      </StatsCard>

      <Title size="24px" mb="20px">🎮 Статистика по рівнях</Title>
      {Object.entries(difficulties).map(([id, diff]) => {
        const stats = user.stats[id];
        const winRate = stats.gamesPlayed > 0 ? (stats.gamesWon / stats.gamesPlayed) * 100 : 0;

        return (
          <Card key={id} style={{ marginBottom: '16px' }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: '12px' }}>
              <Title size="20px" color={diff.color}>{diff.name}</Title>
              <div style={{ fontSize: '14px', color: '#888' }}>
                {stats.gamesPlayed} ігор зіграно
              </div>
            </Flex>

            <Flex justify="space-between" style={{ marginBottom: '12px' }}>
              <div>
                <StatValue>{stats.gamesWon}</StatValue>
                <StatLabel>Перемог</StatLabel>
              </div>
              <div>
                <StatValue>{Math.round(winRate)}%</StatValue>
                <StatLabel>Успішність</StatLabel>
              </div>
              <div>
                <StatValue>{formatTime(stats.bestTime)}</StatValue>
                <StatLabel>Найкращий час</StatLabel>
              </div>
            </Flex>

            <ProgressBar>
              <ProgressFill width={winRate} style={{ background: diff.color }} />
            </ProgressBar>
          </Card>
        );
      })}

      <Flex justify="center" style={{ marginTop: '30px' }}>
        <Button primary onClick={() => navigate('/game')}>
           Почати гру
        </Button>
      </Flex>
    </Container>
  );
}