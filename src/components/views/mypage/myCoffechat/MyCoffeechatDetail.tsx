'use client';

import { useParams } from 'next/navigation';
import MyCoffeechatDetailBody from './MyCoffeechatDetailBody';
import MyCoffeechatDetailHead from './MyCoffeechatDetailHead';

const MyCoffeechatDetail = () => {
  const params = useParams();
  const _id = params._id as string;

  return (
    <div className="flex flex-col w-full gap-y-2">
      <MyCoffeechatDetailHead _id={_id} />
      <MyCoffeechatDetailBody _id={_id} />
    </div>
  );
};

export default MyCoffeechatDetail;
