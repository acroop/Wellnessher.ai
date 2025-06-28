import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import * as Icons from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

function InputField({
  value,
  onChange,
  placeholder = '',
  label,
  error,
  secureTextEntry = false,
  keyboardType = 'text',
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
  inputClassName = '',
  labelClassName = '',
  autoCapitalize = 'sentences',
}) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  const LeftIcon = leftIcon ? Icons[`Io${leftIcon.charAt(0).toUpperCase() + leftIcon.slice(1)}`] : null;
  const RightIcon = rightIcon ? Icons[`Io${rightIcon.charAt(0).toUpperCase() + rightIcon.slice(1)}`] : null;

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          className={`block mb-2 text-sm font-medium ${
            error ? 'text-red-500' : isFocused ? `text-[${theme.primary}]` : 'text-gray-700'
          } ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center border rounded-lg px-4 py-2 transition-all
          ${error ? 'border-red-500' : isFocused ? `border-[${theme.primary}]` : 'border-gray-300'}
          ${isFocused ? 'shadow-md' : 'shadow-none'} bg-white
        `}
      >
        {LeftIcon && (
          <LeftIcon className="mr-3 text-gray-400" size={18} />
        )}

        {multiline ? (
          <textarea
            rows={numberOfLines}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`flex-1 text-sm resize-none outline-none ${inputClassName}`}
            style={{ color: '#111' }}
          />
        ) : (
          <input
            type={secureTextEntry && !isPasswordVisible ? 'password' : keyboardType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            className={`flex-1 text-sm outline-none ${inputClassName}`}
            style={{ color: '#111' }}
          />
        )}

        {secureTextEntry ? (
          <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-gray-400">
            {isPasswordVisible ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </button>
        ) : (
          RightIcon &&
          onRightIconPress && (
            <button type="button" onClick={onRightIconPress} className="ml-2 text-gray-400">
              <RightIcon size={18} />
            </button>
          )
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
