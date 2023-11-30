'use client';
import useSelectCoffeechatInfo from '../../../../queries/coffeechat/info/useSelectCoffeechatInfo';
import useUpdateOrder from '../../../../queries/coffeechat/order/useUpdateOrder';
import Button from '../../../atom/Button';
import { IOrderDataType } from '../../../../helper/types/order';
import { useRouter } from 'next/navigation';

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const {
    data: coffeechatDetailData,
    loading: coffeechatDetailLoading,
    isError: coffeechatDetailIsError,
  } = useSelectCoffeechatInfo(_id);

  const { mutate: mutateOrderCoffeechat } = useUpdateOrder();

  const orderCoffeechat = (_id: number) => {
    const product: IOrderDataType = {
      products: [
        {
          _id: _id,
          quantity: 1,
        },
      ],
      address: {
        name: '',
        value: '',
      },
    };

    mutateOrderCoffeechat(product, {
      onSuccess: data => {
        alert(`주문이 완료되었습니다.`);
        router.push('/mypage/purchase');
      },
      onError: error => {
        if (error.message == 'authToken is not defined') {
          alert(`로그인 이후에 결제가 가능합니다.`);
          router.push('/login');
        } else {
          alert(`주문에 실패하셨습니다. ${error.message}`);
        }
      },
    });
  };

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
            {/* 상세설명 (노션에 dangerouslySetInnerHTML 설명 추가) */}
            <p
              className="text-md mb-2"
              dangerouslySetInnerHTML={{ __html: coffeechatDetailData?.item.content }}
            />
            <p className="mb-2">카테고리: {coffeechatDetailData?.item.extra.category}</p>
            <p className="mb-2">seller: {coffeechatDetailData?.item.seller_id}</p>
            <p className="mb-2">person: {coffeechatDetailData?.item.extra.person}</p>
            <p className="mb-2">userData: {coffeechatDetailData?.item.extra.userData}</p>
            <p className="mb-2">intro: {coffeechatDetailData?.item.extra.intro}</p>
            {/* 셀러 id로 셀러 정보 가져와서 프로필 이미지와 이름 정보 가져오기 */}
            <h3 className="text-lg font-bold mb-2">커피챗 장소 및 시간 정보</h3>
            <p className="mb-2">온라인: {coffeechatDetailData?.item.extra.online}</p>
            <p className="mb-2">오프라인: {coffeechatDetailData?.item.extra.offline}</p>
            <p className="mb-2">날짜: {coffeechatDetailData?.item.extra.date}</p>
            <p className="mb-2">시간: {coffeechatDetailData?.item.extra.time}</p>
            <Button
              content="결제하기"
              size="medium"
              onClick={() => orderCoffeechat(parseInt(_id))}
            />
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
