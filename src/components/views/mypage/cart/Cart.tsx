'use client';

import useSelectCart from '@/queries/mypage/cart/useSelectCart';
import CartItem from './CartItem';
import Link from 'next/link';

const Cart = () => {
  const { data: cartData } = useSelectCart();

  return (
    <>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end">
          <div>
            <section className="flex gap-2">
              <p>전체 커피챗 개수</p>
              <p className="text-light-main">{cartData?.length}</p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <p>선택 삭제</p>
            </section>
          </div>
        </div>
      </section>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {cartData?.map((item: {}) => (
            <CartItem data={item} key={item._id} />
          ))}
        </ul>
      </section>
      <section className="w-full pb-40 border-t border-gray-300">
        <div className="flex justify-between items-end mb-2 mt-2">
          <div>
            <section className="flex flex-col gap-2">
              <p>현재 보유 포인트 {} point</p>
              <p className="text-lg">
                총 결제 포인트 <span className="text-light-main">{10000} point</span>
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
