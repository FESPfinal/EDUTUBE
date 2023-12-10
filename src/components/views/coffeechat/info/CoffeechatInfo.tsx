'use client';
import useSelectCoffeechatInfo from '../../../../queries/coffeechat/info/useSelectCoffeechatInfo';
import useUpdateOrder from '../../../../queries/coffeechat/order/useUpdateOrder';
import PurchaseButton from '../../../atom/Button';
import UpdateButton from '../../../atom/Button';
import DeleteButton from '../../../atom/Button';
import { IOrderDataType } from '../../../../helper/types/order';
import { useRouter } from 'next/navigation';
import useSelectMemberInfo from '../../../../queries/member/useSelectMemberInfo';
import Cookies from 'js-cookie';
import Link from 'next/link';

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const user_id = Cookies.get('user_id');
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { data: memberTypeData } = useSelectMemberInfo('type');
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

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">이것은 커피챗디테일</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mr-4">
            <img
              src={`https://localhost:443/${coffeechatDetailData?.mainImages[0]}`}
              alt={coffeechatDetailData?.name}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-bold mb-2">{coffeechatDetailData?.name}</h3>
            {/* 상세설명 (노션에 dangerouslySetInnerHTML 설명 추가) */}
            <p
              className="text-md mb-2"
              dangerouslySetInnerHTML={{ __html: coffeechatDetailData?.content }}
            />
            <p className="mb-2">카테고리: {coffeechatDetailData?.extra.category}</p>
            <p className="mb-2">seller: {coffeechatDetailData?.seller_id}</p>
            <p className="mb-2">person: {coffeechatDetailData?.extra.person}</p>
            <p className="mb-2">userData: {coffeechatDetailData?.extra.userData}</p>
            <p className="mb-2">intro: {coffeechatDetailData?.extra.intro}</p>
            {/* 셀러 id로 셀러 정보 가져와서 프로필 이미지와 이름 정보 가져오기 */}
            <h3 className="text-lg font-bold mb-2">커피챗 장소 및 시간 정보</h3>
            <p className="mb-2">온라인: {coffeechatDetailData?.extra.online}</p>
            <p className="mb-2">오프라인: {coffeechatDetailData?.extra.offline}</p>
            <p className="mb-2">날짜: {coffeechatDetailData?.extra.date}</p>
            <p className="mb-2">시간: {coffeechatDetailData?.extra.time}</p>
            <div>
              <p className="text-lg font-bold">가격</p>
              <p>{coffeechatDetailData?.price} 포인트</p>
            </div>
            <div className="space-y-4">
              {memberTypeData?.type == 'seller' && coffeechatDetailData?.seller_id == user_id ? (
                <>
                  <UpdateButton
                    content="수정하기"
                    size="medium"
                    onClick={() => orderCoffeechat(parseInt(_id))}
                  />
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
                <>
                  {/* <PurchaseButton
                    content="결제하기"
                    size="medium"
                    onClick={() => orderCoffeechat(parseInt(_id))}
                  /> */}
                  <Link href={`/coffeechat/info/${_id}/reserve`}>
                    <PurchaseButton content="결제하기" size="medium" onClick={() => {}} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoffeechatInfo;
