import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_ENDPOINT = 'https://localhost/api/products';

const 커피챗리스트반환 = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data;
};

const useSelectCoffeechatList = () => {
  const {
    data: 커피챗리스트데이터,
    isLoading: 커피챗리스트데이터Loading,
    isError: 커피챗리스트에러여부,
  } = useQuery({ queryKey: ['커피챗리스트'], queryFn: 커피챗리스트반환 });
  return { 커피챗리스트데이터, 커피챗리스트데이터Loading, 커피챗리스트에러여부 };
};
export default useSelectCoffeechatList;
