'use client';

import Image from 'next/image';
import { YoutubeSnippet } from './VideoRegist';

interface Props {
  data: YoutubeSnippet[];
}

const VideoList = ({ data }: Props) => {
  return (
    <ul>
      {data?.map((video, i) => {
        return (
          <li key={video._id}>
            <p>{video.title}</p>
            <figure>
              <Image
                src={video.thumbnails}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority
                alt={''}
              />
            </figure>
          </li>
        );
      })}
    </ul>
  );
};

export default VideoList;
