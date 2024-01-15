'use client';

import NextImage from '@/components/atom/NextImage';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { YoutubeSnippet } from '@/queries/video/regist/useCreateVideoList';

interface Props {
  videos: YoutubeSnippet[];
  deleteVideoList: (videoId: string) => void;
  moveVideoList: (movedVideos: YoutubeSnippet[]) => void;
}

const VideoRegistList = ({ videos, deleteVideoList, moveVideoList }: Props) => {
  const [draggedVideo, setDraggedVideo] = useState<YoutubeSnippet | null>(null);

  const handleDragStart = (event: React.MouseEvent, video: YoutubeSnippet) => {
    setDraggedVideo(video);
  };

  const handleDragOver = (event: React.MouseEvent, video: YoutubeSnippet) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.MouseEvent, video: YoutubeSnippet) => {
    event.preventDefault();
    const draggedVideoIndex = videos.findIndex(v => v === draggedVideo);
    const videoIndex = videos.findIndex(v => v === video);

    if (draggedVideoIndex > -1 && videoIndex > -1) {
      const updatedVideos = [...videos];
      updatedVideos.splice(draggedVideoIndex, 1);
      draggedVideo && updatedVideos.splice(videoIndex, 0, draggedVideo);
      setDraggedVideo(null);
      // 변경된 순서로 업데이트된 비디오 배열을 처리하는 로직을 추가해야합니다.
      moveVideoList(updatedVideos);
    }
  };

  return (
    <ul className="flex flex-col gap-1">
      {videos?.map((video, i) => {
        return (
          <li
            key={video._id}
            className="flex gap-1 border border-solid border-color-gray rounded-lg"
            draggable={!draggedVideo} // 드래그 가능한지 여부를 설정하여 드래그 중에는 다른 요소가 드래그되지 않도록 합니다.
            onDragStart={event => handleDragStart(event, video)}
            onDragOver={event => handleDragOver(event, video)}
            onDrop={event => handleDrop(event, video)}
          >
            <div className="pl-1 flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <figure className="w-4/12">
              <NextImage
                src={video.thumbnails}
                youtube={true}
                className={'w-full'}
                alt={video.title}
              />
            </figure>
            <div className="w-8/12 flex flex-col justify-between p-2">
              <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">{video.title}</p>
              <p>{video.channelTitle}</p>
            </div>
            <button
              type="button"
              className="p-4"
              onClick={e => {
                e.preventDefault();
                deleteVideoList(video._id);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default VideoRegistList;
