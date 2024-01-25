import { VideoList } from '@/helper/types/video';
import { create } from 'zustand';

type Video = { videoList: VideoList; setVideoList: (videoList: VideoList) => void };

const useVideo = create<Video>(set => ({
  videoList: [],
  setVideoList: (videoList: VideoList) => {
    set({ videoList });
  },
}));

export default useVideo;
