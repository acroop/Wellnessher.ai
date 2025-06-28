
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './index.css';

// Import all pages
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import PeriodTracker from './pages/PeriodTracker';
import PCOSManagement from './pages/PCOSManagement';
import PregnancyTracker from './pages/PregnancyTracker';
import BreastCancerAwareness from './pages/BreastCancerAwareness';
import CervicalCancerAwareness from './pages/CervicalCancerAwareness'; // ✅ New import
import MedicalHistory from './pages/MedicalHistory';
import Medidocs from './pages/Medidocs';
import ConsultDoctor from './pages/ConsultDoctor';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notes from './pages/Notes';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/home" element={<Home />} />
    <Route path="/period-tracker" element={<PeriodTracker />} />
    <Route path="/pcos-management" element={<PCOSManagement />} />
    <Route path="/pregnancy-tracker" element={<PregnancyTracker />} />
    <Route path="/breast-cancer-awareness" element={<BreastCancerAwareness />} />
    <Route path="/cervical-cancer-awareness" element={<CervicalCancerAwareness />} /> {/* ✅ New route */}
    <Route path="/medical-history" element={<MedicalHistory />} />
    <Route path="/medidocs" element={<Medidocs />} />
    <Route path="/consult-doctor" element={<ConsultDoctor />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
  </Routes>
);

const App = () => (
  <ThemeProvider>
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  </ThemeProvider>
);

export default App;
