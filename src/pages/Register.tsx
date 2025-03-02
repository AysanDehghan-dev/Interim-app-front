import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FormContainer = styled.form`
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

const FooterText = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      // After successful registration, log in automatically
      login(formData.email, formData.password, 'user')
        .then(success => {
          if (success) {
            navigate('/');
          } else {
            setErrors({ general: 'Erreur lors de la connexion automatique' });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  };
  
  return (
    <Container>
      <Title>Inscription Candidat</Title>
      
      <Card>
        <FormContainer onSubmit={handleSubmit}>
          <FlexRow>
            <Input
              label="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              fullWidth
            />
            
            <Input
              label="Nom"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              fullWidth
            />
          </FlexRow>
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
          />
          
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText="6 caractères minimum"
            fullWidth
          />
          
          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            fullWidth
          />
          
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </Button>
        </FormContainer>
      </Card>
      
      <FooterText>
        Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
      </FooterText>
    </Container>
  );
};

export default Register;