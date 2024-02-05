'use client';
import Category from '@/components/atom/Category';
import SearchBar from '@/components/block/searchBar/SearchBar';
import CoffeechatItem from '@/components/views/coffeechat/CoffeechatItem';
import { jobCategoryConst, regionCategoryConst } from '@/helper/constants/categoryConst';
import { CoffeechatList } from '@/queries/coffeechat/useSelectCoffeechatList';
import useSelectCoffeechatSearch from '@/queries/coffeechat/useSelectCoffeechatSearch';
import useSelectInfiniteCoffeechatList from '@/queries/coffeechat/useSelectInfiniteCoffeechatList';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import banner from '/public/images/banner.png';

interface Props {
  initData: CoffeechatList;
}

const CoffeechatLists = ({ initData }: Props) => {
  const { mutate: searchMutate } = useSelectCoffeechatSearch();
  const { data: coffeechatListData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, } = useSelectInfiniteCoffeechatList();
  const [coffeechatList, setCoffeechatList] = useState<CoffeechatList>(initData);
  const [selectedJobCategory, setSelectedJobCategory] = useState<string[]>([]);
  const [selectedRegionCategory, setSelectedRegionCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreRef.current, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setCoffeechatList(initData);
    if (selectedJobCategory.length !== 0 && selectedRegionCategory.length !== 0) {
      const filteredList = initData.filter((item) => {
        return selectedJobCategory[0] == item.extra.jobCategory[0] && selectedRegionCategory == item.extra.regionCategory;
      })
      setCoffeechatList(filteredList);
    }
    else if (selectedJobCategory.length !== 0) {
      const matchedJobCategory = initData.filter((item) => {
        return selectedJobCategory[0] == item.extra.jobCategory[0];
      });
      setCoffeechatList(matchedJobCategory);
    }
    else if (selectedRegionCategory.length !== 0) {
      const matchedRegionCategory = initData.filter((item) => {
        return selectedRegionCategory == item.extra.regionCategory;
      });
      setCoffeechatList(matchedRegionCategory);
    }
  }, [selectedJobCategory, selectedRegionCategory])


  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const doSearch = () => {
    if (searchTerm) {
      searchMutate(searchTerm, {
        onSuccess: data => {
          setCoffeechatList(data);
        },
        onError: error => {
          alert(`검색에 실패하였습니다 ${error.message}`);
        },
      });
    } else {
      setCoffeechatList(initData);
    }
  };

  const sortMoreExpensivePrice = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => b.price - a.price);
      setCoffeechatList(sortedList);
    }
  };

  const sortCheaperPrice = () => {
    if (coffeechatList) {
      const sortedList = [...coffeechatList].sort((a, b) => a.price - b.price);
      setCoffeechatList(sortedList);
    }
  };

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
  };

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
  };

  return (
    <>
      <div>
        <Image className="bg-cover w-full" src={banner} alt="광고사진" />
      </div>
      <div className="md:w-[500px] sm:w-full mx-auto mt-10 mb-10">
        <SearchBar onSearch={handleSearch} doSearch={doSearch} isLong={true} />
      </div>
      <div className="flex mt-2 flex-wrap gap-2 justify-center items-center mb-4" >
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
      <div className="flex mt-2 flex-wrap gap-2 justify-center items-center mb-10">
        {regionCategoryConst.map(category => (
          <Category
            key={category}
            name={category}
            setSelectedCategory={({ name }) => {
              selectedRegionCategory == name
                ? setSelectedRegionCategory('')
                : setSelectedRegionCategory(name);
            }}
            selectedCategory={selectedRegionCategory}
          />
        ))}
      </div>
      <div className="flex flex-row-reverse text-sm gap-3 mb-10">
        <button className="text-gray-500" onClick={sortLatest}>
          최신순
        </button>
        <p className="text-gray-500 leading-6">|</p>
        <button className="text-gray-500" onClick={sortOldest}>
          오래된 순
        </button>
        <p className="text-gray-500 leading-6">|</p>
        <button className="text-gray-500" onClick={sortMoreExpensivePrice}>
          가격 높은 순
        </button>
        <p className="text-gray-500 leading-6">|</p>
        <button className="text-gray-500" onClick={sortCheaperPrice}>
          가격 낮은 순
        </button>
      </div>
      {coffeechatList.length === 0 && (
        // TODO: 검색 결과 없는 이미지 추가
        <p className="mt-20 text-center text-xl text-gray-500">검색 결과가 없습니다.</p>
      )}
      {isLoading ?
        (<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coffeechatList.map((item: any) => (
            <CoffeechatItem key={item._id} item={item} />
          ))}
        </ul>) : (
          <div><ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
            {coffeechatListData && coffeechatListData.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group?.map((item: any) => (
                  <CoffeechatItem key={item._id} item={item} />
                ))}
              </React.Fragment>
            ))}
          </ul>
            <div ref={loadMoreRef} className="flex justify-center items-center mt-10">
              {isFetchingNextPage ? (
                <div className="w-6 h-6 border-t-4 border-light-main rounded-full animate-spin-slow" />
              ) : null}
            </div>
          </div>)
      }
    </>
  );
};

export default CoffeechatLists;
