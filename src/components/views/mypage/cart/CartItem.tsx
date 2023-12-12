'use client';

import CheckBox from '@/components/atom/CheckBox';
import Image from 'next/image';
import Link from 'next/link';
import { IsSelectedItem } from './Cart';
import { useEffect, useState } from 'react';
import useDeleteCoffeechatCart from '@/queries/coffeechat/cart/useDeleteCoffeechatCart';
import useSelectCart, { CartItem } from '@/queries/mypage/cart/useSelectCart';
import { IMAGE_ROUTE } from '@/helper/constants/commons';

interface Props {
  data: CartItem;
  managingCartItemList: (item: IsSelectedItem) => void;
  isAllProductChecked: boolean;
}

const CartItem = ({ data, managingCartItemList, isAllProductChecked }: Props) => {
  const reservedDate = new Date(data?.product?.extra?.datetime?.date);
  const reservedTime = new Date(data?.product?.extra?.datetime?.time);

  const { mutate: deleteProduct } = useDeleteCoffeechatCart();
  const { refetch: cartRefetch } = useSelectCart();
  const [isChecked, setIsChecked] = useState(isAllProductChecked);

  const onChange = () => {
    managingCartItemList({
      itemInfo: { _id: data?.product_id, quantity: 1 },
      itemPrice: data.product.price,
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
      <Link
        href={`/coffeechat/info/${data?.product?.extra?.parent}`}
        className="flex justify-between w-full"
      >
        <div className="flex min-w-0 gap-x-4 ">
          <Image
            className="h-28 w-40 flex-none rounded-md bg-cover"
            src={IMAGE_ROUTE + data?.product?.image}
            alt=""
            width={80}
            height={80}
            unoptimized={true}
          />
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              {data?.product?.extra?.jobCategory.map((item: string) => (
                <div
                  className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold leading-6 text-gray-900">{data?.product?.name}</p>
            <p className="text-sm leading-6 text-gray-900">
              예약 일자 | {reservedDate.toLocaleDateString()}
            </p>
            <p className="text-sm leading-6 text-gray-900">
              예약 시간 | {reservedTime.toLocaleTimeString()}
            </p>
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
