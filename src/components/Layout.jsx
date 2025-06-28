import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import { useTheme } from '../context/ThemeContext';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Hamburger Button */}
      <div className={sidebarOpen ? 'opacity-0 pointer-events-none' : ''}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center font-bold rounded-full shadow-lg transition duration-300 hover:rotate-90"
          style={{
            backgroundColor: theme.accent,
            color: theme.buttonText,
          }}
        >
          ☰
        </button>
      </div>

      {/* Main Content (blurred if sidebar is open) */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? 'blur-sm' : ''}`}
        style={{
          minHeight: '100vh',
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        {children}
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;
