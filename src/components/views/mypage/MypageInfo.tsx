'use client';

import MypageSellerInfo from './MypageSellerInfo';
import MypageUserInfo from './MypageUserInfo';
import useUserInfo from '@/stores/userInfo';

const MypageInfo = () => {
  const { userInfo } = useUserInfo(store => store);
  const isUser = userInfo.type === 'user' ? true : false;
  return (
    <div className="m-5 ml-8 mb-0">
      <p className="text-3xl my-10">내 정보</p>
      <section className="ml-10 overflow-y-auto max-h-[calc(100vh-235px)] scrollbar-hide">
        {isUser ? <MypageUserInfo /> : <MypageSellerInfo />}
      </section>
    </div>
  );
};

export default MypageInfo;
