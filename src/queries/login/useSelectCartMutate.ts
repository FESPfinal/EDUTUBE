'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = '/carts';

export type CartItem = {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    _id: number;
    name: string;
    price: number;
    seller_id: number;
    quantity: number;
    buyQuantity: number;
    image: string;
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
};

export type CartList = CartItem[];

const useSelectCartMutate = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async () => {
    const response = await edutubeAxios.get(URL);
    const item = await response.data.item;
    return item as CartList;
  };
  return useMutation({ mutationFn: getAxios });
};

export default useSelectCartMutate;
