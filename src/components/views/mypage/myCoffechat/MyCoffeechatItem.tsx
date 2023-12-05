'use client';

import Image from 'next/image';

const MyCoffeechatItem = () => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4 ">
        <Image
          className="h-28 w-40 flex-none rounded-md "
          src="/public/images/default.png"
          alt=""
          width={80}
          height={80}
        />
        <div className="min-w-0 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
              Tag
            </div>
          </div>
          <p className="text-sm font-semibold leading-6 text-gray-900">TitleTitleTitleTitleTitle</p>
          <p className="text-sm leading-6 text-gray-900">진행기간 | 2023.10.25~ 2023.12.10</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-between">
        <p className="text-sm leading-6 text-gray-900">1000 point</p>
        <p className="text-sm font-semibold leading-6 text-gray-900">
          예약 인원 | <span className="text-light-main">2</span> /10
        </p>
      </div>
    </li>
  );
};
export default MyCoffeechatItem;
