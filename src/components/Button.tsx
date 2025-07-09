import React, { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'accent';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  type = 'button',
  className = '',
  style = {}
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primaryHover text-white';
      case 'secondary':
        return 'bg-secondary hover:bg-secondaryHover text-white';
      case 'danger':
        return 'bg-error hover:bg-errorDark text-white';
      case 'accent':
        return 'bg-accent hover:bg-accentHover text-white';
      default:
        return 'bg-primary hover:bg-primaryHover text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${getVariantClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;