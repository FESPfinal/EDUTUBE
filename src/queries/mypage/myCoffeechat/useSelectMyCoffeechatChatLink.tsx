'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

// /posts?type=qna&custom={"product_id":1} 이걸로 수정
const URL = (_id: string) => `/posts/${_id}`;

const useSelectMyCoffeechatChatLink = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const getAxios = async (_id: string) => {
    const response = await edutubeAxios.get(_id);
    return response.data.item;
  };
  return useQuery({ queryKey: [URL], queryFn: () => getAxios });
};

export default useSelectMyCoffeechatChatLink;
