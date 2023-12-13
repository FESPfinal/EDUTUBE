'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation, useQuery } from '@tanstack/react-query';

const URL = '/carts';

const useCreateCoffeechatCart = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const postAxios = async (_id: number) => {
    const response = await edutubeAxios.post(URL, {
      product_id: _id,
      quantity: 1,
    });
    return response.data.item;
  };
  return useMutation({ mutationFn: postAxios });
};

export default useCreateCoffeechatCart;
