import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean; hasLeftIcon?: boolean; hasRightIcon?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ hasLeftIcon, theme }) => hasLeftIcon && css`
    padding-left: ${theme.spacing.xl};
  `}
  
  ${({ hasRightIcon, theme }) => hasRightIcon && css`
    padding-right: ${theme.spacing.xl};
  `}
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? theme.colors.errorLight : theme.colors.primaryFocus};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position === 'left' ? 'left: 12px;' : 'right: 12px;'}
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperText = styled.p<{ hasError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.textSecondary};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <InputWrapper fullWidth={fullWidth}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <InputContainer>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasError={!!error}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            {...props}
          />
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </InputContainer>
        {(error || helperText) && (
          <HelperText hasError={!!error}>
            {error || helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;