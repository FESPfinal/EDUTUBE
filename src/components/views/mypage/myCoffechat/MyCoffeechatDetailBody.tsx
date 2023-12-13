'use client';

import FilterButtons from '@/components/atom/FilterButtons';
import { formatDate, formatTime } from '@/helper/utils/datetime';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useSelectSellerOrders, { Order } from '@/queries/mypage/myCoffeechat/useSelectSellerOrders';
import { useCallback, useEffect, useState } from 'react';

const MY_COFFECHAT_OPTIONS = {
  TOTAL: '전체',
  RESERVED: '예약된 내역',
  UNRESERVED: '예약안된 내역',
};
const mypageCoffecatDetailFilter = [
  MY_COFFECHAT_OPTIONS.TOTAL,
  MY_COFFECHAT_OPTIONS.RESERVED,
  MY_COFFECHAT_OPTIONS.UNRESERVED,
];

type ReservedState = {
  isReserved: false;
  itemInfo: { date: ''; time: ''; userName: ''; price: '' };
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
  //parents option list + order list
  const [reservedStateList, setReservedStateList] = useState<ReservedState[]>();
  //parents _id인 값을 filter해서 저장
  const [filteredOrders, setFilteredOrders] = useState<Order[]>();
  const [showOptionList, setShowOptionList] = useState(reservedStateList);
  const [selectedOption, setSelectedOption] = useState(MY_COFFECHAT_OPTIONS.TOTAL);

  useEffect(() => {
    const childOfParents = sellerOrdersData?.filter(
      orders => orders.products.filter(order => order.extra?.parent === parseInt(_id)).length > 0,
    );
    setFilteredOrders(childOfParents);
  }, [_id, sellerOrdersData]);

  useEffect(() => {
    //options는 예약 가능한 목록
    const options = parentsOrderData?.options;
    const optionsFormatList =
      options?.map(option => ({
        isReserved: false,
        itemInfo: {
          date: option.extra.datetime.date,
          time: option.extra.datetime.time,
          userName: '',
          price: option.price,
        },
      })) || [];

    //orders는 예약 된 목록(불가능한 목록)
    let ordersFormatList = new Array();
    filteredOrders?.map(order =>
      order.products.forEach(item => {
        ordersFormatList.push({ item: item, userName: order.address.name });
      }),
    );
    ordersFormatList = ordersFormatList.map((order: { item: OrderFormat; userName: string }) => ({
      isReserved: true,
      itemInfo: {
        date: order.item.extra.datetime.date,
        time: order.item.extra.datetime.time,
        userName: order.userName,
        price: order.item.price,
      },
    }));

    setReservedStateList([...optionsFormatList, ...ordersFormatList]);
    setShowOptionList([...optionsFormatList, ...ordersFormatList]);
  }, [filteredOrders, parentsOrderData]);

  useEffect(() => {
    //탭 선택 변경시 보여주는 데이터 변경
    if (selectedOption === MY_COFFECHAT_OPTIONS.TOTAL) {
      setShowOptionList(reservedStateList);
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.RESERVED) {
      setShowOptionList(reservedStateList?.filter(data => data.isReserved));
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.UNRESERVED) {
      setShowOptionList(reservedStateList?.filter(data => !data.isReserved));
    }
  }, [reservedStateList, selectedOption]);

  return (
    <>
      <section className="flex justify-between w-full">
        <p className="text-sm leading-8">
          전체 커피챗 수 <span className="text-light-main">{reservedStateList?.length}</span>
        </p>
        <FilterButtons options={mypageCoffecatDetailFilter} setPropsOption={setSelectedOption} />
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
