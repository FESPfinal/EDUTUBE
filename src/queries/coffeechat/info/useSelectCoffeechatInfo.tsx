import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/products';

const useSelectCoffeechatInfo = (_id: string) => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosGet = async (_id: string) => {
    const response = await edutubeAxios.get(URL + `/${_id}`);
    return response.data.item;
  };

  return useQuery({ queryKey: ['coffeechatDetail'], queryFn: () => axiosGet(_id) });
};
export default useSelectCoffeechatInfo;
