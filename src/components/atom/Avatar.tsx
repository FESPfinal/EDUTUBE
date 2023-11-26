'use client';

import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {
  imageUrl: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: FC<AvatarProps> = ({ imageUrl = '/images/default.png', size = 'medium' }) => {
  const sizeClasses = {
    small: { width: 24, height: 24 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };

  return (
    <Image
      className={`rounded-full object-cover`}
      src={imageUrl}
      alt="User avatar"
      width={sizeClasses[size].width}
      height={sizeClasses[size].height}
    />
  );
};

export default Avatar;
