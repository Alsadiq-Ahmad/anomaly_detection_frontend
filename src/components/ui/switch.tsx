// src/components/ui/switch.tsx

import React from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, ariaLabel }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        aria-label={ariaLabel}
      />
      <span
        className={`relative w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition duration-200 ease-linear ${
          checked ? 'bg-blue-500' : ''
        }`}
      >
        <span
          className={`absolute left-0 inline-block w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow transform transition-transform duration-200 ease-linear ${
            checked ? 'translate-x-full' : ''
          }`}
        ></span>
      </span>
    </label>
  );
};
