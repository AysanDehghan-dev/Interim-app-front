import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const ButtonStyles = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  border: none;
  outline: none;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ isLoading }) => isLoading && css`
    opacity: 0.7;
    cursor: not-allowed;
  `}
  
  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.fontSizes.xs};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      case 'md':
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}
  
  /* Style variants */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: white;
          
          &:hover {
            background-color: ${theme.colors.secondaryHover};
          }
          
          &:disabled {
            background-color: ${theme.colors.textSecondary};
            cursor: not-allowed;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover {
            background-color: rgba(59, 130, 246, 0.05);
          }
          
          &:disabled {
            color: ${theme.colors.textSecondary};
            border-color: ${theme.colors.textSecondary};
            cursor: not-allowed;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          padding-left: ${theme.spacing.sm};
          padding-right: ${theme.spacing.sm};
          
          &:hover {
            background-color: rgba(59, 130, 246, 0.05);
          }
          
          &:disabled {
            color: ${theme.colors.textSecondary};
            cursor: not-allowed;
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: white;
          
          &:hover {
            background-color: ${theme.colors.primaryHover};
          }
          
          &:disabled {
            background-color: ${theme.colors.textSecondary};
            cursor: not-allowed;
          }
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  return (
    <ButtonStyles
      variant={variant}
      size={size}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </ButtonStyles>
  );
};

export default Button;