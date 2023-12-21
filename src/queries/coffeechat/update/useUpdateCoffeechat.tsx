import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation, MutationFunction } from '@tanstack/react-query';

const URL = (_id: string) => `/seller/products/${_id}`;

export type UpdateResponseData = {
  mainImages?: [];
  name?: string;
  content?: string;
  price?: number;
  shippingFees?: number;
  show?: boolean;
  active?: boolean;
  quantity?: number;
  buyQuantity?: number;
  extra?: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: Date;
      time: Date;
    };
    datetimeList: {
      date: Date;
      time: Date;
    }[];
    author?: string;
    authorImage?: string;
    jobCategory?: string[];
    regionCategory?: string;
    productType?: 'child';
    parent?: number;
    depth?: number;
  };
  seller_id?: number;
  _id?: number;
  createAt?: string;
  updateAt?: string;
};

const useUpdateOrder = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const patchAxios = async (updateData: {}, _id: string) => {
    const response = await edutubeAxios.patch(URL(_id), updateData);
    return response.data as UpdateResponseData;
  };
  return useMutation({
    mutationFn: ({ updateData, _id }: { updateData: any; _id: string }) =>
      patchAxios(updateData, _id),
  });
};
export default useUpdateOrder;
