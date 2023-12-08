'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useUserInfo from '@/stores/userInfo';
import { IOrderDataType } from '@/helper/types/order';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useUpdateOrder from '@/queries/coffeechat/order/useUpdateOrder';
import { default as DeleteButton, default as PurchaseButton, default as UpdateButton } from '@/components/atom/Button';
import Avatar from "@/components/atom/Avatar";

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { mutate: mutateOrderCoffeechat } = useUpdateOrder();
  const { userInfo } = useUserInfo(store => store);

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
      onSuccess: () => {
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-5 border-2 border-solid border-indigo-500">
        <div className="md:w-1/2 mb-4 md:mr-4 border-2 border-solid border-blue-500">
          <Image
            src={`https://localhost:443/${coffeechatDetailData?.mainImages[0]}`}
            alt={coffeechatDetailData?.name}
            className="w-full h-auto"
            width={80}
            height={80}
            unoptimized={true}
          />
        </div>
        <div className="md:w-1/2 border-2 border-solid border-pink-500">
          <h1 className="text-2xl font-bold mb-2">{coffeechatDetailData?.name}</h1>
          <p className="text-md mb-2" dangerouslySetInnerHTML={{ __html: coffeechatDetailData?.content }} />
          <div className="flex items-center gap-3 mb-2">
            <Avatar imageUrl={`https://localhost:443/${coffeechatDetailData?.extra.authorImage}`} size={'xsmall'} />
            <p className="text-md font-bold">{coffeechatDetailData?.extra.author}</p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <p className="mb-2 inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-light-main text-white">{coffeechatDetailData?.extra.jobCategory[0]}</p>
            <p className="mb-2 inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-dark-main text-white">{coffeechatDetailData?.extra.regionCategory}</p>
          </div>
          <p className="mb-2">intro: {coffeechatDetailData?.extra.intro}</p>
          <h3 className="text-lg font-bold mb-2">커피챗 장소 및 시간 정보</h3>
          {coffeechatDetailData?.extra.place === 'online' ? <p className="mb-2">온라인 주소: {coffeechatDetailData?.extra.online}</p> : <p className="mb-2">오프라인 주소: {coffeechatDetailData?.extra.offline}</p>}
          {coffeechatDetailData?.extra.datetimeList.map((item: { date: Date, time: Date }, index: number) => (
            <div key={index}>
              <p className="mb-2">날짜: {JSON.stringify(item.date).slice(1, 11)}</p>
              <p className="mb-2">시간: {JSON.stringify(item.time).slice(12, 17)}</p>
            </div>
          ))}
          <div>
            <p className="text-lg font-bold">가격</p>
            <p>{coffeechatDetailData?.price} 포인트</p>
          </div>
          <div className="space-y-4">
            {userInfo.type === 'seller' && coffeechatDetailData?.seller_id === userInfo._id ? (
              <>
                <UpdateButton content="수정하기" size="medium" onClick={() => orderCoffeechat(parseInt(_id))} />
                <DeleteButton
                  content="삭제하기"
                  size="medium"
                  onClick={() => orderCoffeechat(parseInt(_id))}
                  color="bg-light-error"
                  darkColor="bg-dark-error"
                  hoverColor="hover:bg-red-700"
                />
              </>
            ) : (
              <PurchaseButton content="결제하기" size="medium" onClick={() => orderCoffeechat(parseInt(_id))} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoffeechatInfo;
