
import { useMutation } from '@tanstack/react-query';
import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { replyData } from '@/helper/types/reply'

const URL: string = '/replies';

export type ReplyResponseData = {
  order_id: number,
  product_id: number,
  rating: number,
  content: string,
  user_id: number,
  _id: number,
}

const useCreateReply = () => {
  const { edutubeAxios } = useEdutubeAxios();

  const axiosPost = async (requestBody: replyData) => {
    const response = await edutubeAxios.post(URL, requestBody);
    return response.data.item as ReplyResponseData;
  }

  return useMutation({
    mutationFn: (requestBody: replyData) => axiosPost(requestBody)
  })
};


export default useCreateReply;
