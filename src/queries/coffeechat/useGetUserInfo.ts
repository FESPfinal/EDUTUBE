import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useUserInfo from '@/stores/userInfo';
import { useQuery } from '@tanstack/react-query';

const URL = (user_id: number) => `/users/${user_id}/name`;

const useGetUserInfo = (_id: string) => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo } = useUserInfo(store => store);
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL(userInfo._id));
    // profile image 추가 예정
    return response.data.item.name;
  };
  return useQuery({ queryKey: ['UserInfo'], queryFn: axiosGet });
};

export default useGetUserInfo;
