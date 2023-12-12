'use client';

import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = '/seller/products';

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

export type MyCoffeechat = {
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

type MyCoffeechatList = MyCoffeechat[];

const useSelectMyCoffeechat = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosGet = async () => {
    const response = await edutubeAxios.get(URL);
    return response.data.item as MyCoffeechatList;
  };

  return useQuery({ queryKey: [URL], queryFn: axiosGet });
};

export default useSelectMyCoffeechat;
