import useEdutubeAxios from '@/helper/utils/useEdutubeAxios';
import { useMutation } from '@tanstack/react-query';

export type VideoData = {
  name: string; //title
  mainImages: string[]; // 썸네일 이미지
  content: string; //intro
  author: string; //seller nickname(hidden)
  profile: string; //seller profile(hidden)
  category: string[]; //카테고리
  videoList: string[]; //동영상 리스트
};

type Request = {
  price: 0;
  shippingFees: 0;
  quantity: 1;
  buyQuantity: 0;
  show: true;
  active: true;
  name: string; //title
  mainImages: string[]; // 썸네일 이미지
  content: string; //intro
  extra: {
    author: string; //seller nickname(hidden)
    profile: string; //seller profile(hidden)
    category: string[]; //카테고리
    videoList: string[]; //동영상 리스트
  };
};

const URL = '/seller/products';

const useCreateVideoList = () => {
  const { edutubeAxios } = useEdutubeAxios();
  const axiosPost = async (videoData: VideoData) => {
    const requestData: Request = {
      price: 0,
      shippingFees: 0,
      quantity: 1,
      buyQuantity: 0,
      show: true,
      active: true,
      name: videoData.name, //title
      mainImages: videoData.mainImages, // 썸네일 이미지
      content: videoData.content, //intro
      extra: {
        author: videoData.author, //seller nickname(hidden)
        profile: videoData.profile, //seller profile(hidden)
        category: videoData.category, //카테고리
        videoList: videoData.videoList, //동영상 리스트
      },
    };

    const response = await edutubeAxios.post(URL, requestData);
    return response.data.item;
  };

  return useMutation({ mutationFn: axiosPost });
};
export default useCreateVideoList;
