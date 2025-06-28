import React, { createContext, useState, useContext, useEffect } from 'react';

// Theme definitions
export const lightTheme = {
  primary: '#FF69B4',
  secondary: '#8A2BE2',
  background: '#FFFFFF',
  surface: '#F8F8F8',
  text: '#333333',
  textSecondary: '#666666',
  border: '#DDDDDD',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
  disabled: '#CCCCCC',
  card: '#FFFFFF',
  accent: '#64B5F6',
};

export const darkTheme = {
  calCol: '#FFFFF',
  primary: '#FF69B4',
  secondary: '#9370DB',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#64B5F6',
  disabled: '#666666',
  card: '#2D2D2D',
  accent: '#FF69B4',
};

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem('theme');
    if (savedPreference) {
      setIsDark(savedPreference === 'dark');
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

