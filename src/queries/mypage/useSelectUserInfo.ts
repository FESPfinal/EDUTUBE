'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const user_id = Cookies.get('user_id');
const accessToken = Cookies.get('accessToken');

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = `/users/${user_id}`;

const useSelectUserInfo = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data.item;
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectUserInfo;
