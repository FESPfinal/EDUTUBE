import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

export type CoffeechatItem = {
  _id: number;
  mainImages: string[];
  name: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number;
  buyQuantity: number;
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetimeList: {
      date: string;
      time: string;
    }[];
    author: string;
    authorImage: string;
    type: string;
    jobCategory: string[];
    regionCategory: string;
    productType: string;
    depth: number;
  };
  seller_id: number;
  createdAt: string;
  updatedAt: string;
};

export type CoffeechatList = CoffeechatItem[];

const URL = '/products';

const useSelectCoffeechatList = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data.item as CoffeechatList;
  };
  return useQuery({ queryKey: ['coffeechatList'], queryFn: axiosGet });
};

export default useSelectCoffeechatList;
