'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  options: string[];
  setPropsOption: Dispatch<SetStateAction<string>>;
}

const FilterButtons: React.FC<Props> = ({ options, setPropsOption }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setPropsOption(option);
  };

  return (
    <div className="flex space-x-2">
      {options.map((option, index) => (
        <React.Fragment key={option}>
          <button
            onClick={() => handleOptionClick(option)}
            className={`py-2 text-sm ${
              selectedOption === option ? 'text-light-main' : 'text-gray-700'
            }`}
          >
            {option}
          </button>
          {index !== options.length - 1 && <span className="text-gray-700 leading-8"> | </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterButtons;
