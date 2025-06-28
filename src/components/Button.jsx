import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Button = ({
  title,
  onClick,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  // Style mappings
  const buttonStyles = {
    primary: {
      backgroundColor: disabled ? theme.disabled : theme.primary,
      color: 'white',
      border: 'none',
    },
    secondary: {
      backgroundColor: disabled ? theme.disabled : theme.secondary,
      color: 'white',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: disabled ? theme.disabled : theme.primary,
      border: `2px solid ${disabled ? theme.disabled : theme.primary}`,
    },
    text: {
      backgroundColor: 'transparent',
      color: disabled ? theme.disabled : theme.primary,
      border: 'none',
    },
  };

  const sizeStyles = {
    small: {
      padding: '6px 12px',
      fontSize: '14px',
      borderRadius: '16px',
    },
    medium: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '20px',
    },
    large: {
      padding: '14px 28px',
      fontSize: '18px',
      borderRadius: '24px',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...buttonStyles[type],
        ...sizeStyles[size],
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 600,
        letterSpacing: '0.3px',
        ...style,
      }}
    >
      {loading ? (
        <span style={{ color: buttonStyles[type].color }}>Loading...</span>
      ) : (
        <span style={{ ...textStyle }}>{title}</span>
      )}
    </button>
  );
};

export default Button;
