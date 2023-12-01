'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/orders';

const axiosGet = async () => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(BASE_URL + URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
const useSelectOrder = () => {
  return useQuery({ queryKey: ['orderList'], queryFn: axiosGet });
};

export default useSelectOrder;
