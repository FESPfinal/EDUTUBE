import Cookies from 'js-cookie';
import { TempParentsProduct, TempChildProduct } from '../../helper/types/tempProduct';
import { useMutation } from '@tanstack/react-query';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';

const URL: string = '/seller/products';

export type ProductResponseData = {
  mainImages: [],
  name: string
  content: string;
  price: number;
  shippingFees: number,
  show: boolean;
  active: boolean;
  quantity: number,
  buyQuantity: number,
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: Date,
      time: Date
    };
    datetimeList: {
      date: Date,
      time: Date
    }[];
    author: string;
    authorImage: string;
    jobCategory: string[];
    regionCategory: string;
    productType: 'child';
    parent: number;
    depth: number;
  }
  seller_id: number;
  _id: number;
  createAt: string;
  updateAt: string;
}

const useCreateProduct = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosPost = async (requestBody: TempParentsProduct | TempChildProduct) => {
    const response = await edutubeAxios.post(URL, requestBody);
    return response.data.item as ProductResponseData;
  }

  return useMutation({
    mutationFn: (requestBody: TempParentsProduct | TempChildProduct) => axiosPost(requestBody)
  })
};


export default useCreateProduct;
