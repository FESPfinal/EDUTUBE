import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import useUserInfo from '@/stores/userInfo';
import { useQuery } from '@tanstack/react-query';

const URL = (property: string, user_id: number) => `/users/${user_id}/extra/${property}`;

const useSelectMemberInfo = (property: string) => {
  const { edutubeAxios } = useEdutubeAxios();
  const { userInfo } = useUserInfo(store => store);
  const axiosGet = async (property: string) => {
    const response = await edutubeAxios.get(URL(property, userInfo._id));
    return response.data.item.extra;
  };
  return useQuery({ queryKey: ['MemberInfoExtra'], queryFn: () => axiosGet(property) });
};

export default useSelectMemberInfo;
