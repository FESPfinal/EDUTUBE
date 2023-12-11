import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';
import { IOrderDataType } from '../../../helper/types/order';

const URL = '/orders';

const useUpdateOrder = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (orderData: IOrderDataType) => {
    const response = await edutubeAxios.post(URL, orderData);
    return response.data;
  };
  return useMutation({
    mutationFn: (orderData: IOrderDataType) => axiosPost(orderData),
  });
};
export default useUpdateOrder;
