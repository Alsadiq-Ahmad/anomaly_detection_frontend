// src/components/ui/select.tsx

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M5.516 7.548l4.484 4.484 4.484-4.484L15.484 9l-6 6-6-6z" />
        </svg>
      </div>
    </div>
  );
};

interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ children, ...props }) => {
  return <option {...props}>{children}</option>;
};
