'use client';

import Image from 'next/image';
import Link from 'next/link';

const MyCoffeechatDetailHead = () => {
  return (
    <div className="flex flex-row w-full gap-x-3 justify-between">
      <section className="flex-none">
        <Image
          className="h-36 w-60 flex-none rounded-md bg-cover"
          src={'/'}
          alt=""
          width={80}
          height={80}
          unoptimized={true}
        />
      </section>
      <section className="flex-grow flex flex-col justify-between">
        <div className="text-xs bg-light-main text-white w-fit px-2 py-1 rounded-xl">Tag</div>
        <p className="text-m leading-6 text-gray-900">Title</p>
        <p className="text-m leading-6 text-gray-900">진행기간 | 2023.10.25~ 2023.12.10</p>
        <p className="text-m leading-6 text-gray-900">
          예약 인원 | <span className="text-light-main">2</span> /10
        </p>
        <p className="text-m  leading-6 text-gray-900">온라인</p>
      </section>
      <section className="flex-none">
        <div className="shrink-0 w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
          <Link href={'/coffeechat/regist'}>수정</Link>
        </div>
      </section>
    </div>
  );
};

export default MyCoffeechatDetailHead;
