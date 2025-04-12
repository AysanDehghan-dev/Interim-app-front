import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SimpleSearch from '../components/search/SimpleSearch';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
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

const CompanyRegister: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
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
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Le nom de l'entreprise est requis";
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = "Le secteur d'activité est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
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
      setLoading(false);
      navigate('/company-login');
      alert("Inscription réussie ! Veuillez vous connecter.");
    }, 1500);
  };
  
  // Handle search submission - redirect to jobs page with filters
  const handleSearch = (filters: any) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.append('keyword', filters.keyword);
    if (filters.location) params.append('location', filters.location);
    if (filters.jobType) params.append('jobType', filters.jobType);
    if (filters.industry) params.append('industry', filters.industry);
    
    navigate({
      pathname: '/jobs',
      search: params.toString()
    });
  };
  
  return (
    <>
      <HeroSection>
        <Title>Inscription Entreprise</Title>
      </HeroSection>
      
      <SimpleSearch onSearch={handleSearch} />
      
      <Container>
        <Card>
          <FormContainer onSubmit={handleSubmit}>
            <Input
              label="Nom de l'entreprise"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
              fullWidth
            />
            
            <Input
              label="Secteur d'activité"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              error={errors.industry}
              fullWidth
            />
            
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
          Vous avez déjà un compte? <Link to="/company-login">Se connecter</Link>
        </FooterText>
      </Container>
    </>
  );
};

export default CompanyRegister;