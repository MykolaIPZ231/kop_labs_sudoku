import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  Container,
  Card,
  Title,
  Input,
  Button,
  Flex,
  Grid
} from '../styles/StyledComponents';

export default function UserSelection() {
  const [username, setUsername] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const { users, createUser, loginUser } = useUser();
  const navigate = useNavigate();

  const handleCreateUser = () => {
    if (username.trim()) {
      createUser(username.trim());
    }
  };

  const handleLoginUser = () => {
    if (selectedUserId) {
      loginUser(selectedUserId);
    }
  };

  return (
    <Container>
      <Title center size="48px" mb="40px">
        Ласкаво просимо до Судоку!
      </Title>

      <Grid>
        <Card>
          <Title size="24px" mb="20px">✨ Новий гравець</Title>
          <Input
            type="text"
            placeholder="Введіть ваше ім'я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateUser()}
          />
          <Button
            primary
            style={{ marginTop: '16px', width: '100%' }}
            onClick={handleCreateUser}
          >
            Розпочати гру
          </Button>
        </Card>

        <Card>
          <Title size="24px" mb="20px">👤 Існуючі гравці</Title>
          {users.length > 0 ? (
            <>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2a2a2a',
                  color: '#fff',
                  border: '1px solid #3a3a3a',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}
              >
                <option value="">Оберіть гравця</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} (створено: {new Date(user.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
              <Button
                onClick={handleLoginUser}
                disabled={!selectedUserId}
                style={{ width: '100%' }}
              >
                Увійти
              </Button>
            </>
          ) : (
            <p style={{ color: '#888', textAlign: 'center' }}>
              Немає зареєстрованих гравців<br />
              Створіть нового гравця!
            </p>
          )}
        </Card>
      </Grid>
    </Container>
  );
}