'use client';

import Image from 'next/image';
import SkeletonBox from './SkeletonBox';
import { IMAGE_ROUTE } from '@/helper/constants/commons';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  youtube?: boolean;
}

const regex = /https:\/\//;

const NextImage = ({
  src,
  alt = '이미지',
  className = 'w-full h-32 object-cover mb-4 rounded-md',
  youtube,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const isShow = youtube ? true : !regex.test(src) && !!src && typeof src == 'string';

  return isShow ? (
    <>
      {!loaded && <div>{alt}</div>}
      <Image
        src={youtube ? src : IMAGE_ROUTE + src}
        alt={alt}
        width={80}
        height={80}
        unoptimized={true}
        className={className}
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
      />
    </>
  ) : (
    <SkeletonBox width={'100%'} height={'150px'} round={10} />
  );
};
export default NextImage;
