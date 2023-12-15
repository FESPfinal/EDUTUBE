'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = (keyword: string) => `/seller/products?keyword=${keyword}`;

const useSelectSellerItemSearch = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async (keyword: string) => {
    const response = await edutubeAxios.get(URL(keyword));
    return response.data.item;
  };
  return useMutation({ mutationFn: getAxios });
};

export default useSelectSellerItemSearch;
