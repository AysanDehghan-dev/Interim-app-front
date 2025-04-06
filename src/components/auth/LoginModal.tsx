import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { authAPI } from '../../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  userType: 'user' | 'company';
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DemoInfoCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.infoLight};
  border-left: 4px solid ${({ theme }) => theme.colors.info};
`;

const InfoText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ErrorIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchToRegister,
  userType 
}) => {
  const { login, error: authError, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync with auth context state
  useEffect(() => {
    setLoading(authLoading);
    setError(authError);
  }, [authLoading, authError]);

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
    
    const { email, password } = formData;
    
    try {
      setLoading(true);
      
      // Try API login first
      if (userType === 'user') {
        const result = await authAPI.loginUser(email, password);
        if (result && result.token) {
          onClose();
          return;
        }
      } else {
        const result = await authAPI.loginCompany(email, password);
        if (result && result.token) {
          onClose();
          return;
        }
      }
      
      // Fallback to context login if API fails
      const success = await login(email, password, userType);
      if (success) {
        onClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userType === 'user' ? 'Connexion Candidat' : 'Connexion Entreprise'}
    >
      <DemoInfoCard padding="md" elevation="none">
        <InfoText>
          <strong>Pour la démo, utilisez ces identifiants:</strong><br />
          <strong>Email:</strong> {userType === 'user' ? 'jean.dupont@example.com' : 'contact@techcorp.example.com'}<br />
          <strong>Mot de passe:</strong> password
        </InfoText>
      </DemoInfoCard>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {error && (
            <ErrorAlert>
              <ErrorIcon>⚠️</ErrorIcon>
              {error}
            </ErrorAlert>
          )}
          
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
          
          <Button 
            type="submit" 
            disabled={loading} 
            fullWidth
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </FormContainer>
      </form>
      
      <FooterText>
        {userType === 'user' ? (
          <>
            Vous n'avez pas de compte ?{' '}
            <LinkButton onClick={onSwitchToRegister}>
              S'inscrire
            </LinkButton>
          </>
        ) : (
          <>
            Votre entreprise n'est pas encore inscrite ?{' '}
            <LinkButton onClick={onSwitchToRegister}>
              Inscrivez-vous
            </LinkButton>
          </>
        )}
      </FooterText>
    </Modal>
  );
};

export default LoginModal;