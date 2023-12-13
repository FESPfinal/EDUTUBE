'use client';

import { Order } from '@/queries/coffeechat/order/useSelectOrder';
import Image from 'next/image';
import Link from 'next/link';

const PLACE_LIST = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const PurchaseCard = ({ data }: { data: Order }) => {
  return (
    <li className="bg-white p-4 rounded-md shadow-md flex flex-col gap-1">
      <Link href={`/coffeechat/info/${data.products[0].extra?.parent}`}>
        <Image
          src={`https://localhost:443${data?.products[0]?.image}`}
          alt={data?.products[0]?.name}
          className="w-full h-32 object-cover mb-4 rounded-md"
          width={80}
          height={80}
          unoptimized={true}
        />
      </Link>
      <section className="flex gap-1">
        <div className="text-xs font-semibold border border-solid border-light-main text-light-main w-fit px-2 py-1 rounded-xl">
          {data.products[0].extra?.place}
        </div>
        <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
          {data.products[0].extra?.jobCategory}
        </div>
      </section>
      <section>
        <p className="text-lg font-bold truncate">{data?.products[0].name}</p>
        <p className="text-sm leading-6 text-gray-900 truncate">{data.products[0].extra?.intro}</p>
        <p className="text-sm leading-6 text-gray-900">진행자: {data.products[0].extra?.author}</p>
        <p className="text-sm leading-6 text-gray-900">
          일시 | {new Date(data.products[0].extra?.datetime?.date).toLocaleDateString()} /{' '}
          {new Date(data.products[0].extra?.datetime?.time).toLocaleTimeString()}
        </p>
        {PLACE_LIST.OFFLINE === data.products[0].extra?.place && (
          <p className="text-sm leading-6 text-gray-900">
            장소 | {data.products[0].extra?.offline}
          </p>
        )}
        {PLACE_LIST.ONLINE === data.products[0].extra?.place && (
          <p className="text-sm leading-6 text-gray-900">
            채팅링크(온라인 시) | {data.products[0].extra?.online}
          </p>
        )}
      </section>
    </li>
  );
};

export default PurchaseCard;
