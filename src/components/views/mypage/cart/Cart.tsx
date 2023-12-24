'use client';

import useSelectCart, { CartItem } from '@/queries/mypage/cart/useSelectCart';
import useUserInfo from '@/stores/userInfo';
import React, { useEffect, useState } from 'react';
import CartItemCard from './CartItem';
import useUpdateOrder from '@/queries/coffeechat/order/useUpdateOrder';
import useDeleteCoffeechatCart from '@/queries/coffeechat/cart/useDeleteCoffeechatCart';
import useUpdateUserInfo from '@/queries/mypage/useUpdateUserInfo';
import useUserCartInfo from '@/stores/cart';

type SelectedItem = {
  _id: number;
  quantity: 1;
};

export type IsSelectedItem = {
  itemInfo: SelectedItem;
  itemPrice: number;
  isChecked: boolean;
};
const Cart = () => {
  const { userInfo } = useUserInfo(store => store);
  const { decreaseUserCartCount } = useUserCartInfo(store => store);
  const { data: cartData, refetch: cartRefetch } = useSelectCart();
  const { mutate: orderMutate } = useUpdateOrder();
  const { mutate: deleteCartItemMutate } = useDeleteCoffeechatCart();
  const { mutate: updateUserInfoMutate } = useUpdateUserInfo();

  const [selectedItemList, setSelectedItemList] = useState<SelectedItem[]>([]);
  const [isAllProductChecked, setIsAllProductChecked] = useState(false);
  const [sumSelectedItemPoint, setSumSelectedItemPoint] = useState(0);
  const [isPurchased, setIsPurchased] = useState(userInfo.extra.point > 0);

  //보유보인트보다 구매포인트가 크면 결제 반려하기(+ 버튼 비활성화)
  useEffect(() => {
    const charge = userInfo.extra.point - sumSelectedItemPoint;
    if (charge >= 0) {
      setIsPurchased(true);
    } else {
      setIsPurchased(false);
    }
  }, [sumSelectedItemPoint, userInfo.extra.point]);

  //api 통신 후 모든 state reset
  const resetData = () => {
    setSelectedItemList([]);
    setSumSelectedItemPoint(0);
    cartRefetch();
  };

  /** 상품 체크박스 선택 시 구매 list로 선택/해제하기
   * - CartItem의 checkbox가 선택되면 setSelectedItemList에 추가
   * - CartItem의 checkbox가 취소되면 setSelectedItemList에 제거
   * - 선택된 item point 계산하기
   */
  const managingCartItemList = (item: IsSelectedItem) => {
    if (item.isChecked) {
      setSelectedItemList(state => [...state, item.itemInfo]);
      setSumSelectedItemPoint(state => state + item.itemPrice);
    }
    if (!item.isChecked) {
      setSelectedItemList(state => state.filter(acc => acc._id !== item.itemInfo._id));
      setSumSelectedItemPoint(state => state - item.itemPrice);
    }
  };

  //전체 선택 시 모든 상품 구매 list로 선택/해제하기
  const selectAllProduct = () => {
    if (!isAllProductChecked) {
      cartData &&
        setSelectedItemList(
          cartData?.map((data: CartItem) => ({ _id: data.product_id, quantity: 1 })),
        );
      cartData &&
        setSumSelectedItemPoint(
          cartData
            ?.map((data: CartItem) => data?.product?.price)
            .reduce((acc: number, cur: number) => acc + cur, 0),
        );
    }
    if (isAllProductChecked) {
      setSelectedItemList([]);
      setSumSelectedItemPoint(0);
    }
    setIsAllProductChecked(state => !state);
  };

  // 'POINT로 결제하기' 클릭 시 결제 진행하기
  const onPurchase = () => {
    const requestData = {
      products: selectedItemList,
      address: { name: userInfo.extra.nickname, value: '' },
    };
    if (isPurchased) {
      orderMutate(requestData, {
        onSuccess: () => {
          const productsIdList = selectedItemList.map(item => item._id);
          const cartIdList = productsIdList.map(product_id => {
            return cartData?.filter(item => item.product_id === product_id)[0]._id;
          });
          cartIdList.map(cartId => cartId && deleteCartItemMutate(cartId));
          decreaseUserCartCount(selectedItemList.length);
          updateUserInfoMutate({ extra: { point: userInfo.extra.point - sumSelectedItemPoint } });
          resetData();
        },
        onError: error => {
          //@ts-ignore
          const errorCode = error.response.status;
          //@ts-ignore
          const errMsg = error.response.data.message;

          alert(errMsg);

          if (errorCode == '422') {
            //구매 가능한 수량이 없는 물건은 cart에서 삭제
            const productItemNum = parseInt(errMsg.slice(1, 3));
            const cartItemNum = cartData?.filter(
              (item: CartItem) => item.product_id === productItemNum,
            )[0]._id;
            cartItemNum && deleteCartItemMutate(cartItemNum);
          }
          resetData();
        },
      });
    } else {
      alert('구매 가능한 포인트가 없습니다.');
    }
  };

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
            </section>
          </div>
        </div>
      </section>
      <section>
        <ul
          role="list"
          className="divide-y divide-gray-100 overflow-y-auto min-h-[calc(100vh-330px)] max-h-[calc(100vh-330px)] scrollbar-hide"
        >
          {cartData?.map((item: CartItem) => (
            <CartItemCard
              data={item}
              managingCartItemList={managingCartItemList}
              isAllProductChecked={isAllProductChecked}
              key={item._id}
            />
          ))}
        </ul>
      </section>
      <section className="w-full border-t border-gray-300">
        <div className="flex justify-between items-end mb-2 mt-2">
          <div>
            <section className="flex flex-col gap-2">
              <p>현재 보유 포인트 {userInfo.extra.point || 0} point</p>
              <p className="text-lg">
                총 결제 포인트 <span className="text-light-main">{sumSelectedItemPoint} point</span>
              </p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <button
                className="w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none disabled:bg-dark-disabled"
                onClick={onPurchase}
                disabled={!isPurchased}
              >
                POINT로 결제하기
              </button>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
