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
    if (disabled) {
      return;
    }
    setIsSelected(!isSelected);
    setSelectedCategory({ isSelected, name });
  };

  const isSelectedCategory = selectedCategory === name;
  const baseStyle = 'inline-block rounded-full px-3 py-1.5 text-sm font-bold tracking-wide cursor-pointer border-solid border';
  const selectedStyle = isSelectedCategory ? (disabled ? 'border-gray-500 bg-gray-200 text-gray-500' : 'border-light-main bg-light-main text-white') : '';
  const defaultStyle = disabled ? 'border-gray-500 bg-white text-gray-500' : 'border-light-main text-light-main';

  return (
    <span
      onClick={handleClick}
      className={`${baseStyle} ${isSelectedCategory ? selectedStyle : defaultStyle}`}
    >
      {name}
    </span>
  );
};

export default Category;