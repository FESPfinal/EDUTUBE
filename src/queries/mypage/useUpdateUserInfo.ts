'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useAuth from '@/stores/auth';
import useUserInfo, { UserNotTokenItem } from '@/stores/userInfo';
import { useMutation } from '@tanstack/react-query';

const URL = (user_id: number) => `/users/${user_id}`;

const useUpdateUserInfo = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo, setUserInfo } = useUserInfo(store => store);
  const { setAccessToken } = useAuth();

  //TODO: userData 타입 지정 필요
  const patchAxios = async (userData: {}) => {
    const response = await edutubeAxios.patch(URL(userInfo._id), userData);
    const item = (await response.data.updated) as UserNotTokenItem;
    setUserInfo({
      _id: userInfo._id,
      email: userInfo.email,
      name: item.name,
      phone: item.phone,
      address: item.address,
      type: userInfo.type,
      createdAt: userInfo.createdAt,
      updatedAt: item.updatedAt,
      extra: item.extra,
    });

    return item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateUserInfo;
