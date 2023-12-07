'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useUserInfo from '@/stores/userInfo';
import { useQuery } from '@tanstack/react-query';

const URL = (user_id: number) => `/users/${user_id}`;

const useSelectUserInfo = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo } = useUserInfo(store => store);

  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL(userInfo._id));
    return response.data.item;
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectUserInfo;
