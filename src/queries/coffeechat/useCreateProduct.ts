import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL: string = '/seller/products';

interface RequestBody {
  mainImages: string[];
  name: string;
  content: string;
  price: string;
  shippingFees: number;
  show: boolean;
  active: boolean;
  extra: {
    type: string;
    category: string;
    intro: string;
    online: string;
    offline: string;
    date: string[];
    time: string[];
    person: string;
  };
}

const useCreateProduct = () => {
  return useMutation({mutationFn:     
    (requestBody: RequestBody) =>
    axios.post(BASE_URL + URL, requestBody, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE3MDEyMzEzNzMsImV4cCI6MTcwMTIzODU3MywiaXNzIjoiRkVTUDAxIn0.czZVqJ9vgc_uAZ-___u0HJT0wvM6sdyGx2YF9gBDzuU`,
      },
    }),
  });
};

export default useCreateProduct;
