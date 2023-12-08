'use client';

import FilterButtons from '@/components/atom/FilterButtons';
import { useEffect, useState } from 'react';

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

const mockup = [
  {
    _id: 1,
    date: '2023/10/22',
    time: '10:00',
    name: '미노이',
    qna: 'contentscontentscontentscontentscontentscontent',
    point: 1000,
    isSoldOut: true,
  },
  {
    _id: 2,
    date: '2023/11/02',
    time: '11:00',
    name: '',
    qna: '',
    point: 1000,
    isSoldOut: false,
  },
  {
    _id: 3,
    date: '2023/11/09',
    time: '10:00',
    name: '지락',
    qna: 'contentscontentscontentscontentscontentscontents',
    point: 1000,
    isSoldOut: true,
  },
];

const MyCoffeechatDetailBody = () => {
  const [selectedOption, setSelectedOption] = useState(MY_COFFECHAT_OPTIONS.TOTAL);
  const [data, setData] = useState(mockup);

  useEffect(() => {
    if (selectedOption === MY_COFFECHAT_OPTIONS.TOTAL) {
      return setData(mockup);
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.RESERVED) {
      const filteredData = mockup.filter(item => item.isSoldOut);
      return setData(filteredData);
    }
    if (selectedOption === MY_COFFECHAT_OPTIONS.UNRESERVED) {
      const filteredData = mockup.filter(item => !item.isSoldOut);
      return setData(filteredData);
    }
  }, [selectedOption]);

  return (
    <>
      <section className="flex justify-between w-full">
        <p className="text-sm leading-8">
          전체 커피챗 수 <span className="text-light-main">2</span>
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
                      className={`w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}
                    >
                      예약일
                    </th>
                    <th
                      scope="col"
                      className="w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      예약 시간
                    </th>
                    <th
                      scope="col"
                      className="w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      예약자 명
                    </th>
                    <th
                      scope="col"
                      className="w-60 px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Q&A
                    </th>
                    <th
                      scope="col"
                      className="w-[10%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      POINT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 w-full">
                  {data.map(item => (
                    <tr key={item._id} className="w-full">
                      <td
                        className={`${
                          item.isSoldOut ? 'text-light-main' : ''
                        } px-4 py-4 whitespace-nowrap`}
                      >
                        {item.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{item.time}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-4 py-4 w-60 truncate">
                        {/* 모달로 상세 내용 보여주기 */}
                        <p className="xs:max-w-[5%] sm:max-w-[10%] md:max-w-[30%] lg:max-w-[60%] truncate">
                          {item.qna}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{item.point}</td>
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
