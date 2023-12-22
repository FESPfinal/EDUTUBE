'use client';

import useUserInfo from '@/stores/userInfo';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// const userMenuList = [
//   { title: '찜', link: '/mypage/likes' },
//   { title: '장바구니', link: '/mypage/cart' },
//   { title: '진행할 커피챗 목록', link: '/mypage/reserved' },
//   { title: '내 구입 목록', link: '/mypage/purchase' },
//   { title: '내정보', link: '/mypage/info' },
// ];
const userMenuList = [
  { title: '장바구니', link: '/mypage/cart' },
  { title: '내 구입 목록', link: '/mypage/purchase' },
  { title: '내정보', link: '/mypage/info' },
];

// const sellerMenuList = [
//   { title: '찜', link: '/mypage/likes' },
//   { title: '장바구니', link: '/mypage/cart' },
//   { title: '진행할 커피챗 목록', link: '/mypage/reserved' },
//   { title: '내 구입 목록', link: '/mypage/purchase' },
//   { title: '내가 등록한 커피챗', link: '/mypage/my-coffeechat' },
//   { title: '내가 등록한 동영상', link: '/mypage/my-video' },
//   { title: '내정보', link: '/mypage/info' },
// ];

const sellerMenuList = [
  { title: '장바구니', link: '/mypage/cart' },
  { title: '내 구입 목록', link: '/mypage/purchase' },
  { title: '내가 등록한 커피챗', link: '/mypage/my-coffeechat' },
  { title: '내정보', link: '/mypage/info' },
];

const MypageMenu = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { userInfo } = useUserInfo(store => store);

  const menuList = userInfo?.type === 'seller' ? sellerMenuList : userMenuList;

  return (
    <div className="flex flex-col bg-white min-w-fit w-[200px] h-[calc(100vh-86px)] pt-5 shadow-[8px_0_10px_-5px_rgba(0,0,0,0.3)]">
      {isClient ? (
        <ul className="w-[200px]">
          {menuList.map(menu => {
            return (
              <li key={menu.link} className="mb-2 py-1 px-3 text-gray-600 hover:bg-gray-200 ">
                <Link href={menu.link}>
                  <span className="text-l">{menu.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default MypageMenu;
