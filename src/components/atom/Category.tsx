'use client';

import { FC, useState } from 'react';

type CategoryList = {
  [key in string]: number;
};

interface CategoryProps {
  name: string;
  setSelectedCategory: ({ isSelected, name }: { isSelected: boolean; name: string }) => void;
}

const Category: FC<CategoryProps> = ({ name, setSelectedCategory }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    setSelectedCategory({ isSelected, name });
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-block rounded-full px-2 py-1 text-xs font-bold tracking-wide cursor-pointer border-light-main border-solid border
        ${isSelected ? 'bg-light-main text-white' : 'text-light-main '}`}
    >
      {name}
    </span>
  );
};

export default Category;
