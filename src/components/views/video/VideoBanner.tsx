'use client';

import Image from 'next/image';
import banner from '/public/images/banner.png';

const VideoBanner = () => {
  return (
    <>
      <Image className="bg-cover w-full" src={banner} alt="광고사진" />
    </>
  );
};

export default VideoBanner;
