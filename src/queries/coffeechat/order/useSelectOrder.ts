'use client';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const URL = '/orders';

const useSelectOrder = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosGet = async () => {
    const accessToken = Cookies.get('accessToken');
    const response = await edutubeAxios.get(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  return useQuery({ queryKey: ['orderList'], queryFn: axiosGet });
};

export default useSelectOrder;
