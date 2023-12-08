import Cookies from 'js-cookie';
import { tempProductType } from '../../helper/types/tempProduct';
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
    parentsId: number,
    productType: 'child';
  }
  seller_id: number;
  _id: number;
  createAt: string;
  updateAt: string;
}

const useCreateProduct = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosPost = async (requestBody: tempProductType) => {
    const response = await edutubeAxios.post(URL, requestBody);
    return response.data.item as ProductResponseData;
  }

  return useMutation({
    mutationFn: (requestBody: tempProductType) => axiosPost(requestBody)
  })
};


export default useCreateProduct;
