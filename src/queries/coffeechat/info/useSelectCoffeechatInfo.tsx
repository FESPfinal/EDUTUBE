import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/products';

type Extra = {
  intro: string;
  place: string;
  online: string;
  offline: string;
  datetime: {
    date: string;
    time: string;
  };
  author: string;
  type: string;
  jobCategory: string[];
  regionCategory: string;
  productType: string;
  depth: number;
  parent: number;
};

type Options = {
  _id: number;
  mainImages: string[];
  name: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number;
  buyQuantity: number;
  extra: Extra;
  seller_id: number;
  createdAt: string;
  updatedAt: string;
};

type ProductItem = {
  _id: number;
  mainImages: string[];
  name: string;
  content: string;
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
    datetime: {
      date: string;
      time: string;
    };
    author: string;
    authorImage: string;
    type: string;
    jobCategory: string[];
    regionCategory: string;
    productType: string;
    depth: number;
    parent: number;
  };
  seller_id: number;
  createdAt: string;
  updatedAt: string;
  replies: [];
  bookmarks: [];
  options: Options[];
};

const useSelectCoffeechatInfo = (_id: string) => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosGet = async (_id: string) => {
    const response = await edutubeAxios.get(URL + `/${_id}`);
    return response.data.item as ProductItem;
  };

  return useQuery({ queryKey: ['coffeechatDetail', _id], queryFn: () => axiosGet(_id) });
};
export default useSelectCoffeechatInfo;
