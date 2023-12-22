import React, { ChangeEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
  doSearch: () => void;
}

const SearchBar = ({ onSearch, doSearch }: Props) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      doSearch();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-light-main"
      />
      <button
        type="button"
        className="ml-2 px-4 py-2 bg-light-main text-white rounded-full hover:bg-dark-main focus:outline-none focus:bg-light-main"
        onClick={() => doSearch()}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
