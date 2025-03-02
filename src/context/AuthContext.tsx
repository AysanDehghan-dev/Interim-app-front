import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Company, AuthState } from '../types';
import { mockLogin } from '../mock/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, type: 'user' | 'company') => Promise<boolean>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  company: null,
  loading: false,
  error: null
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => false,
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Récupérer les données d'authentification sauvegardées dans localStorage
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        return {
          ...parsedAuth,
          isAuthenticated: true
        };
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'authentification:', error);
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    // Sauvegarder les données d'authentification dans localStorage
    if (authState.isAuthenticated) {
      localStorage.setItem('auth', JSON.stringify({
        user: authState.user,
        company: authState.company,
        loading: authState.loading,
        error: authState.error
      }));
    } else {
      localStorage.removeItem('auth');
    }
  }, [authState]);

  const login = async (email: string, password: string, type: 'user' | 'company'): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await mockLogin(email, password, type);
      
      if (result.success && result.data) {
        if (type === 'user') {
          setAuthState({
            isAuthenticated: true,
            user: result.data as User,
            company: null,
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            isAuthenticated: true,
            user: null,
            company: result.data as Company,
            loading: false,
            error: null
          });
        }
        return true;
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          company: null,
          loading: false,
          error: result.error || 'Erreur lors de la connexion'
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        company: null,
        loading: false,
        error: 'Erreur de serveur. Veuillez réessayer plus tard.'
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};