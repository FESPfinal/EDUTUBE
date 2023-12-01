'use client';

import useSelectMemberInfo from '@/queries/member/useSelectMemberInfo';
import Link from 'next/link';

const userMenuList = [
  { title: '찜', link: '/mypage/likes' },
  { title: '장바구니', link: '/mypage/cart' },
  { title: '진행할 커피챗 목록', link: '/mypage/reserved' },
  { title: '내 구입 목록(전체)', link: '/mypage/purchases' },
  { title: '내정보', link: '/mypage/info' },
];

const sellerMenuList = [
  { title: '찜', link: '/mypage/likes' },
  { title: '장바구니', link: '/mypage/cart' },
  { title: '진행할 커피챗 목록', link: '/mypage/reserved' },
  { title: '내 구입 목록(전체)', link: '/mypage/purchases' },
  { title: '내가 등록한 커피챗', link: '/mypage/my-coffeechat' },
  { title: '내가 등록한 동영상', link: '/mypage/my-video' },
  { title: '내정보', link: '/mypage/info' },
];

const MypageMenu = () => {
  const { data: memberType } = useSelectMemberInfo('type');
  const userType = memberType?.type;

  const menuList = userType === 'seller' ? sellerMenuList : userMenuList;

  return (
    <div className="flex flex-col bg-white w-80 h-screen pt-5 shadow-[8px_0_10px_-5px_rgba(0,0,0,0.3)]">
      <ul>
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
    </div>
  );
};

export default MypageMenu;
