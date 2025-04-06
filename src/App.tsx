import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyLogin from './pages/CompanyLogin';
import CompanyRegister from './pages/CompanyRegister';
import PrivateRoute from './components/auth/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Pages publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/company-login" element={<CompanyLogin />} />
              <Route path="/company-register" element={<CompanyRegister />} />
              
              {/* Routes protégées pour les utilisateurs */}
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute userType="user">
                    <div>Page Profil (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/applications" 
                element={
                  <PrivateRoute userType="user">
                    <div>Mes Candidatures (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              
              {/* Routes protégées pour les entreprises */}
              <Route 
                path="/company-dashboard" 
                element={
                  <PrivateRoute userType="company">
                    <div>Tableau de bord Entreprise (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/company-profile" 
                element={
                  <PrivateRoute userType="company">
                    <div>Profil Entreprise (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/post-job" 
                element={
                  <PrivateRoute userType="company">
                    <div>Publier une offre (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/manage-jobs" 
                element={
                  <PrivateRoute userType="company">
                    <div>Gérer les offres (à implémenter)</div>
                  </PrivateRoute>
                } 
              />
              
              {/* Route pour les pages non trouvées */}
              <Route path="*" element={<div>Page non trouvée</div>} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;