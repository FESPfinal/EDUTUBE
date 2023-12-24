'use client';
import { CoffeechatList } from '@/queries/coffeechat/useSelectCoffeechatList';
import Link from 'next/link';
import banner from '/public/images/banner.png';
import Image from 'next/image';
import NextImage from '@/components/atom/NextImage';

interface Props {
  initData: CoffeechatList;
}

const CoffeechatLists = ({ initData }: Props) => {
  return (
    <>
      <div>
        <Image className="bg-cover w-full" src={banner} alt="광고사진" />
      </div>
      <div className="h-10"></div>
      <div className="h-10" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initData?.map(item => (
          <li
            key={item._id}
            className="relative group bg-white p-4 rounded-lg shadow-md overflow-hidden scrollbar-hide transition duration-300 hover:opacity-80"
          >
            <Link href={`coffeechat/info/${item._id}`}>
              <NextImage
                src={item.mainImages[0]}
                alt="Coffee Image"
                className="w-full h-32 object-cover mb-4 rounded-md transform group-hover:scale-105 transition duration-300"
              />
              <div className="text-lg font-bold mb-2 text-opacity-90 group-hover:text-opacity-100 transition duration-300 text-black">
                제목: {item.name}
              </div>
              <div className="text-gray-600 mb-2 text-opacity-70 group-hover:text-opacity-100 transition duration-300">
                바리스타: {item.extra.author}
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="min-w-fit text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
                  {item?.extra?.jobCategory?.[0] && item?.extra?.jobCategory[0]}
                </div>
                <div className="min-w-fit text-xs font-semibold bg-white text-light-main border border-light-main solid  w-fit px-2 py-1 rounded-xl">
                  {item?.extra?.place}
                </div>
                {item.extra.place === 'offline' && (
                  <div className="min-w-fit text-xs font-semibold bg-dark-main text-white w-fit px-2 py-1 rounded-xl">
                    {item?.extra?.offline}
                  </div>
                )}
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-0 bg-black text-white p-4 transition duration-300 group-hover:opacity-90">
                <p className="text-lg font-bold mb-2">상세보기</p>
                <p className="mb-2">intro: {item?.extra.intro}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default CoffeechatLists;
