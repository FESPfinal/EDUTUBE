'use client';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

type Product = {
  _id: number;
  seller_id: number;
  state: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  reply_id: number;
  delivery: {
    company: string;
    trackingNumber: string;
    url: string;
  };
  reply: {
    rating: number;
    content: string;
    createdAt: string;
  };
};

type Order = {
  _id: number;
  user_id: number;
  products: Product[];
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
  address: {
    name: string;
    value: string;
  };
  createdAt: string;
  updatedAt: string;
};

type OrderList = Order[];

const URL = '/orders';

const useSelectOrder = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data as OrderList;
  };
  return useQuery({ queryKey: ['orderList'], queryFn: axiosGet });
};

export default useSelectOrder;
