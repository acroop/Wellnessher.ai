import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Loading({ size = 'large', message, fullscreen = false, className = '' }) {
  const { theme } = useTheme();

  const spinnerSize = size === 'small' ? 'h-4 w-4' : 'h-6 w-6';

  return (
    <div
      className={`
        flex flex-col items-center justify-center p-5
        ${fullscreen ? 'fixed inset-0 z-50 bg-opacity-80' : ''}
        ${fullscreen ? `bg-[${theme.background}CC]` : ''}
        ${className}
      `}
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${spinnerSize}`}
        style={{ borderColor: theme.primary, borderTopColor: 'transparent' }}
      />
      {message && (
        <p className="mt-3 text-center text-base" style={{ color: theme.text }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Loading;
