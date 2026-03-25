import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease;
`;

export const Card = styled.div`
  background: ${props => props.gradient ? 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' : '#1a1a1a'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.size || '36px'};
  color: ${props => props.color || '#ffffff'};
  text-align: ${props => props.center ? 'center' : 'left'};
  margin-bottom: ${props => props.mb || '20px'};
  background: linear-gradient(135deg, #4a9eff, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Button = styled.button`
  padding: ${props => props.small ? '8px 16px' : '12px 24px'};
  font-size: ${props => props.small ? '14px' : '16px'};
  font-weight: bold;
  background: ${props => {
    if (props.primary) return 'linear-gradient(135deg, #4a9eff, #2ecc71)';
    if (props.danger) return 'linear-gradient(135deg, #e74c3c, #c0392b)';
    if (props.warning) return 'linear-gradient(135deg, #f39c12, #e67e22)';
    return 'linear-gradient(135deg, #2c3e50, #34495e)';
  }};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #2a2a2a;
  border: 1px solid ${props => props.error ? '#e74c3c' : '#3a3a3a'};
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a9eff;
    box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
  }

  &::placeholder {
    color: #666;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '10px'};
  flex-wrap: wrap;
`;

export const NavBar = styled.nav`
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px 32px;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const NavLink = styled.a`
  color: ${props => props.active ? '#4a9eff' : '#ffffff'};
  text-decoration: none;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #4a9eff;
    background: rgba(74, 158, 255, 0.1);
  }
`;

export const SudokuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  background-color: #0a0a0a;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
`;

export const NumberPadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 300px;
  margin: 0 auto;
`;

export const NumberButton = styled.button`
  padding: 15px 0;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: #4a9eff;
  border: 1px solid #4a9eff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #4a9eff, #2ecc71);
    color: white;
    transform: translateY(-2px);
  }
`;

export const StatsCard = styled(Card)`
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
`;

export const StatValue = styled.div`
  font-size: ${props => props.large ? '32px' : '24px'};
  font-weight: bold;
  color: #4a9eff;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #888;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4a9eff, #2ecc71);
  width: ${props => props.width || 0}%;
  transition: width 0.3s ease;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

export const ModalContent = styled(Card)`
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;