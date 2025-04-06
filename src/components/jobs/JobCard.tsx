import React from 'react';
import styled from 'styled-components';
import { Job, JobType } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCardContainer = styled(Card)`
  transition: transform ${({ theme }) => theme.transitions.medium}, box-shadow ${({ theme }) => theme.transitions.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const JobCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const CompanyName = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const JobTypeTag = styled.span<{ jobType: JobType }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  ${({ jobType, theme }) => {
    switch (jobType) {
      case JobType.FULL_TIME:
        return `
          background-color: ${theme.colors.successLight};
          color: ${theme.colors.success};
        `;
      case JobType.PART_TIME:
        return `
          background-color: ${theme.colors.infoLight};
          color: ${theme.colors.info};
        `;
      case JobType.CONTRACT:
        return `
          background-color: ${theme.colors.warningLight};
          color: ${theme.colors.warning};
        `;
      case JobType.TEMPORARY:
        return `
          background-color: ${theme.colors.primaryFocus};
          color: ${theme.colors.primary};
        `;
      default:
        return `
          background-color: ${theme.colors.surfaceHighlight};
          color: ${theme.colors.textSecondary};
        `;
    }
  }}
`;

const JobDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;
`;

const BulletPoints = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const BulletPoint = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Helper function to get job type label
const getJobTypeLabel = (type: JobType): string => {
  switch (type) {
    case JobType.FULL_TIME:
      return 'CDI';
    case JobType.PART_TIME:
      return 'Temps partiel';
    case JobType.CONTRACT:
      return 'CDD';
    case JobType.TEMPORARY:
      return 'Intérim';
    case JobType.INTERNSHIP:
      return 'Stage';
    default:
      return type;
  }
};

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  // Use optional chaining and provide default values
  const companyName = job.company?.name || "Entreprise";
  const companyLogo = job.company?.logo || 'https://placehold.co/48x48?text=Logo';

  return (
    <JobCardContainer elevation="sm">
      <JobCardHeader>
        <CompanyLogo src={companyLogo} alt={companyName} />
        <div>
          <JobTitle>{job.title}</JobTitle>
          <CompanyName>{companyName}</CompanyName>
        </div>
      </JobCardHeader>
      
      <JobLocation>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
        {job.location}
      </JobLocation>
      
      <TagsContainer>
        <JobTypeTag jobType={job.type}>
          {getJobTypeLabel(job.type)}
        </JobTypeTag>
      </TagsContainer>
      
      <JobDescription>
        <BulletPoints>
          {job.type === JobType.FULL_TIME && (
            <>
              <BulletPoint>Poste à temps plein en CDI</BulletPoint>
              <BulletPoint>Expérience avec {job.title.includes('Frontend') ? 'React et TypeScript' : job.title.includes('Backend') ? 'Node.js et Express' : 'Python et Data Analysis'}</BulletPoint>
              <BulletPoint>Travail au sein d'une équipe dynamique</BulletPoint>
            </>
          )}
          {job.type === JobType.CONTRACT && (
            <>
              <BulletPoint>Contrat à durée déterminée (CDD)</BulletPoint>
              <BulletPoint>Expérience avec les technologies requises</BulletPoint>
              <BulletPoint>Projets innovants et stimulants</BulletPoint>
            </>
          )}
          {job.type === JobType.TEMPORARY && (
            <>
              <BulletPoint>Mission d'intérim de 3 à 6 mois</BulletPoint>
              <BulletPoint>Compétences en {job.title.split(' ')[0]}</BulletPoint>
              <BulletPoint>Possibilité de prolongation</BulletPoint>
            </>
          )}
          {(job.type === JobType.PART_TIME || job.type === JobType.INTERNSHIP) && (
            <>
              <BulletPoint>Travail flexible et adapté</BulletPoint>
              <BulletPoint>Formation et mentorat inclus</BulletPoint>
              <BulletPoint>Environnement de travail stimulant</BulletPoint>
            </>
          )}
        </BulletPoints>
      </JobDescription>
      
      <Button 
        variant="outline" 
        onClick={() => onViewDetails(job)}
        fullWidth
      >
        Voir l'offre
      </Button>
    </JobCardContainer>
  );
};

export default JobCard;