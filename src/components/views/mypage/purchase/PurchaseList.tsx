'use client';
import Category from '@/components/atom/Category';
import React, { useEffect, useState } from 'react';
import useSelectOrder from '../../../../queries/coffeechat/order/useSelectOrder';
import PurchaseCard from './PurchaseCard';

//임시 카테고리
const TOTAL = '전체';

const PurchaseList = () => {
  const { data: purchaseListData } = useSelectOrder();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState({
    isSelected: true,
    name: TOTAL,
  });
  const [selectedList, setSelectedList] = useState(purchaseListData);

  useEffect(() => {
    if (purchaseListData) {
      setSelectedList(purchaseListData);
      //카테고리 리스트 업데이트
      const filteredCategoryList = new Set(
        purchaseListData.map(data => data?.products[0]?.extra?.jobCategory?.[0]),
      );
      const arrCategoryList = Array.from(filteredCategoryList).filter(el => !!el);
      setCategoryList(arrCategoryList);
      // const filteredProductData = purchaseListData?.filter(()=>);
      // setChildProduct(filteredProductData);
    }
  }, [purchaseListData]);

  useEffect(() => {
    if (selectedCategory.name === TOTAL) {
      setSelectedList(purchaseListData);
    } else {
      const filteredPurchaseList = purchaseListData?.filter(
        data => data.products[0].extra.jobCategory?.[0] === selectedCategory.name,
      );
      setSelectedList(filteredPurchaseList);
    }
  }, [purchaseListData, selectedCategory]);

  return (
    <>
      <div className="m-10">
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedList?.map(item => (
            <React.Fragment key={item._id}>
              <PurchaseCard data={item} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PurchaseList;
