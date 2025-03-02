import React, { useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    // Disable scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return createPortal(
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer ref={modalRef}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close">
              ×
            </CloseButton>
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default Modal;