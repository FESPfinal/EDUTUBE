'use client';

import { Order } from '@/queries/coffeechat/order/useSelectOrder';
import Image from 'next/image';
import Link from 'next/link';

const PurchaseCard = ({ data }: { data: Order }) => {
  return (
    <li className="bg-white p-4 rounded-md shadow-md flex flex-col gap-1">
      <Link href={`/coffeechat/info/${data.products[0]._id}`}>
        <Image
          src={data?.products[0]?.image}
          alt={data?.products[0]?.name}
          className="w-full h-32 object-cover mb-4 rounded-md"
          width={80}
          height={80}
          unoptimized={true}
        />
      </Link>
      <section>
        <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
          온라인
        </div>
      </section>
      <section>
        <p className="text-lg font-bold truncate">{data?.products[0].name}</p>
        <p className="text-sm leading-6 text-gray-900 truncate">
          introintrointrointrointrointrointrointro
        </p>
        <p className="text-sm leading-6 text-gray-900">강의자</p>
        <p className="text-sm leading-6 text-gray-900">일시 | 2023.10.25</p>
        <p className="text-sm leading-6 text-gray-900">
          장소(오프라인 시) | 2023.10.25 <br /> 줌링크(온라인 시) | fsadgshggfsa
        </p>
        {/* 클릭 시 모달로 상세내용 보여줌 */}
        <p className="text-sm leading-6 text-gray-900">내가 작성한 Q&A</p>
      </section>
    </li>
  );
};

export default PurchaseCard;
