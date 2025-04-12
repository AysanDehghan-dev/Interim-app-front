import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { enhancedMockJobs } from '../mock/enhancedMockData';
import { Job } from '../types';
import Button from '../components/ui/Button';
import SimpleSearch from '../components/search/SimpleSearch';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';

const HeroSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ResultsInfo = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

// Helper function to check if a job has company data
const jobHasCompany = (job: Job): job is Job & { company: NonNullable<Job['company']> } => {
  return job.company !== undefined && job.company !== null;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // State for job modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // Filter states
  const [filters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    industry: ''
  });

  // Job data states
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(enhancedMockJobs.slice(0, 6));
  const [allFilteredJobs, setAllFilteredJobs] = useState<Job[]>(enhancedMockJobs);
  
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
      results = results.filter(job => job.type === filters.jobType);
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
    setAllFilteredJobs(results);
    setFilteredJobs(results.slice(0, 6)); // Display only first 6 jobs on homepage
  }, [filters]);
  
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
    <>
      <HeroSection>
        <HeroTitle>Trouvez votre prochain emploi intérimaire</HeroTitle>
        <HeroSubtitle>
          Accédez à des milliers d'offres d'emploi dans tous les secteurs et partout en France.
        </HeroSubtitle>
      </HeroSection>
      
      <SimpleSearch />

      <SectionTitle>Offres d'emploi récentes</SectionTitle>
      
      <JobsGrid>
        {filteredJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onViewDetails={handleViewJobDetails}
          />
        ))}
      </JobsGrid>
      
      <ResultsInfo>
        {allFilteredJobs.length > 6 ? (
          <Button 
            variant="text" 
            onClick={handleSearchSubmit}
          >
            Voir les {allFilteredJobs.length} offres d'emploi disponibles
          </Button>
        ) : allFilteredJobs.length > 0 ? (
          `${allFilteredJobs.length} offre(s) trouvée(s)`
        ) : (
          "Aucune offre ne correspond à vos critères"
        )}
      </ResultsInfo>
      
      {/* Job Detail Modal */}
      <JobDetailModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        job={selectedJob}
        onApply={handleApplyToJob}
      />
    </>
  );
};

export default Home;