'use client';

import Category from '@/components/atom/Category';
import SearchBar from '@/components/block/searchBar/SearchBar';
import { jobCategoryConst } from '@/helper/constants/categoryConst';
import { useState } from 'react';

const VideoSearch = () => {
  const [selectedJobCategory, setSelectedJobCategory] = useState<string[]>([]);

  const handleSearch = () => {};
  const doSearch = () => {};

  return (
    <>
      <div className="md:w-[500px] sm:w-full mx-auto mt-10 mb-10">
        <SearchBar onSearch={handleSearch} doSearch={doSearch} isLong={true} />
      </div>
      <div className="flex mt-2 flex-wrap gap-2 justify-center items-center mb-4">
        {jobCategoryConst.map(category => (
          <Category
            key={category}
            name={category}
            setSelectedCategory={({ name }) => {
              selectedJobCategory[0] == name
                ? setSelectedJobCategory([])
                : setSelectedJobCategory([name]);
            }}
            selectedCategory={selectedJobCategory[0]}
          />
        ))}
      </div>
    </>
  );
};

export default VideoSearch;
