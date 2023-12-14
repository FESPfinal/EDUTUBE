'use client';
import useSelectCoffeechatList from '../../../queries/coffeechat/useSelectCoffeechatList';
import Link from 'next/link';
import ad_first from '/public/images/ad_first.png';
import Image from 'next/image';
import NextImage from '@/components/atom/NextImge';

const CoffeechatLists = () => {
  const { data: coffeechatListData } = useSelectCoffeechatList();

  return (
    <>
      <div className="h-60 bg-black text-white">
        <Image src={ad_first} alt="광고사진" />
      </div>
      <div className="h-10"></div>
      <div className="h-10" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {coffeechatListData?.map(item => (
          <li
            key={item._id}
            className="relative group bg-white p-4 rounded-lg shadow-md overflow-hidden transition duration-300 hover:opacity-80"
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
                판매자: {item.extra.author}
              </div>

              {/*
              TODO: init 데이터 수정후 주석 해제
              <div className="text-gray-600 mb-2 text-opacity-70 group-hover:text-opacity-100 transition duration-300">
                카테고리:{' '}
                {item?.extra?.category?.length > 1
                  ? `${item?.extra?.category[0]}` + ', ' + `${item?.extra?.category[1]}`
                  : item?.extra?.category[0]}
              </div> */}
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
