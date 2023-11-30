'use client';
import useSelectCoffeechatList from '../../../queries/coffeechat/useSelectCoffeechatList';
import Link from 'next/link';

const CoffeechatLists = () => {
  const {
    data: coffeechatListData,
    loading: coffeechatListLoading,
    isError: coffeechatListIsError,
  } = useSelectCoffeechatList();

  if (coffeechatListLoading) return <></>;
  if (coffeechatListIsError) {
    return <div>Error: {coffeechatListIsError.message}</div>;
  }
  return (
    <>
      <div className="h-60 bg-black text-white">광고중</div>
      <div className="h-10"></div>
      <h1 className="text-xl font-bold mb-4 text-center">커피챗 전체 보기</h1>
      <div className="h-10" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {coffeechatListData?.item.map(item => (
          <li key={item._id} className="bg-white p-4 rounded-lg shadow-md">
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
