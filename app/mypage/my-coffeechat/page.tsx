import MypageMyCoffeechat from '@/components/views/mypage/myCoffechat/MypageMyCoffeechat';
import Link from 'next/link';

const MypageMyCoffeechatPage = () => {
  return (
    <>
      <div className=" ml-8 w-full">
        <p className="text-3xl my-10">내 커피챗</p>
        <MypageMyCoffeechat />
      </div>
    </>
  );
};
export default MypageMyCoffeechatPage;
