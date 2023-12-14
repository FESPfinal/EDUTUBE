import Cookies from 'js-cookie';
import { Product } from './../../helper/types/order';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL: string = '/seller/products';

const axiosPost = async (requestBody: Product) => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.post(BASE_URL + URL, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (requestBody: Product) => axiosPost(requestBody),
  });
};

export default useCreateProduct;
