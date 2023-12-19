'use client';

import { useState } from 'react';

interface Props {
  name: string;
  setSelectedCategory: ({ isSelected, name }: { isSelected: boolean; name: string }) => void;
  selectedCategory: string;
  disabled?: boolean;
}

const Category = ({ name, setSelectedCategory, selectedCategory, disabled = false }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (disabled == true) {
      return;
    }
    setIsSelected(!isSelected);
    setSelectedCategory({ isSelected, name })
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-block rounded-full px-3 py-1.5 text-sm font-bold tracking-wide cursor-pointer  border-solid border 
        ${selectedCategory == name ? (disabled == true ? 'border-gray-500 bg-gray-200 text-gray-500' : 'border-light-main bg-light-main text-white') : 'border-light-main text-light-main '} 
       `}
    >
      {name}
    </span>
  );
};

export default Category;
