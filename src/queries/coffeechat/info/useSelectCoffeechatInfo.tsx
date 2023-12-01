import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/products';

const axiosGet = async (_id: string) => {
  const response = await axios.get(BASE_URL + URL + `/${_id}`);
  return response.data.item;
};

const useSelectCoffeechatInfo = (_id: string) => {
  return useQuery({ queryKey: ['coffeechatDetail'], queryFn: () => axiosGet(_id) });
};
export default useSelectCoffeechatInfo;
