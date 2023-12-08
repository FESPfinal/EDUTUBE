'use client';

import Image from 'next/image';
import Link from 'next/link';
import MyCoffeechatDetailHead from './MyCoffeechatDetailHead';
import MyCoffeechatDetailBody from './MyCoffeechatDetailBody';

const MyCoffeechatDetail = () => {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <MyCoffeechatDetailHead />
      <MyCoffeechatDetailBody />
    </div>
  );
};

export default MyCoffeechatDetail;
