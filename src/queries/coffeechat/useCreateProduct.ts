import { ProductType } from './../../helper/types/order';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL: string = '/seller/products';

const axiosPost = async (requestBody: ProductType) => {
  const response = await axios.post(BASE_URL + URL, requestBody, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE3MDEzMTY1NjYsImV4cCI6MTcwMTMyMzc2NiwiaXNzIjoiRkVTUDAxIn0.hbz9pWl3AKpOKsSDQKA9XRU8zIiUY8drsIkkzBbsXcM`
    }
  })
  return response
}

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (requestBody: ProductType) => axiosPost(requestBody)
  })
};


export default useCreateProduct;
