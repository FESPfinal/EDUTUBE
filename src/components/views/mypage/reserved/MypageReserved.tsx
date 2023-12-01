'use client';

import Link from 'next/link';

const MypageReserved = () => {
  return (
    <>
      <p className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
        <Link href={'/coffeechat/regist'}>등록하기</Link>
      </p>
    </>
  );
};

export default MypageReserved;
