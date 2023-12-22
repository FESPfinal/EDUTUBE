'use client';

import { redirect } from 'next/navigation';
import useUserCartInfo from '@/stores/cart';
import useUserInfo from '@/stores/userInfo';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavLogoutModal = () => {
  const { deleteUserInfo } = useUserInfo(store => store);
  const { deleteUserCartCount } = useUserCartInfo(store => store);
  const router = useRouter();

  const handleLogout = () => {
    deleteUserInfo();
    deleteUserCartCount();
    Cookies.remove('refreshToken');
    Cookies.remove('userType');
    router.refresh();
    redirect('/');
  };

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <Link href="/mypage">
          <span
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            My Page
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavLogoutModal;
