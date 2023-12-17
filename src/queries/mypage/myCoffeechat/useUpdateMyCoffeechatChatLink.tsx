'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

const URL = (_id: string) => `/seller/products/${_id}`;

type RequestData = {
  _id: string;
  chatLink: string;
};

const useUpdateMyCoffeechatChatLink = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const patchAxios = async ({ _id, chatLink }: RequestData) => {
    const response = await edutubeAxios.patch(URL(_id), { 'extra.online': chatLink });
    return response.data.item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateMyCoffeechatChatLink;
