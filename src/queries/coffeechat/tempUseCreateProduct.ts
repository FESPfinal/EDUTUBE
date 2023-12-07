import Cookies from 'js-cookie';
import { tempProductType } from '../../helper/types/tempProduct';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL: string = '/seller/products';

const axiosPost = async (requestBody: tempProductType) => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.post(BASE_URL + URL, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data.item
}

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (requestBody: tempProductType) => axiosPost(requestBody)
  })
};


export default useCreateProduct;
