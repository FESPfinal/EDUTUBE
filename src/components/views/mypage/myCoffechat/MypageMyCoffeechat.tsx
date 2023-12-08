'use client';

import Link from 'next/link';
import MyCoffeechatItem from './MyCoffeechatItem';
import useSelectMyCoffeechat from '@/queries/coffeechat/myCoffeechat/useSelectMyCoffeechat';

const MypageMyCoffeechat = () => {
  const { data: myCoffeechatList } = useSelectMyCoffeechat();

  return (
    <>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end mb-2">
          <div>
            <section className="flex gap-2">
              <p>전체 커피챗 개수</p>
              <p className="text-light-main">{myCoffeechatList?.length}</p>
            </section>
          </div>
          <section>
            <div className="w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
              <Link href={'/coffeechat/regist'}>커피챗 등록</Link>
            </div>
          </section>
        </div>
      </section>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {/* TODO: filter((coffeechatItem) => coffeechatItem.extra.type === 'coffeechat') 추가 필요 */}
          {myCoffeechatList?.map((coffeechatItem: {}) => {
            return <MyCoffeechatItem data={coffeechatItem} key={coffeechatItem._id} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default MypageMyCoffeechat;
