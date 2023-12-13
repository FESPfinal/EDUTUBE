'use client';

import useSelectMyCoffeechat, {
  MyCoffeechat,
} from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechat';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MyCoffeechatItem from './MyCoffeechatItem';

const PRODUCT_TYPE = {
  PARENTS: 'parents',
  CHILD: 'child',
  COFFEECHAT: 'coffeechat',
};

const MypageMyCoffeechat = () => {
  const { data: myProductList } = useSelectMyCoffeechat();
  const [coffeechatParentsList, setCoffeechatParentsList] = useState<MyCoffeechat[]>();

  useEffect(() => {
    //parent data만 filter해서 저장
    if (myProductList) {
      const coffeechatList = myProductList.filter(
        item => item.extra.type === PRODUCT_TYPE.COFFEECHAT,
      );
      const parentsList = coffeechatList.filter(
        item => item.extra.productType === PRODUCT_TYPE.PARENTS,
      );
      setCoffeechatParentsList(parentsList);
    }
  }, [myProductList]);

  return (
    <>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end mb-2">
          <div>
            <section className="flex gap-2">
              <p>전체 커피챗 개수</p>
              <p className="text-light-main">{coffeechatParentsList?.length}</p>
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
          {coffeechatParentsList?.map(item => {
            return <MyCoffeechatItem data={item} key={item._id} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default MypageMyCoffeechat;
