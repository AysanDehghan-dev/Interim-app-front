import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DemoInfoCard = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.infoLight};
  border-left: 4px solid ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const InfoText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FooterText = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CompanyLogin: React.FC = () => {
  const { login, isAuthenticated, company } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already authenticated as a company
  useEffect(() => {
    if (isAuthenticated && company) {
      // Redirect to the page they were trying to access or to dashboard
      const from = location.state?.from || '/company-dashboard';
      navigate(from);
    }
  }, [isAuthenticated, company, navigate, location]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const { email, password } = formData;
    
    try {
      // Try API login first
      try {
        const result = await authAPI.loginCompany(email, password);
        if (result && result.token) {
          // API login successful, redirect
          const from = location.state?.from || '/company-dashboard';
          navigate(from);
          return;
        }
      } catch (apiError) {
        console.log('API login failed, falling back to context login');
      }
      
      // Fallback to context login
      const success = await login(email, password, 'company');
      
      if (success) {
        // Context login successful, redirect
        const from = location.state?.from || '/company-dashboard';
        navigate(from);
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <Title>Espace Entreprise</Title>
      
      <LoginCard>
        <DemoInfoCard>
          <InfoText>
            <strong>Pour la démo, utilisez ces identifiants:</strong><br />
            <strong>Email:</strong> contact@techcorp.example.com<br />
            <strong>Mot de passe:</strong> password
          </InfoText>
        </DemoInfoCard>
        
        <Form onSubmit={handleSubmit}>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <Input
            label="Mot de passe"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <ButtonsContainer>
            <Button
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/login')}
              fullWidth
            >
              Espace Candidat
            </Button>
          </ButtonsContainer>
        </Form>
        
        <FooterText>
          Votre entreprise n'est pas encore inscrite ?{' '}
          <StyledLink to="/company-register">Inscrivez-vous</StyledLink>
        </FooterText>
      </LoginCard>
    </PageContainer>
  );
};

export default CompanyLogin;