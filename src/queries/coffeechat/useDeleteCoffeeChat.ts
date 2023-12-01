import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = '/seller/products/';

const axiosDelete = async (_id: string, ) => {
  const accessToken = Cookies.get('accessToken')
  const response = await axios.delete(BASE_URL + URL + `${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}

const useDeleteCoffeeChat = () => {
  return useMutation({
    mutationFn: (data : { _id: string }) => axiosDelete(data._id)
  })
};

export default useDeleteCoffeeChat;
