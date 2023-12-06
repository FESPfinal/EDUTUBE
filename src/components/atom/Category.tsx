'use client';

import { useState } from 'react';

interface Props {
  name: string;
  setSelectedCategory: ({ isSelected, name }: { isSelected: boolean; name: string }) => void;
  selectedCategory: string;
}

const Category: React.FC<Props> = ({ name, setSelectedCategory, selectedCategory }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    setSelectedCategory({ isSelected, name })
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-block rounded-full px-3 py-1.5 text-sm font-bold tracking-wide cursor-pointer border-light-main border-solid border
        ${selectedCategory == name ? 'bg-light-main text-white' : 'text-light-main '}`}
    >
      {name}
    </span>
  );
};

export default Category;
