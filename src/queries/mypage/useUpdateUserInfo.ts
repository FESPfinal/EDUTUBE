'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useUserInfo, { UserNotTokenItem } from '@/stores/userInfo';
import { useMutation } from '@tanstack/react-query';

const URL = (user_id: number) => `/users/${user_id}`;

const useUpdateUserInfo = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo, setUserInfo } = useUserInfo(store => store);

  //TODO: userData 타입 지정 필요
  const patchAxios = async (userData: {}) => {
    const response = await edutubeAxios.patch(URL(userInfo._id), userData);
    const item = (await response.data.updated) as UserNotTokenItem;
    setUserInfo({
      _id: userInfo._id,
      email: userInfo.email,
      name: item.name ? item.name : userInfo.name,
      phone: item.phone ? item.phone : userInfo.phone,
      address: item.address ? item.address : userInfo.address,
      type: userInfo.type,
      createdAt: userInfo.createdAt,
      updatedAt: item.updatedAt,
      extra: item.extra ? item.extra : userInfo.extra,
    });

    return item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateUserInfo;
