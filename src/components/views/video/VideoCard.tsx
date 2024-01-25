'use client';

import NextImage from '@/components/atom/NextImage';
import { VideoItem } from '@/helper/types/video';
import Link from 'next/link';

interface Props {
  item: VideoItem;
}

const VideoCard = ({ item }: Props) => {
  return (
    <Link href={`coffeechat/info/${item._id}`}>
      <NextImage
        src={item.mainImages[0].path}
        alt="Coffee Image"
        className="w-full h-32 object-cover mb-4 rounded-md transform group-hover:scale-105 transition duration-300"
      />
      <div className="text-lg font-bold mb-2 text-opacity-90 group-hover:text-opacity-100 transition duration-300 text-black">
        제목: {item.name}
      </div>
      <div className="text-gray-600 mb-2 text-opacity-70 group-hover:text-opacity-100 transition duration-300">
        바리스타: {item.extra.author}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="min-w-fit text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
          {item?.extra?.category?.[0] && item?.extra?.category[0]}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full opacity-0 bg-black text-white p-4 transition duration-300 group-hover:opacity-90">
        <p className="text-lg font-bold mb-2">상세보기</p>
        <p className="mb-2">intro: {item?.content}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
