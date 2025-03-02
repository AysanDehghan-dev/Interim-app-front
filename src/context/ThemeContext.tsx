import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeMode, lightTheme, darkTheme, GlobalStyles, ThemeType } from '../styles/theme';

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Try to get theme from localStorage, fallback to system preference or light
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) return savedTheme;
    
    // Check for system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // Get the actual theme object based on mode
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};