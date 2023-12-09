'use client';
import Category from '@/components/atom/Category';
import useSelectOrder from '../../../../queries/coffeechat/order/useSelectOrder';
import React, { useEffect, useState } from 'react';
import PurchaseCard from './PurchaseCard';

//임시 카테고리
const categoryList = ['프론트엔드', '벡엔드'];

const PurchaseList = () => {
  const { data: purchaseListData } = useSelectOrder();
  // filtered child product
  const [childProduct, setChildProduct] = useState();
  // 선택한 카테고리 정보
  const [selectedCategory, setSelectedCategory] = useState({
    isSelected: true,
    name: categoryList[0],
  });
  // 카테고리 정보에 따른 상품 filtered data
  const [selectedList, setSelectedList] = useState();

  // useEffect(() => {
  //   if (purchaseListData) {
  //     const filteredProductData = purchaseListData?.filter(()=>);
  //     setChildProduct(filteredProductData);
  //   }
  // }, [purchaseListData]);

  return (
    <>
      <div className="m-10">
        <p className="text-xl font-bold mb-4">커피챗 구매 목록 리스트</p>
        <section className="flex gap-1">
          {categoryList.map(name => (
            <Category
              name={name}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory.name}
              key={name}
            />
          ))}
        </section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchaseListData?.map(item => (
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
