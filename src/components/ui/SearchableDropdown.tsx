import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (searchTerm: string) => void;
  isSearching?: boolean;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const DropdownContainer = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  min-width: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
  color: ${({ theme }) => theme.colors.text};
`;

const DropdownButton = styled.button<{ isOpen: boolean; hasError?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme, isOpen, hasError }) => 
    hasError ? theme.colors.error : isOpen ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme, isOpen }) => isOpen ? 
    `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0` : 
    theme.borderRadius.md
  };
  text-align: left;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
  
  &:hover {
    border-color: ${({ theme, hasError, disabled }) => 
      disabled ? theme.colors.border : 
      hasError ? theme.colors.error : 
      theme.colors.primary
    };
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? theme.colors.errorLight : theme.colors.primaryFocus
    };
  }
`;

const ArrowIcon = styled.span<{ isOpen: boolean }>`
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  margin-left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md};
  z-index: 100;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OptionItem = styled.li<{ isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.surfaceHighlight : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
  }
`;

const CheckMark = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const NoResults = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const LoadingIndicator = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  placeholder,
  value,
  onChange,
  onSearch,
  isSearching = false,
  label,
  error,
  fullWidth = false,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Filter options based on search term
  useEffect(() => {
    if (onSearch) {
      // Let parent handle filtering
      onSearch(searchTerm);
    } else {
      // Local filtering
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, onSearch]);
  
  // Update filtered options when options change
  useEffect(() => {
    if (!onSearch) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [options, onSearch, searchTerm]);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => prev < filteredOptions.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      const selected = filteredOptions[highlightedIndex];
      onChange(selected.value);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
      if (!isOpen) {
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    }
  };
  
  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  // Find selected option
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <DropdownContainer ref={containerRef} fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <DropdownButton 
        onClick={toggleDropdown} 
        isOpen={isOpen}
        hasError={!!error}
        disabled={disabled}
        type="button"
        aria-label={placeholder}
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ArrowIcon isOpen={isOpen}>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ArrowIcon>
      </DropdownButton>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <DropdownMenu isOpen={isOpen}>
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        {isSearching ? (
          <LoadingIndicator>
            <LoadingSpinner /> Chargement...
          </LoadingIndicator>
        ) : (
          <>
            {filteredOptions.length > 0 ? (
              <OptionsList>
                {filteredOptions.map((option, index) => (
                  <OptionItem
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    isActive={index === highlightedIndex || option.value === value}
                  >
                    {option.value === value && (
                      <CheckMark>✓</CheckMark>
                    )}
                    {option.label}
                  </OptionItem>
                ))}
              </OptionsList>
            ) : (
              <NoResults>Aucun résultat trouvé</NoResults>
            )}
          </>
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default SearchableDropdown;