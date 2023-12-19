'use client';

import FilterButtons from '@/components/atom/FilterButtons';
import { formatDate, formatTime } from '@/helper/utils/datetime';
import useSelectCoffeechatInfo, { Extra } from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { useEffect, useState } from 'react';
import MyCoffeechatDetailChatButton from './MyCoffeechatDetailChatButton';
import useSelectSellerOrders from '@/queries/mypage/myCoffeechat/useSelectSellerOrders';

const MY_COFFECHAT_OPTIONS = {
  TOTAL: '전체',
  RESERVED: '예약된 내역',
  UNRESERVED: '예약안된 내역',
};
const mypageCoffeechatDetailFilter = [
  MY_COFFECHAT_OPTIONS.TOTAL,
  MY_COFFECHAT_OPTIONS.RESERVED,
  MY_COFFECHAT_OPTIONS.UNRESERVED,
];

export type ReservedState = {
  isReserved: boolean;
  itemInfo: {
    name: string;
    optionId: number;
    sellerName: string;
    date: string;
    time: string;
    userName: string;
    price: number;
    place: 'online' | 'offline';
    online: string;
    offline: string;
    extra: Extra;
  };
};

type OrderFormat = {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: string;
  price: number;
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: string;
      time: string;
    };
    author: string;
    type: string;
    jobCategory: string[];
    regionCategory: string;
    productType: string;
    depth: number;
    parent: number;
  };
};

const MyCoffeechatDetailBody = ({ _id }: { _id: string }) => {
  const { data: parentsOrderData } = useSelectCoffeechatInfo(_id);
  const { data: sellerOrdersData } = useSelectSellerOrders();
  const [options, setOptions] = useState<ReservedState[]>();
  const [showOptionList, setShowOptionList] = useState(options);
  const [selectedOption, setSelectedOption] = useState(MY_COFFECHAT_OPTIONS.TOTAL);

  const isOnline = parentsOrderData?.extra.place === 'online';

  useEffect(() => {
    const parentsOptions = parentsOrderData?.options.item;
    const optionsFormatList = parentsOptions?.map(option => {
      // const customerInfo = sellerOrdersData?.filter(items => option._id === items.products.filter((item) => item));

      return {
        isReserved: !!option?.buyQuantity,
        itemInfo: {
          name: option?.name,
          optionId: option._id,
          sellerName: option.extra?.author,
          date: option.extra.datetime?.date,
          time: option.extra.datetime?.time,
          userName: option.extra?.author,
          price: option?.price,
          place: option.extra?.place,
          online: option.extra?.online,
          offline: option.extra?.offline,
          extra: option.extra,
        },
      };
    });

    setShowOptionList(optionsFormatList);
    setOptions(optionsFormatList);
  }, [parentsOrderData, sellerOrdersData]);

  useEffect(() => {
    //탭 선택 변경시 보여주는 데이터 변경
    if (selectedOption === MY_COFFECHAT_OPTIONS.TOTAL) {
      setShowOptionList(options);
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.RESERVED) {
      setShowOptionList(options?.filter(data => data.isReserved));
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.UNRESERVED) {
      setShowOptionList(options?.filter(data => !data.isReserved));
    }
  }, [options, selectedOption]);

  return (
    <>
      <section className="flex justify-between w-full">
        <p className="text-sm leading-8">
          전체 커피챗 수 <span className="text-light-main">{options?.length}</span>
        </p>
        <FilterButtons options={mypageCoffeechatDetailFilter} setPropsOption={setSelectedOption} />
      </section>
      <div className="flex flex-col w-full">
        <div className="-my-2 overflow-x-auto w-full">
          <div className="py-2 align-middle inline-block w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-full">
              <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-dark-main">
                  <tr>
                    <th
                      scope="col"
                      className={`w-[25%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}
                    >
                      예약일
                    </th>
                    <th
                      scope="col"
                      className="w-[25%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      예약 시간
                    </th>
                    <th
                      scope="col"
                      className="w-[25%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      예약자 명
                    </th>
                    {/* <th
                      scope="col"
                      className="w-60 px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Q&A
                    </th> */}
                    <th
                      scope="col"
                      className="w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      POINT
                    </th>
                    {isOnline && (
                      <th
                        scope="col"
                        className="w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        채팅방
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 w-full">
                  {showOptionList?.map((item, i) => (
                    <tr key={i} className="w-full">
                      <td
                        className={`${
                          item.isReserved ? 'text-light-main' : ''
                        } px-4 py-4 whitespace-nowrap`}
                      >
                        {formatDate(item.itemInfo.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {formatTime(item.itemInfo.time)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{item.itemInfo.userName}</td>
                      {/* <td className="px-4 py-4 w-60 truncate">
                        <p className="xs:max-w-[5%] sm:max-w-[10%] md:max-w-[30%] lg:max-w-[60%] truncate">
                          {item.qna}
                        </p>
                      </td> */}
                      <td className="px-4 py-4 whitespace-nowrap">{item.itemInfo.price}</td>
                      {isOnline && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item.isReserved && (
                            <MyCoffeechatDetailChatButton data={item} parentsId={_id} />
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCoffeechatDetailBody;
