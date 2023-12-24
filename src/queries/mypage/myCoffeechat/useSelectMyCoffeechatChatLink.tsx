'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = (_id: number) => `/posts?type=coffeechat&custom={"product_id":${_id}}`;

type ChatLinkItem = {
  _id: number;
  type: string;
  product_id: number;
  title: string;
  content: string;
  user: {
    _id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  seller_id: number;
  product: {
    name: string;
    image: string;
  };
};

const useSelectMyCoffeechatChatLink = (_id: number) => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async () => {
    const response = await edutubeAxios.get(URL(_id));
    const lastItemIndex = response.data.item.length - 1;
    return (response.data.item[lastItemIndex] as ChatLinkItem) || {};
  };
  return useQuery({ queryKey: [URL(_id), _id], queryFn: getAxios });
};

export default useSelectMyCoffeechatChatLink;
