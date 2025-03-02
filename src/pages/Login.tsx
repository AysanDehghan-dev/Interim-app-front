import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const LoginContainer = styled.div<{ isDark: boolean }>`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ isDark }) => (isDark ? '#444' : '#fff')};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input<{ isDark: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${({ isDark }) => (isDark ? '#666' : '#ced4da')};
  border-radius: 4px;
  background-color: ${({ isDark }) => (isDark ? '#555' : '#fff')};
  color: ${({ isDark }) => (isDark ? '#f8f9fa' : '#333')};
  
  &:focus {
    outline: none;
    border-color: ${({ isDark }) => (isDark ? '#90caf9' : '#0d6efd')};
    box-shadow: 0 0 0 2px ${({ isDark }) => (isDark ? 'rgba(144, 202, 249, 0.25)' : 'rgba(13, 110, 253, 0.25)')};
  }
`;

const SubmitButton = styled.button<{ isDark: boolean }>`
  padding: 0.75rem;
  background-color: ${({ isDark }) => (isDark ? '#90caf9' : '#0d6efd')};
  color: ${({ isDark }) => (isDark ? '#222' : '#fff')};
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isDark }) => (isDark ? '#64b5f6' : '#0b5ed7')};
  }

  &:disabled {
    background-color: ${({ isDark }) => (isDark ? '#78909c' : '#6c757d')};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)<{ isDark: boolean }>`
  color: ${({ isDark }) => (isDark ? '#90caf9' : '#0d6efd')};
  text-decoration: underline;
  
  &:hover {
    color: ${({ isDark }) => (isDark ? '#64b5f6' : '#0a58ca')};
  }
`;

const Login: React.FC = () => {
  const { login, error, loading } = useAuth();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, password } = formData;
    const success = await login(email, password, 'user');
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <LoginContainer isDark={isDark}>
      <Title>Connexion Candidat</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            isDark={isDark}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            isDark={isDark}
          />
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SubmitButton type="submit" disabled={loading} isDark={isDark}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </SubmitButton>
      </Form>
      
      <RegisterLink>
        Vous n'avez pas de compte ?{' '}
        <StyledLink to="/register" isDark={isDark}>
          S'inscrire
        </StyledLink>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;