'use client';
import useSelectCoffeechatList from '../../../queries/coffeechat/useSelectCoffeechatList';

const CoffeechatLists = () => {
  const {
    커피챗리스트데이터,
    커피챗리스트데이터Loading,
    커피챗리스트에러여부,
  } = useSelectCoffeechatList();

  if (커피챗리스트데이터Loading) return <></>;
  if (커피챗리스트에러여부) {
    return <div>Error: {커피챗리스트에러여부.message}</div>;
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">이것은 커피챗 리스트</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {커피챗리스트데이터?.item.map(item => (
          <li key={item._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.mainImages}
              alt="Coffee Image"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <div className="text-lg font-bold mb-2">Title: {item.name}</div>
            <div className="text-gray-600 mb-2">Author: {item.seller_id}</div>
            <div className="text-gray-600">Category: {item.extra.category}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default CoffeechatLists;
