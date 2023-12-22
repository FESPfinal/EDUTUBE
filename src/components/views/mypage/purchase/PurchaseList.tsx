'use client';
import Category from '@/components/atom/Category';
import React, { useEffect, useState } from 'react';
import useSelectOrder, { Product } from '../../../../queries/coffeechat/order/useSelectOrder';
import PurchaseCard from './PurchaseCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

//임시 카테고리
const TOTAL = '전체';

export type ShowPurchaseList = {
  _id: number;
  parent: string;
  image: string;
  name: string;
  place: string;
  jobCategory: string[];
  intro: string;
  author: string;
  datetime: { date: string; time: string };
  offline: string;
  online: string;
};

const PurchaseList = () => {
  const { data: purchaseListData, isLoading } = useSelectOrder();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState({
    isSelected: true,
    name: TOTAL,
  });
  const [selectedList, setSelectedList] = useState(purchaseListData);
  const [showPurchaseList, setShowPurchaseList] = useState<ShowPurchaseList[]>();

  useEffect(() => {
    if (purchaseListData) {
      setSelectedList(purchaseListData);
      //카테고리 리스트 업데이트
      const filteredCategoryList = new Set(
        purchaseListData.map(data => data?.products[0]?.extra?.jobCategory?.[0]),
      );
      const arrCategoryList = Array.from(filteredCategoryList).filter(el => !!el);
      setCategoryList(arrCategoryList);
    }
  }, [purchaseListData]);

  useEffect(() => {
    if (selectedCategory.name === TOTAL) {
      setSelectedList(purchaseListData);
    } else {
      const filteredPurchaseList = purchaseListData?.filter(
        data => data.products[0]?.extra?.jobCategory?.[0] === selectedCategory.name,
      );
      setSelectedList(filteredPurchaseList);
    }
  }, [purchaseListData, selectedCategory]);

  useEffect(() => {
    const formattingData = (item: Product) => ({
      _id: item._id,
      parent: item.extra?.parent,
      image: item.image,
      name: item.name,
      place: item.extra?.place,
      jobCategory: item.extra?.jobCategory,
      intro: item.extra?.intro,
      author: item.extra?.author,
      datetime: item.extra?.datetime,
      offline: item.extra?.offline,
      online: item.extra?.online,
    });

    let showDataList = new Array();
    selectedList?.forEach(list =>
      list.products?.forEach(item => showDataList.push(formattingData(item))),
    );
    setShowPurchaseList(showDataList);
  }, [selectedList]);

  return (
    <>
      <div className="m-10 mb-0 w-full">
        <p className="text-xl font-bold mb-4">커피챗 구매 목록 리스트</p>
        <section className="flex gap-1 border-b pb-2 mb-2">
          <Category
            name={TOTAL}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory.name}
            key={TOTAL}
          />
          {categoryList?.map(name => (
            <Category
              name={name}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory.name}
              key={name}
            />
          ))}
        </section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-220px)]">
          {isLoading ? (
            <li>
              <Skeleton height={300} />
            </li>
          ) : (
            showPurchaseList?.map(item => (
              <React.Fragment key={item._id}>
                <PurchaseCard data={item} />
              </React.Fragment>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default PurchaseList;
