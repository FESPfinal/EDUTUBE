'use client';
import React, { useState } from 'react';

interface Props {
  options: string[];
}

const FilterButtons: React.FC<Props> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };

  return (
    <div className="flex space-x-2">
      {options.map((option, index) => (
        <React.Fragment key={option}>
          <button
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-2 ${
              selectedOption === option ? 'text-light-main' : 'text-gray-700'
            }`}
          >
            {option}
          </button>
          {index !== options.length - 1 && <span className="text-gray-700"> | </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterButtons;
