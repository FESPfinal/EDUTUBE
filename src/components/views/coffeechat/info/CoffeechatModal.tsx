'use client'
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { IOrderDataType } from '@/helper/types/order';
import useUpdateOrder from '@/queries/coffeechat/order/useUpdateOrder';
import Button from '@/components/atom/button';

const CoffeechatModal = () => {
  const router = useRouter();
  const params = useParams();
  const _id = params?._id;
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { mutate: mutateOrderCoffeechat } = useUpdateOrder();
  const [selectedDatetimeId, setSelectedDatetimeId] = useState<number>();

  const reserveCoffeechat = (_id: number) => {
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
      onSuccess: () => {
        alert(`주문이 완료되었습니다.`);
        router.back();
        // TODO: 장바구니로 갈지 현재 페이지에 머무를지 확인하는 모달
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

  return (
    <>
      <div className="bg-white">
        <span onClick={() => router.back()}>Close modal</span>
        <p>예약 페이지</p>
        <h3 className="text-lg font-bold mb-4">일정</h3>
        {/* TODO: item type 설정하기 */}
        {coffeechatDetailData?.options.map((item: any, index: number) => (
          <span key={index} className={`mb-2 mr-2  border-2 border-solid border-light-main rounded-lg p-2`}>
            <span className="text-gray-700 mr-2" onClick={() => { setSelectedDatetimeId(item._id) }}>{JSON.stringify(item.extra.datetime.date).slice(1, 11)}</span>
            <span className="text-gray-400" onClick={() => { setSelectedDatetimeId(item._id) }}>{JSON.stringify(item.extra.datetime.time).slice(12, 17)}</span>
          </span>
        ))}
        <Button content="예약하기" size="small" onClick={() => reserveCoffeechat(selectedDatetimeId)} />
      </div>
    </>
  )
}
export default CoffeechatModal;