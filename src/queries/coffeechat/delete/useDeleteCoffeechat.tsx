'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = (_id: string) => `/seller/products/${_id}`;

const useDeleteCoffeechat = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const deleteAxios = async (_id: string) => {
    const response = await edutubeAxios.delete(URL(_id));
    return response;
  };
  return useMutation({ mutationFn: deleteAxios });
};

export default useDeleteCoffeechat;
