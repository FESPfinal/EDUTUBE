'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const user_id = Cookies.get('user_id');
const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = `/users/${user_id}`;

const useSelectUserInfo = () => {
  const axiosGet = async () => {
    return await axios.get(BASE_URL + URL);
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectUserInfo;
