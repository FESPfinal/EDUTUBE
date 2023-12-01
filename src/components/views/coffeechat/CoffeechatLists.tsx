'use client';
import useSelectCoffeechatList from '../../../queries/coffeechat/useSelectCoffeechatList';
import Link from 'next/link';
import ad_first from '/public/images/ad_first.png';
import Image from 'next/image';

const CoffeechatLists = () => {
  const {
    data: coffeechatListData,
    isLoading: coffeechatListLoading,
    isError: coffeechatListIsError,
  } = useSelectCoffeechatList();

  if (coffeechatListLoading) return <></>;
  if (coffeechatListIsError) {
    return <div>Error: {coffeechatListIsError}</div>;
  }
  return (
    <>
      <div className="h-60 bg-black text-white">
        <Image src={ad_first} alt="광고사진" />
      </div>
      <div className="h-10"></div>
      <div className="h-10" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* TODO: any 수정 */}
        {coffeechatListData?.item.map((item: any) => (
          <li
            key={item._id}
            className="relative group bg-white p-4 rounded-lg shadow-md overflow-hidden transition duration-300 hover:opacity-80"
          >
            <Link href={`coffeechat/info/${item._id}`}>
              <img
                src={item.mainImages}
                alt="Coffee Image"
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <div className="text-lg font-bold mb-2">Title: {item.name}</div>
              <div className="text-gray-600 mb-2">Author: {item.seller_id}</div>
              <div className="text-gray-600">Category: {item.extra.category}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default CoffeechatLists;
