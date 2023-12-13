'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/seller/orders';

type Product = {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: string;
  price: number;
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: string;
      time: string;
    };
    author: string;
    type: string;
    jobCategory: string[];
    regionCategory: string;
    productType: string;
    depth: number;
    parent: number;
  };
};

export type Order = {
  _id: 19;
  products: Product[];
  address: {
    name: string;
    value: string;
  };
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
};

type OrderList = Order[];

const useSelectSellerOrders = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data.item as OrderList;
  };

  return useQuery({ queryKey: [], queryFn: getAxios });
};

export default useSelectSellerOrders;
