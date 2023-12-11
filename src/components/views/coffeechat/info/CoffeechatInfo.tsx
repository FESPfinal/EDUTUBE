'use client';
import Avatar from "@/components/atom/Avatar";
import { default as DeleteButton, default as PurchaseButton, default as UpdateButton } from '@/components/atom/Button';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useUserInfo from '@/stores/userInfo';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { userInfo } = useUserInfo(store => store);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    };

    const links = document.querySelectorAll('.scroll-link');
    links.forEach((link) => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 색션 1*/}
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        {/* 색션 1-1 */}
        <div className="md:w-2/3">
          <div className="w-full h-96 aspect-w-3 aspect-h-2">
            <Image
              src={`https://localhost:443/${coffeechatDetailData?.mainImages[0]}`}
              alt={coffeechatDetailData?.name}
              className="w-full h-full object-cover"
              unoptimized={true}
              width={80}
              height={80}
            />
          </div>
        </div>
        {/* 색션 1-2 */}
        <div className="md:w-1/3 p-2 flex flex-col gap-3">
          <h1 className="text-2xl font-bold mb-2">{coffeechatDetailData?.name}</h1>
          <div className="flex items-center gap-3 mb-2">
            <Avatar imageUrl={`https://localhost:443/${coffeechatDetailData?.extra.authorImage}`} size={'xsmall'} />
            <p className="text-md font-bold">{coffeechatDetailData?.extra.author}</p>
          </div>
          <p className="mb-2"> {coffeechatDetailData?.extra.intro}</p>
          <div className="flex items-center gap-3" style={{ marginTop: 'auto' }}>
            <p className="inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-light-main text-white">{coffeechatDetailData?.extra.jobCategory[0]}</p>
            <p className="inline-block rounded-full px-2 py-1 text-sm font-medium tracking-wide border-solid border bg-dark-main text-white">{coffeechatDetailData?.extra.regionCategory}</p>
          </div>
        </div>
      </div>
      {/* 중간 색션 */}
      <div className="border-2 border-gray-200 p-2 mb-4 flex gap-12">
        <Link href="#content">
          내용
        </Link>
        <Link href="#schedule">
          일정
        </Link>
        <Link href="#place">
          장소
        </Link>
        <Link href="#content">
          후기
        </Link>
      </div>
      {/* 색션 2 */}
      <div className="flex flex-col md:flex-row gap-5 mb-12">
        {/* 색션 2-1 */}
        <div className="md:w-2/3 p-3 border-2 border-gray-200">
          <div id="content" className="mb-6">
            <h3 className="text-lg font-bold mb-2">내용</h3>
            <p className="text-md mb-2" dangerouslySetInnerHTML={{ __html: coffeechatDetailData?.content }} />
          </div>
          <div id="schedule" className="mb-6">
            <h3 className="text-lg font-bold mb-4">일정</h3>
            {coffeechatDetailData?.extra.datetimeList.map((item: { date: Date, time: Date }, index: number) => (
              <span key={index} className={`mb-2 mr-2  border-2 border-solid border-light-main rounded-lg p-2`}>
                <span className="text-gray-700 mr-2">{JSON.stringify(item.date).slice(1, 11)}</span>
                <span className="text-gray-400">{JSON.stringify(item.time).slice(12, 17)}</span>
              </span>
            ))}
          </div>
          <div id="place" className="mb-6">
            <h3 className="text-lg font-bold mb-2">장소</h3>
            {coffeechatDetailData?.extra.place === 'online' ? <p className="mb-2">온라인 주소: {coffeechatDetailData?.extra.online}</p> : <p className="mb-2">오프라인 주소: {coffeechatDetailData?.extra.offline}</p>}
          </div>
        </div>
        {/* 색션 2-2 */}
        <div className="md:w-1/3 relative">
          <div className="bg-white border-2 border-solid border-gray-200 rounded-sm p-4 shadow-md sticky top-12 right-0 z-10">
            <div className="mb-2">
              <h1 className="text-lg font-bold mb-2">{coffeechatDetailData?.name}</h1>
            </div>
            <div className="mb-4">
              <span className="text-md font-medium text-gray-500 mr-2">가격</span>
              <span className="text-lg font-bold ">{coffeechatDetailData?.price}포인트</span>
            </div>
            <div className="space-y-4">
              {userInfo.type === 'seller' && coffeechatDetailData?.seller_id === userInfo._id ? (
                <>
                  <UpdateButton content="수정하기" size="medium" onClick={() => alert('수정하기 구현해야함')} />
                  <DeleteButton
                    content="삭제하기"
                    size="medium"
                    onClick={() => alert('삭제하기 구현해야함')}
                    color="bg-light-error"
                    darkColor="bg-dark-error"
                    hoverColor="hover:bg-red-700"
                  />
                </>
              ) : (
                <>
                  {/* <PurchaseButton content="예약하기" size="medium" onClick={() => orderCoffeechat(parseInt(_id))} /> */}
                  <Link href={`/coffeechat/info/${_id}/reserve`}>
                    <p>클릭</p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default CoffeechatInfo;
