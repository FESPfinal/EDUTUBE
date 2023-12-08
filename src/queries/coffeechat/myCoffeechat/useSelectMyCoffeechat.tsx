'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/seller/products';

const useSelectMyCoffeechat = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data.item;
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectMyCoffeechat;
