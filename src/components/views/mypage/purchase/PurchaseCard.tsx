'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShowPurchaseList } from './PurchaseList';
import Button from '@/components/atom/Button';

const PLACE_LIST = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const PurchaseCard = ({ data }: { data: ShowPurchaseList }) => {
  return (
    <li className="bg-white p-4 rounded-md shadow-md flex flex-col gap-1">
      <Link href={`/coffeechat/info/${data.parent}`}>
        <Image
          src={`https://localhost:443${data.image}`}
          alt={data.name}
          className="w-full h-32 object-cover mb-4 rounded-md"
          width={80}
          height={80}
          unoptimized={true}
        />
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
        <p className="text-sm leading-6 text-gray-900">진행자: {data.author}</p>
        <p className="text-sm leading-6 text-gray-900">
          일시 | {new Date(data.datetime?.date).toLocaleDateString()} /{' '}
          {new Date(data.datetime?.time).toLocaleTimeString()}
        </p>
        {PLACE_LIST.OFFLINE === data.place && (
          <p className="text-sm leading-6 text-gray-900">장소 | {data.offline}</p>
        )}
        {PLACE_LIST.ONLINE === data.place && (
          <p className="text-sm leading-6 text-gray-900">채팅링크(온라인 시) | {data.online}</p>
        )}
      </section>
      <section className="flex gap-2 justify-between">
        <Link href={'/'}>
          <Button content={'채팅 시작하기'} size={'small'} />
        </Link>
        <Link
          href={{
            pathname: `/mypage/reserved/${data._id}/review`,
            query: { parents_id: data.parent },
          }}
        >
          <Button content={'후기 등록하기'} size={'small'} />
        </Link>
      </section>
    </li>
  );
};

export default PurchaseCard;
