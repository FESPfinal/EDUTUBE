'use client';
import Button from '@/components/atom/Button';
import useCreateCoffeechatCart from '@/queries/coffeechat/cart/useCreateCoffeechatCart';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const CoffeechatCartModal = () => {
  const router = useRouter();
  const params = useParams();
  const _id = params?._id as string;
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { mutate: mutateCartCoffeechat } = useCreateCoffeechatCart();
  const [selectedDatetimeId, setSelectedDatetimeId] = useState<number>();

  const handleDatetimeClick = (timeId: number) => {
    if (timeId === selectedDatetimeId) {
      setSelectedDatetimeId(undefined);
    } else {
      setSelectedDatetimeId(timeId);
    }
  };

  const cartCoffeechat = (_id: number) => {
    if (!selectedDatetimeId) {
      alert('예약 시간을 선택하세요.');
      return;
    }

    mutateCartCoffeechat(_id, {
      onSuccess: () => {
        alert(`장바구니에 상품을 담았습니다.`);
        router.back();
      },
      onError: error => {
        if (error.message == 'authToken is not defined') {
          alert(`로그인 이후에 결제가 가능합니다.`);
          router.push('/login');
        } else {
          alert(`장바구니에 상품 담기를 실패하셨습니다. ${error.message}`);
        }
      },
    });
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold ">장바구니 일정 선택하기</h3>
          <div onClick={() => router.back()} className="cursor-pointer text-light-main">
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-6 justify-center">
          {coffeechatDetailData?.options?.item?.map((item, index: number) => (
            <p
              key={index}
              className={` border-2 border-solid border-light-main rounded-lg p-2 cursor-pointer hover:bg-light-main minWidth-44  flex   ${item._id === selectedDatetimeId ? 'bg-light-main' : 'hover:bg-gray-200'
                }`}
              onClick={() => handleDatetimeClick(item._id)}
            >
              <p
                className={`text-gray-700 leading-6 mr-2 ${item._id === selectedDatetimeId ? 'text-white' : ''
                  }`}
              >
                {JSON.stringify(item.extra.datetime.date).slice(1, 11)}&nbsp;/
              </p>
              <p
                className={`text-gray-700 leading-6 ${item._id === selectedDatetimeId ? 'text-white' : ''
                  }`}
              >
                {JSON.stringify(item.extra.datetime.time).slice(12, 17)}
              </p>
            </p>
          ))}
        </div>
        <Button
          content="장바구니"
          size="medium"
          onClick={() => selectedDatetimeId && cartCoffeechat(selectedDatetimeId)}
          disabled={selectedDatetimeId === undefined}
        />
      </div>
    </>
  );
};
export default CoffeechatCartModal;
