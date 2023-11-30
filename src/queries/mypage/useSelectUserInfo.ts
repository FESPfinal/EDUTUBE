'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = (user_id: string) => `/users/${user_id}`;

const useSelectUserInfo = () => {
  const axiosGet = async () => {
    const user_id = Cookies.get('user_id');
    if (!!user_id) {
      return await axios.get(BASE_URL + URL(user_id));
    }
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectUserInfo;
