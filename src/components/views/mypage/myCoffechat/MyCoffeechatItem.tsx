'use client';

import NextImage from '@/components/atom/NextImage';
import { formatDate } from '@/helper/utils/datetime';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { MyCoffeechat } from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechat';
import Link from 'next/link';

interface Props {
  data: MyCoffeechat;
}

const MyCoffeechatItem = ({ data }: Props) => {
  const { data: parentsData } = useSelectCoffeechatInfo(String(data._id));

  const datetimeList = data.extra.datetimeList;
  datetimeList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const firstDate = formatDate(datetimeList[0].date);
  const lastDate = formatDate(datetimeList[datetimeList.length - 1].date);

  return (
    <Link href={`/mypage/my-coffeechat/${data._id}`}>
      <li className="flex justify-between gap-x-6 py-5 border-b border-solid">
        <div className="flex min-w-0 gap-x-4 ">
          <NextImage className="h-28 w-40 flex-none rounded-md bg-cover" src={data.mainImages[0]} />
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
                {data.extra.jobCategory}
              </div>
            </div>
            <p className="text-sm font-semibold leading-6 text-gray-900">{data.name}</p>
            <p className="text-sm leading-6 text-gray-900">
              {firstDate} ~ {lastDate}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-between">
          <p className="text-sm leading-6 text-gray-900">
            <span className="font-semibold">{data.price}</span> point
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            예약 인원 |{' '}
            <span className="text-light-main">
              {data.quantity -
                (parentsData?.options.item.filter(item => !item.buyQuantity).length || 0)}
            </span>{' '}
            /{data.quantity}
          </p>
        </div>
      </li>
    </Link>
  );
};
export default MyCoffeechatItem;
