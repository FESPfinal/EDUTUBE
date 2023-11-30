import Cookies from 'js-cookie';
import { ProductType } from '@/helper/types/product';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/seller/products/';

const axiosPatch = async (_id: string, requestBody: ProductType) => {
  const accessToken = Cookies.get('accessToken')
  const response = await axios.patch(BASE_URL + URL + `/${_id}`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}


const useUpdateCoffeeChat = () => {
  return useMutation({
    mutationFn: ({_id, requestBody}: {_id: string , requestBody: ProductType}) => axiosPatch(_id, requestBody)
  })
};

export default useUpdateCoffeeChat;