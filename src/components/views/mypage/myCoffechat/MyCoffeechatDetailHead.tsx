'use client';

import NextImage from '@/components/atom/NextImage';
import { formatDate } from '@/helper/utils/datetime';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import Link from 'next/link';

const MyCoffeechatDetailHead = ({ _id }: { _id: string }) => {
  const { data: coffeechatInfoData } = useSelectCoffeechatInfo(_id);

  const datetimeList = coffeechatInfoData?.extra.datetimeList;

  datetimeList?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const firstDate = datetimeList && formatDate(datetimeList[0].date);
  const lastDate = datetimeList && formatDate(datetimeList[datetimeList.length - 1].date);

  return (
    <div className="flex flex-row w-full gap-x-3 justify-between">
      <section className="flex-none">
        <Link href={`/coffeechat/info/${_id}`}>
          <NextImage
            className="h-36 w-60 flex-none rounded-md bg-cover"
            src={coffeechatInfoData?.mainImages[0] || ''}
            alt=""
          />
        </Link>
      </section>
      <section className="flex-grow flex flex-col justify-between">
        {coffeechatInfoData?.extra.jobCategory.map((tag, i) => (
          <div
            key={`${tag}_${i}`}
            className="text-xs bg-light-main text-white w-fit px-2 py-1 rounded-xl"
          >
            {tag}
          </div>
        ))}
        <p className="text-m leading-6 text-gray-900">{coffeechatInfoData?.name}</p>
        <p className="text-m leading-6 text-gray-900">
          진행기간 | {firstDate} ~ {lastDate}
        </p>
        <p className="text-m leading-6 text-gray-900">
          예약 인원 |{' '}
          <span className="text-light-main">
            {(coffeechatInfoData?.quantity || 0) -
              (coffeechatInfoData?.options?.item?.filter(item => !item.buyQuantity).length || 0)}
          </span>
          /{coffeechatInfoData?.quantity}
        </p>
        <p className="text-m  leading-6 text-gray-900">{coffeechatInfoData?.extra.place}</p>
      </section>
      <section className="flex-none">
        <div className="shrink-0 w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
          <Link href={`/coffeechat/update/${_id}`}>수정</Link>
        </div>
      </section>
    </div>
  );
};

export default MyCoffeechatDetailHead;
