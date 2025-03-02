import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

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
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button<{ isDark: boolean; isOpen: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ isDark }) => (isDark ? '#444' : '#fff')};
  color: ${({ isDark }) => (isDark ? '#f8f9fa' : '#333')};
  border: 1px solid ${({ isDark, isOpen }) => 
    isOpen 
      ? isDark ? '#90caf9' : '#0d6efd' 
      : isDark ? '#666' : '#ced4da'
  };
  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0 0' : '8px')};
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${({ isDark }) => (isDark ? '#90caf9' : '#0d6efd')};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ isDark }) => (isDark ? 'rgba(144, 202, 249, 0.25)' : 'rgba(13, 110, 253, 0.25)')};
  }
`;

const ArrowIcon = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div<{ isDark: boolean; isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${({ isDark }) => (isDark ? '#444' : '#fff')};
  border: 1px solid ${({ isDark }) => (isDark ? '#666' : '#ced4da')};
  border-top: none;
  border-radius: 0 0 8px 8px;
  z-index: 100;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const SearchInput = styled.input<{ isDark: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid ${({ isDark }) => (isDark ? '#666' : '#ced4da')};
  background-color: ${({ isDark }) => (isDark ? '#444' : '#fff')};
  color: ${({ isDark }) => (isDark ? '#f8f9fa' : '#333')};
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: ${({ isDark }) => (isDark ? '#90caf9' : '#0d6efd')};
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OptionItem = styled.li<{ isDark: boolean; isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background-color: ${({ isDark, isActive }) => 
    isActive 
      ? isDark ? '#2c3e50' : '#e9ecef' 
      : isDark ? '#444' : '#fff'
  };
  color: ${({ isDark }) => (isDark ? '#f8f9fa' : '#333')};
  border-left: 3px solid ${({ isDark, isActive }) => 
    isActive 
      ? isDark ? '#90caf9' : '#0d6efd' 
      : 'transparent'
  };
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ isDark }) => (isDark ? '#2c3e50' : '#e9ecef')};
  }
`;

const NoResults = styled.div<{ isDark: boolean }>`
  padding: 0.75rem;
  color: ${({ isDark }) => (isDark ? '#adb5bd' : '#6c757d')};
  text-align: center;
`;

const LoadingIndicator = styled.div<{ isDark: boolean }>`
  padding: 0.75rem;
  color: ${({ isDark }) => (isDark ? '#adb5bd' : '#6c757d')};
  text-align: center;
`;

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  placeholder,
  value,
  onChange,
  onSearch,
  isSearching = false
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Filtrer les options en fonction du terme de recherche
  useEffect(() => {
    if (onSearch) {
      // Si onSearch est fourni, c'est le parent qui gère le filtrage
      onSearch(searchTerm);
    } else {
      // Sinon, filtrage local
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, onSearch]);
  
  // Mettre à jour les options filtrées quand les options changent
  useEffect(() => {
    if (!onSearch) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [options, onSearch, searchTerm]);
  
  // Focus sur l'input de recherche quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  
  // Fermer le dropdown si on clique à l'extérieur
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
  
  // Gérer les touches du clavier pour la navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
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
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  };
  
  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  // Trouver l'option sélectionnée
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <DropdownContainer ref={containerRef}>
      <DropdownButton 
        onClick={toggleDropdown} 
        isDark={isDark} 
        isOpen={isOpen}
        type="button"
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </DropdownButton>
      
      <DropdownMenu isDark={isDark} isOpen={isOpen}>
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          isDark={isDark}
        />
        
        {isSearching ? (
          <LoadingIndicator isDark={isDark}>Chargement...</LoadingIndicator>
        ) : (
          <>
            {filteredOptions.length > 0 ? (
              <OptionsList>
                {filteredOptions.map((option, index) => (
                  <OptionItem
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    isDark={isDark}
                    isActive={index === highlightedIndex || option.value === value}
                  >
                    {option.label}
                  </OptionItem>
                ))}
              </OptionsList>
            ) : (
              <NoResults isDark={isDark}>Aucun résultat trouvé</NoResults>
            )}
          </>
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default SearchableDropdown;