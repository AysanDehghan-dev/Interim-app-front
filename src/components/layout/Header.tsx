import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import Button from '../ui/Button';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all ${({ theme }) => theme.transitions.medium};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform ${({ theme }) => theme.transitions.medium};
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 199;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  align-self: flex-end;
  padding: ${({ theme }) => theme.spacing.xs};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileNavLink = styled(NavLink)`
  padding: ${({ theme }) => theme.spacing.md};
  display: block;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
  }
`;

const UserMenuDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 200px;
  z-index: 100;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const UserMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserMenuItem = styled.li`
  padding: 0;
`;

const UserMenuLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.errorLight};
  }
`;

const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Username = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHighlight};
  }
`;

const Header: React.FC = () => {
  const { isAuthenticated, user, company, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // State for modals
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [modalUserType, setModalUserType] = useState<'user' | 'company'>('user');
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for user menu dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        const target = event.target as Node;
        const userMenuButton = document.getElementById('user-menu-button');
        const userMenuDropdown = document.getElementById('user-menu-dropdown');
        
        if (
          userMenuButton && 
          userMenuDropdown && 
          !userMenuButton.contains(target) && 
          !userMenuDropdown.contains(target)
        ) {
          setUserMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);
  
  // Handler for modals
  const openLoginModal = (type: 'user' | 'company') => {
    setModalUserType(type);
    setLoginModalOpen(true);
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };
  
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
              <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z" />
            </svg>
            InterimApp
          </Logo>

          <NavMenu>
            <NavLink to="/jobs">Offres d'emploi</NavLink>
            <NavLink to="/companies">Entreprises</NavLink>
            
            {isAuthenticated ? (
              <UserInfo>
                {user && (
                  <UserMenu>
                    <UserMenuButton 
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      id="user-menu-button"
                    >
                      <Username>{user.firstName} {user.lastName}</Username>
                      {user.profilePicture ? (
                        <ProfilePic src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                      )}
                    </UserMenuButton>
                    
                    <UserMenuDropdown isOpen={userMenuOpen} id="user-menu-dropdown">
                      <UserMenuList>
                        <UserMenuItem>
                          <UserMenuLink to="/profile">Mon Profil</UserMenuLink>
                        </UserMenuItem>
                        <UserMenuItem>
                          <UserMenuLink to="/applications">Mes Candidatures</UserMenuLink>
                        </UserMenuItem>
                        <UserMenuItem>
                          <LogoutButton onClick={handleLogout}>
                            Déconnexion
                          </LogoutButton>
                        </UserMenuItem>
                      </UserMenuList>
                    </UserMenuDropdown>
                  </UserMenu>
                )}
                
                {company && (
                  <UserMenu>
                    <UserMenuButton 
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      id="user-menu-button"
                    >
                      <Username>{company.name}</Username>
                      {company.logo ? (
                        <ProfilePic src={company.logo} alt={company.name} />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                        </svg>
                      )}
                    </UserMenuButton>
                    
                    <UserMenuDropdown isOpen={userMenuOpen} id="user-menu-dropdown">
                      <UserMenuList>
                        <UserMenuItem>
                          <UserMenuLink to="/company-profile">Profil Entreprise</UserMenuLink>
                        </UserMenuItem>
                        <UserMenuItem>
                          <UserMenuLink to="/post-job">Publier une offre</UserMenuLink>
                        </UserMenuItem>
                        <UserMenuItem>
                          <UserMenuLink to="/manage-jobs">Gérer les offres</UserMenuLink>
                        </UserMenuItem>
                        <UserMenuItem>
                          <LogoutButton onClick={handleLogout}>
                            Déconnexion
                          </LogoutButton>
                        </UserMenuItem>
                      </UserMenuList>
                    </UserMenuDropdown>
                  </UserMenu>
                )}
              </UserInfo>
            ) : (
              <ButtonGroup>
                <Button 
                  size="sm"
                  variant="outline" 
                  onClick={() => openLoginModal('user')}
                >
                  Espace Candidat
                </Button>
                <Button 
                  size="sm"
                  onClick={() => openLoginModal('company')}
                >
                  Espace Entreprise
                </Button>
              </ButtonGroup>
            )}
            
            <ThemeToggleButton onClick={toggleTheme}>
              {themeMode === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
              )}
            </ThemeToggleButton>
          </NavMenu>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
      
      {/* Mobile Menu */}
      <Overlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </CloseButton>
        
        <MobileNavLink to="/jobs" onClick={() => setMobileMenuOpen(false)}>
          Offres d'emploi
        </MobileNavLink>
        <MobileNavLink to="/companies" onClick={() => setMobileMenuOpen(false)}>
          Entreprises
        </MobileNavLink>
        
        {isAuthenticated ? (
          <>
            {user && (
              <>
                <MobileNavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Mon Profil
                </MobileNavLink>
                <MobileNavLink to="/applications" onClick={() => setMobileMenuOpen(false)}>
                  Mes Candidatures
                </MobileNavLink>
              </>
            )}
            
            {company && (
              <>
                <MobileNavLink to="/company-profile" onClick={() => setMobileMenuOpen(false)}>
                  Profil Entreprise
                </MobileNavLink>
                <MobileNavLink to="/post-job" onClick={() => setMobileMenuOpen(false)}>
                  Publier une offre
                </MobileNavLink>
                <MobileNavLink to="/manage-jobs" onClick={() => setMobileMenuOpen(false)}>
                  Gérer les offres
                </MobileNavLink>
              </>
            )}
            
            <LogoutButton onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}>
              Déconnexion
            </LogoutButton>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <Button 
              onClick={() => {
                openLoginModal('user');
                setMobileMenuOpen(false);
              }}
            >
              Espace Candidat
            </Button>
            <Button 
              onClick={() => {
                openLoginModal('company');
                setMobileMenuOpen(false);
              }}
              variant="outline"
            >
              Espace Entreprise
            </Button>
          </div>
        )}
        
        <div style={{ marginTop: 'auto', padding: '20px 0', textAlign: 'center' }}>
          <ThemeToggleButton onClick={toggleTheme}>
            {themeMode === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
          </ThemeToggleButton>
        </div>
      </MobileMenu>
      
      {/* Authentication Modals */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onSwitchToRegister={switchToRegister}
        userType={modalUserType}
      />
      
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={switchToLogin}
        userType={modalUserType}
      />
    </>
  );
};

export default Header;