'use client';
import CoffeechatItem from '@/components/views/coffeechat/coffeechatItem';
import SearchBar from '@/components/block/searchBar/SearchBar';
import { CoffeechatList } from '@/queries/coffeechat/useSelectCoffeechatList';
import useSelectCoffeechatSearch from '@/queries/coffeechat/useSelectCoffeechatSearch';
import banner from '/public/images/banner.png';
import Image from 'next/image';
import { useState } from 'react';


interface Props {
  initData: CoffeechatList;
}

const CoffeechatLists = ({ initData }: Props) => {
  const { mutate: searchMutate } = useSelectCoffeechatSearch();
  const [coffeechatList, setCoffeechatList] = useState<CoffeechatList>(initData);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

  const doSearch = () => {
    if (searchTerm) {
      searchMutate(searchTerm, {
        onSuccess: (data) => {
          setCoffeechatList(data);
        },
        onError: error => { alert(`검색에 실패하였습니다 ${error.message}`) }
      });
    } else {
      setCoffeechatList(initData);
    }
  };

  const sortMoreExpensivePrice = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => b.price - a.price)
      setCoffeechatList(sortedList);
    }
  }

  const sortCheaperPrice = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => a.price - b.price)
      setCoffeechatList(sortedList);
    }
  }

  const sortLatest = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateB.getTime() - dateA.getTime();
        }
        return 0;
      });
      setCoffeechatList(sortedList);
    }
  }

  const sortOldest = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateA.getTime() - dateB.getTime();
        }
        return 0;
      });
      setCoffeechatList(sortedList);
    }
  }


  return (
    <>
      <div>
        <Image className="bg-cover w-full" src={banner} alt="광고사진" />
      </div>
      <div className="h-10"></div>
      <div className="h-10" />
      <div className="md:w-[500px] sm:w-full mx-auto mt-10 mb-10">
        <SearchBar onSearch={handleSearch} doSearch={doSearch} isLong={true} />
      </div>
      <div className="flex flex-row-reverse text-sm gap-3 mb-10">
        <button className="text-gray-500" onClick={sortLatest}>최신순</button>
        <p className="text-gray-500 leading-6" >|</p>
        <button className="text-gray-500" onClick={sortOldest} >오래된 순</button>
        <p className="text-gray-500 leading-6">|</p>
        <button className="text-gray-500" onClick={sortMoreExpensivePrice}>가격 높은 순</button>
        <p className="text-gray-500 leading-6">|</p>
        <button className="text-gray-500" onClick={sortCheaperPrice}>가격 낮은 순</button>
      </div>
      {coffeechatList.length === 0 && (
        // TODO: 검색 결과 없는 이미지 추가
        <p className="mt-20 text-center text-xl text-gray-500">검색 결과가 없습니다.</p>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {coffeechatList.map((item: any) => (
          <CoffeechatItem key={item._id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default CoffeechatLists;
