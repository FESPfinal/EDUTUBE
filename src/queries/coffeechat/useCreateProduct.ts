import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';
import { Product } from './../../helper/types/order';

const URL: string = '/seller/products';

const useCreateProduct = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (requestBody: Product) => {
    const response = await edutubeAxios.post(URL, requestBody);
    return response;
  };
  return useMutation({
    mutationFn: (requestBody: Product) => axiosPost(requestBody),
  });
};

export default useCreateProduct;
