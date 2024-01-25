'use client';

import useVideo from '@/stores/video';
import VideoBanner from './VideoBanner';
import VideoList from './VideoList';
import VideoSearch from './VideoSearch';
import { useEffect } from 'react';

interface Props {
  initData: any;
}

const VideoMain = ({ initData }: Props) => {
  const { setVideoList } = useVideo(store => store);
  useEffect(() => {
    setVideoList(initData);
  }, [initData]);

  return (
    <>
      <VideoBanner />
      <VideoSearch />
      <VideoList />
    </>
  );
};

export default VideoMain;
