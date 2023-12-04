'use client';

import { UserItem } from '@/helper/types/userInfo';
import useUserInfo from '@/stores/userInfo';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type LoginData = {
  email: string;
  password: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/users/login';

const useLogin = () => {
  const { setUserInfo } = useUserInfo(state => state);

  const axiosPost = async (data: LoginData) => {
    const response = await axios.post(BASE_URL + URL, data);
    const item = await response.data.item;
    setUserInfo({
      _id: await item._id,
      email: await item.email,
      name: await item.name,
      phone: await item.phone,
      address: await item.address,
      type: await item.type,
      createdAt: await item.createdAt,
      updatedAt: await item.updatedAt,
      extra: await item.extra,
    });
    return (await item) as UserItem;
  };

  return useMutation({ mutationFn: (data: LoginData) => axiosPost(data) });
};

export default useLogin;
