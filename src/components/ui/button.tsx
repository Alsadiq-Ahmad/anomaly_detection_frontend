// src/components/ui/button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', children, ...props }) => {
  const variantClasses =
    variant === 'ghost'
      ? 'bg-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
      : 'bg-blue-600 text-white hover:bg-blue-700';
  const sizeClasses = size === 'icon' ? 'p-2' : 'px-4 py-2';

  return (
    <button
      className={`rounded ${variantClasses} ${sizeClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      {...props}
    >
      {children}
    </button>
  );
};
