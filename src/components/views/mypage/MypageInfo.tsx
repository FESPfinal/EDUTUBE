'use client';

import useSelectMemberInfo from '@/queries/member/useSelectMemberInfo';
import MypageSellerInfo from './MypageSellerInfo';
import MypageUserInfo from './MypageUserInfo';

const MypageInfo = () => {
  const { data } = useSelectMemberInfo('type');
  const isUser = data?.type === 'user' ? true : false;
  return (
    <div className="m-5 ml-8">
      <p className="text-3xl my-10">내 정보</p>
      <section className="ml-10">{isUser ? <MypageUserInfo /> : <MypageSellerInfo />}</section>
    </div>
  );
};

export default MypageInfo;
