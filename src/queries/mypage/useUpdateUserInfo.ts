'use client';

import { UserItem } from '@/helper/types/userInfo';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useAuth from '@/stores/auth';
import useUserInfo, { UserNotTokenItem } from '@/stores/userInfo';
import { useMutation } from '@tanstack/react-query';

const URL = (user_id: number) => `/users/${user_id}`;

const useUpdateUserInfo = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo, setUserInfo } = useUserInfo(store => store);
  const { setAccessToken } = useAuth();

  const patchAxios = async (userData: {}) => {
    const response = await edutubeAxios.patch(URL(userInfo._id), userData);
    const item = (await response.data.item) as UserItem;

    setAccessToken(item.token.accessToken);
    setUserInfo({
      _id: item._id,
      email: item.email,
      name: item.name,
      phone: item.phone,
      address: item.address,
      type: item.type,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      extra: item.extra,
    });

    return item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateUserInfo;
