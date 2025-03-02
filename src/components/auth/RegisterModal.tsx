import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  userType: 'user' | 'company';
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FlexRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const InfoMessage = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchToLogin,
  userType 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState(
    userType === 'user' 
      ? {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      : {
          companyName: '',
          industry: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }
    
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      onSwitchToLogin();
      alert("Inscription réussie ! Veuillez vous connecter.");
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userType === 'user' ? 'Inscription Candidat' : 'Inscription Entreprise'}
    >
      <InfoMessage>
        {userType === 'user' 
          ? "Créez votre compte pour accéder à toutes les offres d'emploi"
          : "Inscrivez votre entreprise pour publier des offres d'emploi"}
      </InfoMessage>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {error && (
            <ErrorAlert>
              <ErrorIcon>⚠️</ErrorIcon>
              {error}
            </ErrorAlert>
          )}
          
          {userType === 'user' ? (
            // User registration form
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
          ) : (
            // Company registration form
            <>
              <Input
                label="Nom de l'entreprise"
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                fullWidth
              />
              
              <Input
                label="Secteur d'activité"
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                fullWidth
              />
            </>
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
        </FormContainer>
      </form>
      
      <FooterText>
        Vous avez déjà un compte ?{' '}
        <LinkButton onClick={onSwitchToLogin}>
          Se connecter
        </LinkButton>
      </FooterText>
    </Modal>
  );
};

export default RegisterModal;