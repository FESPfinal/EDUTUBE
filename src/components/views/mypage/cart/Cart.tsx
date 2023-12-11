'use client';

import useSelectCart from '@/queries/mypage/cart/useSelectCart';
import CartItem from './CartItem';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ItemInfo = {
  product_id: number;
  quantity: 1;
};

type SelectedItem = {
  product_id: number;
  quantity: 1;
};

export type IsSelectedItem = {
  itemInfo: ItemInfo;
  itemPrice: number;
  isChecked: boolean;
};
const Cart = () => {
  const { data: cartData } = useSelectCart();
  const [selectedItemList, setSelectedItemList] = useState<SelectedItem[]>([]);
  const [isAllProductChecked, setIsAllProductChecked] = useState(false);
  const [selectedItemPointSum, setSelectedItemPointSum] = useState(0);

  /** 상품 체크박스 선택 시 구매 list로 선택/해제하기
   * - CartItem의 checkbox가 선택되면 setSelectedItemList에 추가
   * - CartItem의 checkbox가 취소되면 setSelectedItemList에 제거
   * - 선택된 item point 계산하기
   */
  const managingCartItemList = (item: IsSelectedItem) => {
    if (item.isChecked) {
      setSelectedItemList(state => [...state, item.itemInfo]);
      setSelectedItemPointSum(state => state + item.itemPrice);
    }
    if (!item.isChecked) {
      setSelectedItemList(state =>
        state.filter(acc => acc.product_id !== item.itemInfo.product_id),
      );
      setSelectedItemPointSum(state => state - item.itemPrice);
    }
  };

  //전체 선택 시 모든 상품 구매 list로 선택/해제하기
  const selectAllProduct = () => {
    console.log(!isAllProductChecked);
    if (!isAllProductChecked) {
      setSelectedItemList(cartData.map(data => ({ product_id: data._id, quantity: 1 })));
    }
    if (isAllProductChecked) {
      setSelectedItemList([]);
    }
    setIsAllProductChecked(state => !state);
  };

  /** 'POINT로 결제하기' 클릭 시 결제 진행하기
   * - 보유보인트보다 구매포인트가 크면 결제 반려하기(버튼 비활성화)
   */

  return (
    <>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end">
          <div>
            <section className="flex gap-2">
              <p>선택된 커피챗 개수</p>
              <p className="text-light-main">
                {selectedItemList.length}/{cartData?.length}
              </p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <p onClick={() => selectAllProduct()}>전체 선택</p>
              <p>|</p>
              <p>선택 삭제</p>
            </section>
          </div>
        </div>
      </section>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {cartData?.map((item: {}) => (
            <CartItem
              data={item}
              managingCartItemList={managingCartItemList}
              isAllProductChecked={isAllProductChecked}
              key={item._id}
            />
          ))}
        </ul>
      </section>
      <section className="w-full pb-40 border-t border-gray-300">
        <div className="flex justify-between items-end mb-2 mt-2">
          <div>
            <section className="flex flex-col gap-2">
              <p>현재 보유 포인트 {} point</p>
              <p className="text-lg">
                총 결제 포인트 <span className="text-light-main">{selectedItemPointSum} point</span>
              </p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <div className="w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
                <Link href={''}>POINT로 결제하기</Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
