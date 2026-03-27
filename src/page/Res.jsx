import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  Container, Card,
  Title, Button,
  Flex, StatValue
} from '../styles/StyledComponents';

export default function Res({onRestart, onStart, username}) {
    const { currentUser } = useUser();
      const navigate = useNavigate();
      const displayName = username || currentUser?.username || 'Гравець';

    return(
            <Container>
              <Card style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}></div>
                <Title size="32px" center mb="20px">
                  Вітаємо, {displayName}!
                </Title>
                <p style={{ fontSize: '18px', color: '#2ecc71', marginBottom: '30px' }}>
                  Ви успішно розв'язали судоку!
                </p>

                <Flex justify="center" gap="20px" wrap>
                  <Button primary onClick={onRestart}>
                    Грати знову
                  </Button>
                  <Button onClick={() => navigate(`/user/${currentUser?.id}`)}>
                    Мій профіль
                  </Button>
                  <Button warning onClick={onStart}>
                    На головну
                  </Button>
                </Flex>
              </Card>
            </Container>
    );
}