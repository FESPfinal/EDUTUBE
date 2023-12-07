'use client';

import { UserItem } from '@/helper/types/userInfo';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useAuth from '@/stores/auth';
import useUserInfo from '@/stores/userInfo';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

type LoginData = {
  email: string;
  password: string;
};

const URL = '/users/login';

const useLogin = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const { setUserInfo } = useUserInfo(store => store);
  const { setAccessToken } = useAuth(store => store);

  const axiosPost = async (data: LoginData) => {
    const response = await edutubeAxios.post(URL, data);
    const item = await response.data.item;
    setAccessToken(await item.token.accessToken);
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
    Cookies.set('refreshToken', await item.token.refreshToken);
    Cookies.set('userType', await item.type);
    return (await item) as UserItem;
  };

  return useMutation({ mutationFn: (data: LoginData) => axiosPost(data) });
};

export default useLogin;
