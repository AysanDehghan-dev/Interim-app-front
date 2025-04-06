import { Job, User, Company, Application } from '../types';

// Get the API URL from environment variable or default to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

// Store the JWT token in localStorage
let token: string | null = localStorage.getItem('token');

// Default headers for requests
const headers = () => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  return defaultHeaders;
};

// Set token when user logs in
export const setToken = (newToken: string) => {
  token = newToken;
  localStorage.setItem('token', newToken);
};

// Clear token when user logs out
export const clearToken = () => {
  token = null;
  localStorage.removeItem('token');
};

// Handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Une erreur est survenue');
  }
  
  return data;
};

// Authentication API calls
export const authAPI = {
  // User registration
  registerUser: async (userData: any): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/register/user`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(userData),
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  
  // Company registration
  registerCompany: async (companyData: any): Promise<{ company: Company; token: string }> => {
    const response = await fetch(`${API_URL}/auth/register/company`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(companyData),
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  
  // User login
  loginUser: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_URL}/auth/login/user`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
  
  // Company login
  loginCompany: async (email: string, password: string): Promise<{ company: Company; token: string }> => {
    const response = await fetch(`${API_URL}/auth/login/company`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },
};

// Jobs API calls
export const jobsAPI = {
  // Get all jobs with filters
  searchJobs: async (filters: any = {}): Promise<{ jobs: Job[]; pagination: any }> => {
    // Convert filters object to query string
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        queryParams.append(key, String(value));
      }
    }
    
    const response = await fetch(`${API_URL}/jobs?${queryParams.toString()}`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  getJob: async (jobId: string): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: 'GET',
      headers: headers(),
    });
    
    const data = await handleResponse(response);
    
    // If the returned job doesn't have a company property,
    // but has a companyId, try to fetch the company details
    if (data && !data.company && data.companyId) {
      try {
        const companyResponse = await fetch(`${API_URL}/companies/${data.companyId}`, {
          method: 'GET',
          headers: headers(),
        });
        
        const companyData = await handleResponse(companyResponse);
        
        // Add the company data to the job
        if (companyData) {
          data.company = companyData;
        }
      } catch (error) {
        console.warn('Could not fetch company details:', error);
      }
    }
    
    return data;
  },
  
  // Create new job (company only)
  createJob: async (jobData: any): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(jobData),
    });
    
    return handleResponse(response);
  },
  
  // Update job (company only)
  updateJob: async (jobId: string, jobData: any): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(jobData),
    });
    
    return handleResponse(response);
  },
  
  // Apply for a job (user only)
  applyForJob: async (jobId: string, applicationData: any): Promise<Application> => {
    const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(applicationData),
    });
    
    return handleResponse(response);
  },
  
  // Get applications for a job (company only)
  getJobApplications: async (jobId: string): Promise<Application[]> => {
    const response = await fetch(`${API_URL}/jobs/${jobId}/applications`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
};

// Companies API calls
export const companiesAPI = {
  // Get all companies
  getCompanies: async (): Promise<Company[]> => {
    const response = await fetch(`${API_URL}/companies`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  // Get company by ID
  getCompany: async (companyId: string): Promise<Company> => {
    const response = await fetch(`${API_URL}/companies/${companyId}`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  // Get company profile (authenticated company)
  getProfile: async (): Promise<Company> => {
    const response = await fetch(`${API_URL}/companies/profile`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  // Update company profile (authenticated company)
  updateProfile: async (profileData: any): Promise<Company> => {
    const response = await fetch(`${API_URL}/companies/profile`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(profileData),
    });
    
    return handleResponse(response);
  },
  
  // Get jobs for a company
  getCompanyJobs: async (companyId: string): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/companies/${companyId}/jobs`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
};

// Users API calls
export const usersAPI = {
  // Get user profile (authenticated user)
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  // Update user profile (authenticated user)
  updateProfile: async (profileData: any): Promise<User> => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(profileData),
    });
    
    return handleResponse(response);
  },
  
  // Get user applications (authenticated user)
  getApplications: async (): Promise<Application[]> => {
    const response = await fetch(`${API_URL}/users/applications`, {
      method: 'GET',
      headers: headers(),
    });
    
    return handleResponse(response);
  },
  
  // Add experience to user profile (authenticated user)
  addExperience: async (experienceData: any): Promise<User> => {
    const response = await fetch(`${API_URL}/users/experience`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(experienceData),
    });
    
    return handleResponse(response);
  },
  
  // Add education to user profile (authenticated user)
  addEducation: async (educationData: any): Promise<User> => {
    const response = await fetch(`${API_URL}/users/education`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(educationData),
    });
    
    return handleResponse(response);
  },
};

export default {
  auth: authAPI,
  jobs: jobsAPI,
  companies: companiesAPI,
  users: usersAPI,
};