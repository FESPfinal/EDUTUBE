'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = (_id: number) => `/carts/${_id}`;

const useDeleteCoffeechatCart = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const deleteAxios = async (_id: number) => {
    const response = await edutubeAxios.delete(URL(_id));
    return response;
  };
  return useMutation({ mutationFn: deleteAxios });
};

export default useDeleteCoffeechatCart;
