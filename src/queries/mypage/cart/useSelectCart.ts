'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/carts';

const useSelectCart = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async () => {
    const response = await edutubeAxios.get(URL);
    const item = await response.data.item;
    return item;
  };
  return useQuery({ queryKey: [URL], queryFn: getAxios });
};

export default useSelectCart;
