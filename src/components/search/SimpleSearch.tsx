import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import SearchableDropdown from '../ui/SearchableDropdown';
import Card from '../ui/Card';

// Simplified types just for this component
type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP';

interface Option {
  value: string;
  label: string;
}

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SearchTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const AdvancedSearchToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  text-align: center;
  text-decoration: underline;
  width: 100%;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SimpleSearch: React.FC = () => {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    industry: ''
  });

  // Example options - replace with your actual data
  const jobTypeOptions: Option[] = [
    { value: '', label: 'Tous les types de contrat' },
    { value: 'FULL_TIME', label: 'CDI' },
    { value: 'CONTRACT', label: 'CDD' },
    { value: 'TEMPORARY', label: 'Intérim' },
    { value: 'PART_TIME', label: 'Temps partiel' },
    { value: 'INTERNSHIP', label: 'Stage' }
  ];

  const locationOptions: Option[] = [
    { value: '', label: 'Toutes les villes' },
    { value: 'Paris', label: 'Paris' },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' }
  ];

  const industryOptions: Option[] = [
    { value: '', label: 'Tous les secteurs' },
    { value: 'Technologie', label: 'Technologie' },
    { value: 'Santé', label: 'Santé' },
    { value: 'Finance', label: 'Finance' }
  ];

  // Update filters
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navigate to jobs page with filters
  const handleSearchSubmit = () => {
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
    <SearchContainer>
      <Card elevation="sm">
        <SearchForm>
          <SearchTitle>Recherche d'emploi</SearchTitle>
          
          <SearchableDropdown
            options={[]}
            placeholder="Titre du poste, compétences ou entreprise"
            value={filters.keyword}
            onChange={(value) => handleFilterChange('keyword', value)}
            onSearch={(term) => handleFilterChange('keyword', term)}
            label="Recherche"
            fullWidth
          />
          
          {showAdvanced && (
            <>
              <SearchableDropdown
                options={locationOptions}
                placeholder="Ville ou région"
                value={filters.location}
                onChange={(value) => handleFilterChange('location', value)}
                label="Localisation"
                fullWidth
              />
              
              <SearchableDropdown
                options={jobTypeOptions}
                placeholder="Type de contrat"
                value={filters.jobType}
                onChange={(value) => handleFilterChange('jobType', value)}
                label="Type de contrat"
                fullWidth
              />
              
              <SearchableDropdown
                options={industryOptions}
                placeholder="Secteur d'activité"
                value={filters.industry}
                onChange={(value) => handleFilterChange('industry', value)}
                label="Secteur"
                fullWidth
              />
            </>
          )}
          
          <AdvancedSearchToggle 
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Masquer les options avancées" : "Options de recherche avancées"}
          </AdvancedSearchToggle>
          
          <Button 
            onClick={handleSearchSubmit}
            fullWidth
          >
            Rechercher
          </Button>
        </SearchForm>
      </Card>
    </SearchContainer>
  );
};

export default SimpleSearch;