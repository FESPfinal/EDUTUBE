'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useSelectMyCoffeechat, {
  MyCoffeechat,
} from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechat';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MyCoffeechatItem from './MyCoffeechatItem';
import SearchBar from '@/components/block/searchBar/SearchBar';
import useSelectSellerItemSearch from '@/queries/mypage/myCoffeechat/useSelectSellerItemSearch';

const MypageMyCoffeechat = () => {
  const { data: myProductList, isLoading } = useSelectMyCoffeechat();
  const { mutate: searchMutate } = useSelectSellerItemSearch();

  const [coffeechatParentsList, setCoffeechatParentsList] = useState<MyCoffeechat[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCoffeechatParentsList(myProductList);
  }, [myProductList]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // 여기에서 상품 검색을 수행하거나 검색 결과를 처리할 수 있습니다.
  };

  const doSearch = () => {
    searchMutate(searchTerm, {
      onSuccess: data => {
        setCoffeechatParentsList(data);
      },
    });
  };

  return (
    <>
      <section className="fixed bottom-5 right-4">
        <div className="w-fit h-fit px-3 py-3 text-white bg-light-main rounded-3xl hover:bg-dark-main focus:outline-none shadow-md">
          <Link href={'/coffeechat/regist'}>커피챗 등록</Link>
        </div>
      </section>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end mb-2">
          <div>
            <section className="flex gap-2">
              <p>전체 커피챗 개수</p>
              <p className="text-light-main">{coffeechatParentsList?.length}</p>
            </section>
          </div>
          <section>
            <SearchBar onSearch={handleSearch} doSearch={doSearch} />
          </section>
        </div>
      </section>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {isLoading ? (
            <li>
              <Skeleton height={200} />
            </li>
          ) : (
            coffeechatParentsList?.map(item => {
              return <MyCoffeechatItem data={item} key={item._id} />;
            })
          )}
        </ul>
      </section>
    </>
  );
};

export default MypageMyCoffeechat;
