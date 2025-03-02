import { createGlobalStyle } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

interface ColorPalette {
  primary: string;
  primaryHover: string;
  primaryFocus: string;
  secondary: string;
  secondaryHover: string;
  background: string;
  surface: string;
  surfaceHighlight: string;
  text: string;
  textSecondary: string;
  border: string;
  borderFocus: string;
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;
}

export interface ThemeType {
  colors: ColorPalette;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    round: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    fast: string;
    medium: string;
    slow: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    bold: number;
  };
}

// Light theme
const lightColors: ColorPalette = {
  primary: '#3b82f6', // Modernized blue
  primaryHover: '#2563eb',
  primaryFocus: 'rgba(59, 130, 246, 0.25)',
  secondary: '#f97316', // Orange accent
  secondaryHover: '#ea580c',
  background: '#ffffff',
  surface: '#f8fafc',
  surfaceHighlight: '#f1f5f9',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  borderFocus: '#94a3b8',
  error: '#ef4444',
  errorLight: '#fee2e2',
  success: '#22c55e',
  successLight: '#dcfce7',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  info: '#0ea5e9',
  infoLight: '#e0f2fe',
};

// Dark theme
const darkColors: ColorPalette = {
  primary: '#60a5fa', // Lighter blue for dark mode
  primaryHover: '#93c5fd',
  primaryFocus: 'rgba(96, 165, 250, 0.25)',
  secondary: '#fb923c', // Lighter orange for dark mode
  secondaryHover: '#fdba74',
  background: '#0f172a',
  surface: '#1e293b',
  surfaceHighlight: '#334155',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  border: '#334155',
  borderFocus: '#64748b',
  error: '#f87171',
  errorLight: '#450a0a',
  success: '#4ade80',
  successLight: '#14532d',
  warning: '#fbbf24',
  warningLight: '#451a03',
  info: '#38bdf8',
  infoLight: '#0c4a6e',
};

const commonTheme = {
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    round: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '0.15s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

export const lightTheme: ThemeType = {
  colors: lightColors,
  ...commonTheme,
};

export const darkTheme: ThemeType = {
  colors: darkColors,
  ...commonTheme,
};

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color ${({ theme }) => theme.transitions.medium}, color ${({ theme }) => theme.transitions.medium};
    line-height: 1.5;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;