'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { Extra } from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { useMutation } from '@tanstack/react-query';

const URL = `/posts`;

type RequestData = {
  _id: number;
  reqData: {
    type: 'coffeechat';
    product_id: number;
    title: string;
    content: string;
  };
};

const useUpdateMyCoffeechatChatLink = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const patchAxios = async ({ _id, reqData }: RequestData) => {
    const response = await edutubeAxios.post(URL, { extra: { ...reqData } });
    return response.data.item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateMyCoffeechatChatLink;
