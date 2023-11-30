import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IOrderDataType } from '../../../helper/types/order';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/orders';

const axiosPost = async (orderData: IOrderDataType) => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.post(BASE_URL + URL, orderData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const useUpdateOrder = () => {
  return useMutation({
    mutationFn: (orderData: IOrderDataType) => axiosPost(orderData),
  });
};

export default useUpdateOrder;
