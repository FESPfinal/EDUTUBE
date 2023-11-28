import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const 커피챗디테일반환 = async (_id: string) => {
  const response = await axios.get(`https://localhost/api/products/${_id}`);
  return response.data;
};

const useSelectCoffeechatInfo = (_id: string) => {
  const {
    data: 커피챗디테일데이터,
    isLoading: 커피챗디테일데이터Loading,
    isError: 커피챗디테일에러여부,
  } = useQuery({ queryKey: ['커피챗디테일'], queryFn: () => 커피챗디테일반환(_id) });
  return { 커피챗디테일데이터, 커피챗디테일데이터Loading, 커피챗디테일에러여부 };
};

export default useSelectCoffeechatInfo;
