import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/products';

const axiosGet = async () => {
  const response = await axios.get(BASE_URL + URL);
  return response.data;
};

const useSelectCoffeechatList = () => {
  return useQuery({ queryKey: ['coffeechatList'], queryFn: axiosGet });
};

export default useSelectCoffeechatList;
