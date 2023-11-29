'use client';
import useSelectCoffeechatInfo from '../../../../queries/coffeechat/info/useSelectCoffeechatInfo';
import Link from 'next/link';

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const {
    data: coffeechatDetailData,
    loading: coffeechatDetailLoading,
    isError: coffeechatDetailIsError,
  } = useSelectCoffeechatInfo(_id);

  if (coffeechatDetailLoading) return <></>;
  if (coffeechatDetailIsError) {
    return <div>Error: {coffeechatDetailIsError.message}</div>;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">이것은 커피챗디테일</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mr-4">
            <img
              src={coffeechatDetailData?.item.mainImages[0]}
              alt={coffeechatDetailData?.item.name}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-bold mb-2">{coffeechatDetailData?.item.name}</h3>
            <p className="mb-2">{coffeechatDetailData?.item.seller_id}</p>
            {/* 셀러 id로 셀러 정보 가져와서 프로필 이미지와 이름 정보 가져오기 */}
            <p className="mb-2">{coffeechatDetailData?.item.extra.category}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-lg font-bold">후기</p>
            {/* 후기 내용 표시 */}
          </div>
          <div>
            <p className="text-lg font-bold">가격</p>
            <p>{coffeechatDetailData?.item.price} 포인트</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeechatInfo;
