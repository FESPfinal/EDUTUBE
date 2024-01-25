'use client';

import useVideo from '@/stores/video';
import VideoCard from './VideoCard';
import { VideoItem } from '@/helper/types/video';

const VideoList = () => {
  const { videoList } = useVideo(store => store);
  console.log(videoList);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoList.map((videoItem: VideoItem) => (
          <li
            key={videoItem._id}
            className="relative group bg-white p-4 rounded-lg shadow-md overflow-hidden scrollbar-hide transition duration-300 hover:opacity-80"
          >
            <VideoCard item={videoItem} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default VideoList;
