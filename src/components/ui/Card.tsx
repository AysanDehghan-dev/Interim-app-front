import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  className?: string;
  footer?: ReactNode;
  headerAction?: ReactNode;
}

const CardContainer = styled.div<{
  elevation: 'none' | 'sm' | 'md' | 'lg';
  padding: 'none' | 'sm' | 'md' | 'lg';
  bordered: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  
  ${({ elevation, theme }) => {
    switch (elevation) {
      case 'sm':
        return css`box-shadow: ${theme.shadows.sm};`;
      case 'lg':
        return css`box-shadow: ${theme.shadows.lg};`;
      case 'md':
        return css`box-shadow: ${theme.shadows.md};`;
      case 'none':
      default:
        return css`box-shadow: none;`;
    }
  }}
  
  ${({ bordered, theme }) => bordered && css`
    border: 1px solid ${theme.colors.border};
  `}
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const CardSubtitle = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CardContent = styled.div<{ padding: 'none' | 'sm' | 'md' | 'lg' }>`
  ${({ padding, theme }) => {
    switch (padding) {
      case 'sm':
        return css`padding: ${theme.spacing.sm};`;
      case 'lg':
        return css`padding: ${theme.spacing.xl};`;
      case 'none':
        return css`padding: 0;`;
      case 'md':
      default:
        return css`padding: ${theme.spacing.lg};`;
    }
  }}
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  elevation = 'md',
  padding = 'md',
  bordered = false,
  className,
  footer,
  headerAction,
}) => {
  const hasHeader = title || subtitle || headerAction;
  
  return (
    <CardContainer
      elevation={elevation}
      padding={padding}
      bordered={bordered}
      className={className}
    >
      {hasHeader && (
        <CardHeader>
          <HeaderContent>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          </HeaderContent>
          {headerAction && headerAction}
        </CardHeader>
      )}
      
      <CardContent padding={padding}>
        {children}
      </CardContent>
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;