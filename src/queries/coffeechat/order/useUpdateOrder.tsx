import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IOrderDataType } from '../../../helper/types/order';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/orders';

//[TODO] authToken 값 자동으로 가져오게 코드 구현하기
const axiosPost = async (orderData: IOrderDataType) => {
  // const authToken =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzAxMjM2MTA5LCJleHAiOjE3MDEyNDMzMDksImlzcyI6IkZFU1AwMSJ9.eDqUVujFXN9UW8vEOJMmKh-Qt9v8ZOzmOR8TQ8z4e-g';
  const response = await axios.post(BASE_URL + URL, orderData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
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
