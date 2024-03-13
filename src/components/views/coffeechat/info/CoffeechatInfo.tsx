'use client';
import Avatar from '@/components/atom/Avatar';
import {
  default as CartButton,
  default as DeleteButton,
  default as PurchaseButton,
  default as UpdateButton,
} from '@/components/atom/Button';
import NextImage from '@/components/atom/NextImage';
import RatingSummary from '@/components/views/coffeechat/review/RatingSummary';
import ReplyItemCard from '@/components/views/coffeechat/review/ReplyItem';
import { IMAGE_ROUTE } from '@/helper/constants/commons';
import { formatDate, formatTime, isOverThanReserveTime } from '@/helper/utils/datetime';
import useDeleteCoffeechat from '@/queries/coffeechat/delete/useDeleteCoffeechat';
import useSelectCoffeechatInfo, {
  Options,
  ProductItem,
} from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useSelectReply from '@/queries/coffeechat/review/useSelectReply';
import useUserInfo from '@/stores/userInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  _id: string;
  initData: ProductItem;
}

const CoffeechatInfo = ({ _id, initData }: Props) => {
  const router = useRouter();
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { data: replyListData } = useSelectReply(_id);
  const { mutate: deleteCoffeechat } = useDeleteCoffeechat();
  const { userInfo } = useUserInfo(store => store);
  const [coffeechatList, setCoffeechatList] = useState<ProductItem | undefined>(initData);
  const [isReservationEnabled, setIsReservationEnabled] = useState(true);
  const replyCount = replyListData?.length || 0;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    };

    const links = document.querySelectorAll('.scroll-link');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  useEffect(() => {
    setIsReservationEnabled(
      coffeechatDetailData?.options?.item?.filter(item => item.buyQuantity === 0).length !== 0,
    );
    setCoffeechatList(coffeechatDetailData);
  }, [coffeechatDetailData]);

  const calculateAverageRating = () => {
    if (!replyListData || replyListData?.length === 0) {
      return 0; // 빈 배열이거나 없는 경우 평균 0으로 간주
    }
    const totalRating = replyListData?.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = totalRating / replyListData?.length;
    if (Number.isInteger(averageRating)) {
      return averageRating; // 소수점 없는 경우 자연수 반환
    } else {
      return parseFloat(averageRating.toFixed(1)); // 소수점 둘째 자리까지 보여주기
    }
  };

  const averageRating = calculateAverageRating() as number;

  const calculateRatingPercentages = () => {
    if (!replyListData || replyListData?.length === 0) {
      return {
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0,
      };
    }

    const ratingCounts = {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    };

    replyListData.forEach(item => {
      const { rating } = item;
      if (rating === 5) {
        ratingCounts.five += 1;
      } else if (rating === 4) {
        ratingCounts.four += 1;
      } else if (rating === 3) {
        ratingCounts.three += 1;
      } else if (rating === 2) {
        ratingCounts.two += 1;
      } else if (rating === 1) {
        ratingCounts.one += 1;
      }
    });

    const totalCount = replyListData.length;

    // 각 등급의 비율을 계산하여 percentList 객체 생성
    const percentList = {
      five: `${((ratingCounts.five / totalCount) * 100).toFixed(1)}`,
      four: `${((ratingCounts.four / totalCount) * 100).toFixed(1)}`,
      three: `${((ratingCounts.three / totalCount) * 100).toFixed(1)}`,
      two: `${((ratingCounts.two / totalCount) * 100).toFixed(1)}`,
      one: `${((ratingCounts.one / totalCount) * 100).toFixed(1)}`,
    };

    return percentList;
  };

  const ratingPercentages = calculateRatingPercentages();

  const onDeleteCoffeechat = () => {
    deleteCoffeechat(_id);
    alert('삭제되었습니다.');
    router.push(`/coffeechat`);
  };

  const isDisable = (item: Options) => {
    if (item.buyQuantity !== 0) {
      return true;
    }
    if (isOverThanReserveTime(item.extra.datetime.date, item.extra.datetime.time)) {
      return true;
    }
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 색션 1*/}
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        {/* 색션 1-1 */}
        <div className="md:w-2/3">
          <div className="w-full h-96 aspect-w-3 aspect-h-2">
            <NextImage
              src={`${coffeechatList?.mainImages[0]}`}
              alt={`${coffeechatList?.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* 색션 1-2 */}
        <div className="md:w-1/3 p-2 flex flex-col gap-3">
          <h1 className="text-2xl font-bold mb-2">{coffeechatList?.name}</h1>
          <div className="flex items-center gap-3 mb-2">
            <Avatar
              imageUrl={`${IMAGE_ROUTE}${coffeechatList?.extra.authorImage}`}
              size={'xsmall'}
            />
            <p className="text-md font-bold">{coffeechatList?.extra.author}</p>
          </div>
          <p className="mb-2"> {coffeechatList?.extra.intro}</p>
          <div className="flex items-center gap-3" style={{ marginTop: 'auto' }}>
            <p className="inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-light-main text-white">
              {coffeechatList?.extra?.jobCategory?.[0]}
            </p>
            <p className="inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-dark-main text-white">
              {coffeechatList?.extra.regionCategory}
            </p>
          </div>
        </div>
      </div>
      {/* 중간 색션 */}
      <div className="border-2 border-gray-200 p-2 mb-4 flex gap-12">
        <Link href="#content">내용</Link>
        <Link href="#schedule">일정</Link>
        <Link href="#place">장소</Link>
        <Link href="#content">후기</Link>
      </div>
      {/* 색션 2 */}
      <div className="flex flex-col md:flex-row gap-5 mb-12">
        {/* 색션 2-1 */}
        <div className="md:w-2/3 p-3 border-2 border-gray-200">
          <div id="content" className="mb-6">
            <p className="text-lg font-bold mb-2">내용</p>
            <p className="text-md mb-2">{coffeechatList?.content || ''}</p>
          </div>
          <div id="schedule" className="mb-6 ">
            <h3 className="text-lg font-bold mb-4">일정</h3>
            <div className="flex flex-wrap">
              {coffeechatList?.options?.item?.map((item, index) => (
                <p
                  key={index}
                  className={`mb-2 mr-2 rounded-lg p-2.5 w-36 text-center text-white ${
                    isDisable(item) ? 'bg-light-disabled text-gray-100' : 'bg-light-main'
                  }`}
                >
                  <p className=" mr-2">{formatDate(item.extra.datetime?.date)}</p>
                  <p>{formatTime(item.extra.datetime?.time)}</p>
                </p>
              ))}
            </div>
          </div>
          <div id="place" className="mb-6">
            <h3 className="text-lg font-bold mb-2">장소</h3>
            {coffeechatList?.extra.place === 'online' ? (
              <p className="mb-2">온라인 주소: {coffeechatList?.extra.online}</p>
            ) : (
              <p className="mb-2">오프라인 주소: {coffeechatList?.extra.offline}</p>
            )}
          </div>
          <div id="review" className="mb-6">
            <div className="flex gap-2">
              <h3 className="text-lg font-bold mb-2">수강생 후기</h3>
              <span className="text-lg font-medium text-light-main">{replyCount}개</span>
            </div>
            <p className="text-gray-700 text-sm">참여자들이 직접 작성한 후기입니다. </p>
            <RatingSummary
              averageRating={averageRating}
              replyCount={replyCount}
              ratingPercentages={ratingPercentages}
            />
            <div className="flex flex-col gap-1">
              {replyListData?.map((item, index) => (
                <ReplyItemCard
                  key={index}
                  rating={item.rating}
                  content={item.content}
                  userName={item.user.name}
                  createdAt={item.createdAt}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 색션 2-2 */}
        <div className="md:w-1/3 relative">
          <div className="bg-white border-2 border-solid border-gray-200 rounded-sm p-4 shadow-md sticky top-24 right-0 z-10">
            <div className="mb-2">
              <h1 className="text-lg font-bold mb-2">{coffeechatList?.name}</h1>
            </div>
            <div className="mb-4">
              <span className="text-md font-medium text-gray-500 mr-2">가격</span>
              <span className="text-lg font-bold ">{coffeechatList?.price}포인트</span>
            </div>
            <div className="space-y-4">
              {userInfo.type === 'seller' && coffeechatList?.seller_id === userInfo._id ? (
                <>
                  <UpdateButton
                    content="수정하기"
                    size="medium"
                    onClick={() => router.push(`/coffeechat/update/${_id}`)}
                  />
                  <DeleteButton
                    content="삭제하기"
                    size="medium"
                    onClick={() => onDeleteCoffeechat()}
                    color="bg-light-error"
                    darkColor="bg-dark-error"
                    hoverColor="hover:bg-red-700"
                  />
                </>
              ) : (
                <>
                  <CartButton
                    content={isReservationEnabled ? '장바구니' : '장바구니 담기 불가'}
                    size="medium"
                    onClick={() => {
                      router.push(`/coffeechat/info/${_id}/cart`);
                    }}
                    disabled={!isReservationEnabled}
                  />
                  <PurchaseButton
                    content={isReservationEnabled ? '예약하기' : '예약 불가'}
                    size="medium"
                    onClick={() => {
                      router.push(`/coffeechat/info/${_id}/reserve`);
                    }}
                    disabled={!isReservationEnabled}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoffeechatInfo;
