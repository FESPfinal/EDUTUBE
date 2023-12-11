'use client';

import CheckBox from '@/components/atom/CheckBox';
import Image from 'next/image';
import Link from 'next/link';
import { IsSelectedItem } from './Cart';
import { useEffect, useState } from 'react';
import useDeleteCoffeechatCart from '@/queries/coffeechat/cart/useDeleteCoffeechatCart';
import useSelectCart from '@/queries/mypage/cart/useSelectCart';

interface Props {
  data: {};
  managingCartItemList: (item: IsSelectedItem) => void;
  isAllProductChecked: boolean;
}

const CartItem = ({ data, managingCartItemList, isAllProductChecked }: Props) => {
  const { mutate: deleteProduct } = useDeleteCoffeechatCart();
  const { refetch: cartRefetch } = useSelectCart();
  const [isChecked, setIsChecked] = useState(isAllProductChecked);

  const onChange = () => {
    managingCartItemList({
      itemInfo: { product_id: data?._id, quantity: 1 },
      isChecked: !isChecked,
    });
    setIsChecked(state => !state);
  };

  useEffect(() => {
    setIsChecked(isAllProductChecked);
  }, [isAllProductChecked]);

  const onDelete = () => {
    deleteProduct(data._id, {
      onSuccess: () => {
        cartRefetch();
      },
    });
  };

  return (
    <li className="flex py-5 w-full">
      <div>
        <CheckBox
          label=""
          onChange={() => {
            onChange();
          }}
          isChecked={isChecked}
        />
      </div>
      <Link href={`/mypage/my-coffeechat/${data?._id}`} className="flex justify-between w-full">
        <div className="flex min-w-0 gap-x-4 ">
          <Image
            className="h-28 w-40 flex-none rounded-md bg-cover"
            src={data?.product?.image}
            alt=""
            width={80}
            height={80}
            unoptimized={true}
          />
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
                Tag
              </div>
            </div>
            <p className="text-sm font-semibold leading-6 text-gray-900">{data?.product?.name}</p>
            <p className="text-sm leading-6 text-gray-900">예약 일자 및 시간 | 023.12.10 / 10:00</p>
          </div>
        </div>
      </Link>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-between">
        <p className="text-sm font-semibold leading-6 text-gray-900" onClick={onDelete}>
          삭제
        </p>
        <p className="text-sm leading-6 text-gray-900">
          <span className="font-semibold">{data?.product?.price}</span> point
        </p>
      </div>
    </li>
  );
};

export default CartItem;
