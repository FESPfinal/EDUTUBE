'use client';

import Link from 'next/link';
import { ShowPurchaseList } from './PurchaseList';
import Button from '@/components/atom/Button';
import NextImage from '@/components/atom/NextImage';
import useSelectMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechatChatLink';
import { isBetweenTenToHour } from '@/helper/utils/datetime';

const PLACE_LIST = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const PurchaseCard = ({ data }: { data: ShowPurchaseList }) => {
  const { data: chatLinkData } = useSelectMyCoffeechatChatLink(data._id);

  const isChatButtonShow = !!chatLinkData?.title && isBetweenTenToHour(data.datetime.time);

  return (
    <li className="bg-white p-4 rounded-md shadow-md flex flex-col gap-1">
      <Link href={`/coffeechat/info/${data.parent}`}>
        <NextImage src={data.image} />
      </Link>
      <section className="flex gap-1">
        <div className="text-xs font-semibold border border-solid border-light-main text-light-main w-fit px-2 py-1 rounded-xl">
          {data.place}
        </div>
        <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
          {data.jobCategory}
        </div>
      </section>
      <section>
        <p className="text-lg font-bold truncate">{data.name}</p>
        <p className="text-sm leading-6 text-gray-900 truncate">{data.intro}</p>
        <p className="text-sm leading-6 text-gray-900">바리스타: {data.author}</p>
        <p className="text-sm leading-6 text-gray-900">
          일시 | {new Date(data.datetime?.date).toLocaleDateString()} /
          {new Date(data.datetime?.time).toLocaleTimeString()}
        </p>
        {PLACE_LIST.OFFLINE === data.place && (
          <p className="text-sm leading-6 text-gray-900">장소 | {data.offline}</p>
        )}
      </section>
      <section className="flex gap-2 justify-between">
        {PLACE_LIST.ONLINE === data.place && (
          <div className="w-full">
            <Link href={chatLinkData?.title || ''}>
              <Button
                content={'채팅 시작'}
                size={'small'}
                color={'bg-white border solid border-dark-main'}
                hoverColor={'hover:bg-dark-main hover:text-white'}
                textColor={'text-dark-main disabled:text-white'}
                disabled={!isChatButtonShow}
              />
            </Link>
          </div>
        )}
        <div className="w-full">
          <Link
            href={{
              pathname: `/mypage/reserved/${data._id}/review`,
              query: { parents_id: data.parent },
            }}
          >
            <Button
              content={'후기 등록'}
              size={'small'}
              color={'bg-white border solid border-dark-main'}
              hoverColor={'hover:bg-dark-main hover:text-white'}
              textColor={'text-dark-main'}
            />
          </Link>
        </div>
      </section>
    </li>
  );
};

export default PurchaseCard;
