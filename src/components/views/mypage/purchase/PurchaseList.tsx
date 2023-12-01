'use client';
import useSelectOrder from '../../../../queries/coffeechat/order/useSelectOrder';

const PurchaseList = () => {
  const { data: purchaseListData } = useSelectOrder();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">커피챗 구매 목록 리스트</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {purchaseListData?.item.map(item => (
          <li key={item._id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={item.products[0].image}
              alt={item.products[0].name}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <p className="text-lg font-bold mb-2">제목: {item.products[0].name}</p>
            <p className="mb-2">가격: {item.products[0].price}원</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PurchaseList;
