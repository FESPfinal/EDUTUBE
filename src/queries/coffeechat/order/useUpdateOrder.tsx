import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';
import { OrderData } from '../../../helper/types/order';

const URL = '/orders';

const useUpdateOrder = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (orderData: OrderData) => {
    const response = await edutubeAxios.post(URL, orderData);
    return response.data;
  };
  return useMutation({
    mutationFn: (orderData: OrderData) => axiosPost(orderData),
  });
};
export default useUpdateOrder;
