import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useInfiniteQuery } from '@tanstack/react-query';

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

const URL = (pageParam: number) => `/products?page=${pageParam}&limit=3`;

const useSelectInfiniteCoffeechatList = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosGet = async (pageParam: any) => {
    const response = await edutubeAxios.get(URL(pageParam));
    return response.data.item as CoffeechatList;
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['coffeechatList'],
    queryFn: ({ pageParam }) => axiosGet(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) {
        return null;
      }
      return lastPageParam + 1;
    },
  });
  return { data, fetchNextPage, isFetchingNextPage, hasNextPage };
};


export default useSelectInfiniteCoffeechatList;