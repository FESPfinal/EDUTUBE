'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { Extra } from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { useMutation } from '@tanstack/react-query';

const URL = (_id: number) => `/seller/products/${_id}`;

type RequestData = {
  _id: number;
  extraData: Extra;
};

const useUpdateMyCoffeechatChatLink = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const patchAxios = async ({ _id, extraData }: RequestData) => {
    const response = await edutubeAxios.patch(URL(_id), { extra: extraData });
    return response.data.item;
  };

  return useMutation({ mutationFn: patchAxios });
};

export default useUpdateMyCoffeechatChatLink;
