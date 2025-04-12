import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { mockCompanies } from '../mock/mockData';
import { enhancedMockJobs } from '../mock/enhancedMockData';
import { Job, JobType } from '../types';
import SearchableDropdown, { Option } from '../components/ui/SearchableDropdown';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';
import Card from '../components/ui/Card';

const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FiltersContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ResultsCount = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surfaceHighlight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// Helper function to check if a job has company data
const jobHasCompany = (job: Job): job is Job & { company: NonNullable<Job['company']> } => {
  return job.company !== undefined && job.company !== null;
};

const Jobs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // State for job modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // Get URL params
  const params = new URLSearchParams(location.search);
  
  // Filter states
  const [filters, setFilters] = useState({
    keyword: params.get('keyword') || '',
    location: params.get('location') || '',
    jobType: params.get('jobType') || '',
    industry: params.get('industry') || '',
  });
  
  // Job data state
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  // Options for dropdowns
  const jobTypeOptions: Option[] = [
    { value: '', label: 'Tous les types de contrat' },
    { value: JobType.FULL_TIME, label: 'CDI' },
    { value: JobType.CONTRACT, label: 'CDD' },
    { value: JobType.TEMPORARY, label: 'Intérim' },
    { value: JobType.PART_TIME, label: 'Temps partiel' },
    { value: JobType.INTERNSHIP, label: 'Stage' }
  ];
  
  // Generate location options from mock data
  const locationOptions: Option[] = [
    { value: '', label: 'Toutes les villes' },
    ...Array.from(new Set(enhancedMockJobs.map(job => job.location.split(',')[0].trim())))
      .map(location => ({
        value: location,
        label: location
      }))
  ];
  
  // Generate industry options from mock data
  const industryOptions: Option[] = [
    { value: '', label: 'Tous les secteurs' },
    ...Array.from(new Set(mockCompanies.map(company => company.industry)))
      .map(industry => ({
        value: industry,
        label: industry
      }))
  ];
  
  // Filter jobs when filters change
  useEffect(() => {
    let results = enhancedMockJobs;
    
    // Filter by keyword
    if (filters.keyword.trim()) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(job => {
        // Check title and description
        if (job.title.toLowerCase().includes(keyword) || 
            job.description.toLowerCase().includes(keyword) ||
            job.requirements.some(req => req.toLowerCase().includes(keyword))) {
          return true;
        }
        
        // Check company name if company exists
        if (jobHasCompany(job)) {
          return job.company.name.toLowerCase().includes(keyword);
        }
        
        return false;
      });
    }
    
    // Filter by location
    if (filters.location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by job type
    if (filters.jobType) {
      results = results.filter(job => job.type === filters.jobType as JobType);
    }
    
    // Filter by industry
    if (filters.industry) {
      results = results.filter(job => {
        if (jobHasCompany(job)) {
          return job.company.industry.toLowerCase() === filters.industry.toLowerCase();
        }
        return false;
      });
    }
    
    // Update filtered jobs
    setFilteredJobs(results);
    
    // Update URL with the new filters
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.location) params.set('location', filters.location);
    if (filters.jobType) params.set('jobType', filters.jobType);
    if (filters.industry) params.set('industry', filters.industry);
    
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [filters, location.pathname, navigate]);
  
  // Handle filter change
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle job application
  const handleApplyToJob = (jobId: string) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/jobs/${jobId}` } });
      return;
    }
    
    // If authenticated, proceed with application
    alert(`Application submitted for job: ${jobId}`);
    // Here you would normally submit to your backend API
  };
  
  // Open job detail modal
  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };
  
  return (
    <PageContainer>
      <PageTitle>Recherche d'emploi</PageTitle>
      
      <FiltersContainer padding="lg">
        <FiltersGrid>
          <SearchableDropdown
            options={[]}
            placeholder="Titre du poste, compétences ou entreprise"
            value={filters.keyword}
            onChange={(value) => handleFilterChange('keyword', value)}
            onSearch={(term) => handleFilterChange('keyword', term)}
            label="Recherche"
          />
          
          <SearchableDropdown
            options={locationOptions}
            placeholder="Ville ou région"
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
            label="Localisation"
          />
          
          <SearchableDropdown
            options={jobTypeOptions}
            placeholder="Type de contrat"
            value={filters.jobType}
            onChange={(value) => handleFilterChange('jobType', value)}
            label="Type de contrat"
          />
          
          <SearchableDropdown
            options={industryOptions}
            placeholder="Secteur d'activité"
            value={filters.industry}
            onChange={(value) => handleFilterChange('industry', value)}
            label="Secteur"
          />
        </FiltersGrid>
      </FiltersContainer>
      
      <ResultsCount>
        {filteredJobs.length} offre(s) trouvée(s)
      </ResultsCount>
      
      {filteredJobs.length > 0 ? (
        <JobsGrid>
          {filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onViewDetails={handleViewJobDetails}
            />
          ))}
        </JobsGrid>
      ) : (
        <NoResults>
          Aucune offre ne correspond à vos critères. Veuillez modifier vos filtres.
        </NoResults>
      )}
      
      {/* Job Detail Modal */}
      <JobDetailModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        job={selectedJob}
        onApply={handleApplyToJob}
      />
    </PageContainer>
  );
};

export default Jobs;