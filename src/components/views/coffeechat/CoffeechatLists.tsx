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
  const [coffeechatSearchList, setCoffeechatSearchList] = useState<CoffeechatList>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

  const doSearch = () => {
    if (searchTerm) {
      searchMutate(searchTerm, {
        onSuccess: (data) => {
          setCoffeechatSearchList(data);
        },
        onError: error => { alert(`검색에 실패하였습니다 ${error.message}`) }
      });
    } else {
      setCoffeechatSearchList(initData);
    }
  };

  return (
    <>
      <div className="h-60 bg-black text-white">
        <Image src={banner} alt="광고사진" />
      </div>
      <div className="h-10"></div>
      <div className="h-10" />
      <div className="md:w-[500px] sm:w-full mx-auto mt-10 mb-10">
        <SearchBar onSearch={handleSearch} doSearch={doSearch} isLong={true} />
      </div>
      {coffeechatSearchList && coffeechatSearchList.length === 0 && (
        // TODO: 검색 결과 없는 이미지 추가
        <p className="mt-20 text-center text-xl text-gray-500">검색 결과가 없습니다.</p>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {coffeechatSearchList
          ? coffeechatSearchList.map((item: any) => (
            <CoffeechatItem key={item._id} item={item} />
          ))
          : initData?.map((item) => <CoffeechatItem key={item._id} item={item} />)}
      </ul>
    </>
  );
}

export default CoffeechatLists;
