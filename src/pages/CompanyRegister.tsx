import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { Job } from '../types';
import Button from '../components/ui/Button';
import SimpleSearch from '../components/search/SimpleSearch';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';
import { jobsAPI } from '../services/api';

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

const LoadingIndicator = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // State for loading
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for job modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // Filter states
  const [filters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    industry: '',
    limit: 6,  // Display only 6 jobs on homepage
    page: 1
  });

  // Job data states
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  
  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Call the API to get jobs
        const response = await jobsAPI.searchJobs(filters);
        
        if (response && response.jobs) {
          setFeaturedJobs(response.jobs);
          setTotalJobs(response.pagination.total);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Impossible de charger les offres d\'emploi. Affichage des données de démonstration.');
        
        // Fallback to mock data if API fails
        const { enhancedMockJobs } = await import('../mock/enhancedMockData');
        setFeaturedJobs(enhancedMockJobs.slice(0, 6));
        setTotalJobs(enhancedMockJobs.length);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [filters]);
  
  // Navigate to jobs page with filters
  const handleSearchSubmit = () => {
    navigate('/jobs');
  };
  
  // Handle job application
  const handleApplyToJob = async (jobId: string) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/jobs/${jobId}` } });
      return;
    }
    
    try {
      // Apply for job using API
      await jobsAPI.applyForJob(jobId, {
        coverLetter: 'Je suis intéressé par cette offre d\'emploi.'
      });
      
      alert('Votre candidature a été soumise avec succès !');
      setIsJobModalOpen(false);
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Impossible de soumettre votre candidature. Veuillez réessayer.');
    }
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
      
      {loading ? (
        <LoadingIndicator>Chargement des offres...</LoadingIndicator>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      ) : (
        <>
          <JobsGrid>
            {featuredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onViewDetails={handleViewJobDetails}
              />
            ))}
          </JobsGrid>
          
          <ResultsInfo>
            {totalJobs > 6 ? (
              <Button 
                variant="text" 
                onClick={handleSearchSubmit}
              >
                Voir les {totalJobs} offres d'emploi disponibles
              </Button>
            ) : totalJobs > 0 ? (
              `${totalJobs} offre(s) trouvée(s)`
            ) : (
              "Aucune offre disponible pour le moment"
            )}
          </ResultsInfo>
        </>
      )}
      
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