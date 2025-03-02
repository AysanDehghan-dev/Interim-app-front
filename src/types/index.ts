export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    profilePicture?: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    resume?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }
  
  export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }
  
  export interface Company {
    id: string;
    name: string;
    industry: string;
    description: string;
    logo?: string;
    website?: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    jobs: Job[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Job {
    id: string;
    title: string;
    company: Company;
    companyId: string;
    description: string;
    requirements: string[];
    location: string;
    type: JobType;
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
    startDate?: Date;
    endDate?: Date;
    applications: Application[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum JobType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    TEMPORARY = 'TEMPORARY',
    INTERNSHIP = 'INTERNSHIP',
  }
  
  export interface Application {
    id: string;
    jobId: string;
    userId: string;
    status: ApplicationStatus;
    coverLetter?: string;
    resume?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum ApplicationStatus {
    PENDING = 'PENDING',
    REVIEWING = 'REVIEWING',
    INTERVIEW = 'INTERVIEW',
    REJECTED = 'REJECTED',
    ACCEPTED = 'ACCEPTED',
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    company: Company | null;
    loading: boolean;
    error: string | null;
  }