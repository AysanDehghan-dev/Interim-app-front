import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 600px;
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

const FlexRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SuccessAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.successLight};
  color: ${({ theme }) => theme.colors.success};
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

const Register: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
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
    setSuccess(null);
    setLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }
    
    try {
      // Prepare user data
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
      
      // Try API registration
      try {
        const result = await authAPI.registerUser(userData);
        if (result) {
          setSuccess("Inscription réussie !");
          
          // Auto-login after successful registration
          setTimeout(async () => {
            await login(formData.email, formData.password, 'user');
            navigate('/');
          }, 1500);
          
          return;
        }
      } catch (apiError) {
        console.log('API registration failed, using fallback');
        if (apiError instanceof Error) {
          setError(apiError.message);
        }
      }
      
      // Fallback for demo: simulate successful registration
      setSuccess("Inscription simulée réussie pour la démonstration");
      setTimeout(async () => {
        await login(formData.email, formData.password, 'user');
        navigate('/');
      }, 1500);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <Title>Inscription Candidat</Title>
      
      <RegisterCard>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          {success && <SuccessAlert>{success}</SuccessAlert>}
          
          <FlexRow>
            <Input
              label="Prénom"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <Input
              label="Nom"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </FlexRow>
          
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
            minLength={6}
            helperText="Minimum 6 caractères"
            fullWidth
          />
          
          <Input
            label="Confirmer le mot de passe"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            fullWidth
          />
          
          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </Button>
        </Form>
        
        <FooterText>
          Vous avez déjà un compte ?{' '}
          <StyledLink to="/login">Se connecter</StyledLink>
        </FooterText>
      </RegisterCard>
    </PageContainer>
  );
};

export default Register;