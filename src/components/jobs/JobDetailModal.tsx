import React from 'react';
import styled from 'styled-components';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Job } from '../../types';
import { formatSalary } from '../../utils/formatters';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onApply: (jobId: string) => void;
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CompanyLogo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const JobTitleContainer = styled.div`
  flex: 1;
`;

const JobTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const CompanyName = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const JobInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const JobTypeTag = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme }) => theme.colors.primaryFocus};
  color: ${({ theme }) => theme.colors.primary};
`;

const JobDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RequirementsList = styled.ul`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    line-height: 1.6;
  }
`;

const ApplySection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

const ApplyText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Helper function to get job type label
const getJobTypeLabel = (type: string): string => {
  switch (type) {
    case 'FULL_TIME':
      return 'CDI';
    case 'PART_TIME':
      return 'Temps partiel';
    case 'CONTRACT':
      return 'CDD';
    case 'TEMPORARY':
      return 'Intérim';
    case 'INTERNSHIP':
      return 'Stage';
    default:
      return type;
  }
};

const JobDetailModal: React.FC<JobDetailModalProps> = ({ isOpen, onClose, job, onApply }) => {
  if (!job) return null;

  const handleApply = () => {
    onApply(job.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Détails de l'offre`}
    >
      <ModalContent>
        <JobHeader>
          <CompanyLogo src={job.company.logo || 'https://placehold.co/64x64?text=Logo'} alt={job.company.name} />
          <JobTitleContainer>
            <JobTitle>{job.title}</JobTitle>
            <CompanyName>{job.company.name}</CompanyName>
          </JobTitleContainer>
        </JobHeader>

        <JobInfo>
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            {job.location}
          </InfoItem>
          
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            Publié le {job.createdAt.toLocaleDateString('fr-FR')}
          </InfoItem>
          
          <JobTypeTag>
            {getJobTypeLabel(job.type)}
          </JobTypeTag>
        </JobInfo>

        {job.salary && (
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
            </svg>
            {formatSalary(job.salary)}
          </InfoItem>
        )}

        <SectionTitle>Description</SectionTitle>
        <JobDescription>
          {job.description}
        </JobDescription>

        <SectionTitle>Compétences requises</SectionTitle>
        <RequirementsList>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </RequirementsList>

        <SectionTitle>À propos de {job.company.name}</SectionTitle>
        <JobDescription>
          {job.company.description}
        </JobDescription>

        <ApplySection>
          <ApplyText>Cette offre vous intéresse ? Postulez maintenant !</ApplyText>
          <Button onClick={handleApply}>
            Postuler à cette offre
          </Button>
        </ApplySection>
      </ModalContent>
    </Modal>
  );
};

export default JobDetailModal;