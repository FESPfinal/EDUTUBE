'use client';

import Image from 'next/image';
import SkeletonBox from './SkeletonBox';
import { IMAGE_ROUTE } from '@/helper/constants/commons';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  youtube?: boolean;
}

const regex = /https:\/\//;

const NextImage = ({
  src,
  alt = '',
  className = 'w-full h-32 object-cover mb-4 rounded-md',
  youtube,
}: Props) => {
  const isShow = youtube ? true : !regex.test(src) && !!src && typeof src == 'string';

  return isShow ? (
    <Image
      src={youtube ? src : IMAGE_ROUTE + src}
      alt={alt}
      width={80}
      height={80}
      unoptimized={true}
      className={className}
    />
  ) : (
    <SkeletonBox width={'100%'} height={'150px'} round={10} />
  );
};
export default NextImage;
