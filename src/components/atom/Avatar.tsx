'use client';

import Image from 'next/image';

interface Props {
  imageUrl: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}

const Avatar = ({ imageUrl = '/images/default.png', size = 'medium' }: Props) => {
  const sizeClasses = {
    xsmall: { width: 7, height: 7 },
    small: { width: 24, height: 24 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };
  const { width, height } = sizeClasses[size];
  return (

    <Image
      className={`rounded-full object-cover h-${height} w-${width}`}
      src={imageUrl}
      alt="User avatar"
      width={width}
      height={height}
      unoptimized={true}
    />

  );
};

export default Avatar;
