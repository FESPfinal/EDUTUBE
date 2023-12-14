import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useQuery } from '@tanstack/react-query';

const URL = `/replies/products`;

type ReplyList = ReplyItem[];

type ReplyItem = {
  _id: number,
  rating: number,
  content: string,
  createdAt: string,
  product: Product,
  user: User,
};

type Product = {
  _id: number,
  image: string,
  name: string
}

type User = {
  _id: number,
  name: string
}


const useSelectReply = (_id: string) => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosGet = async (_id: string) => {
    const response = await edutubeAxios.get(URL + `/${_id}`);
    return response.data.item as ReplyList;
  };

  return useQuery({ queryKey: ['ReplyList', _id], queryFn: () => axiosGet(_id) });
};
export default useSelectReply;
