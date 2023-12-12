'use client';

import useUserInfo from '@/stores/userInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';
import MainLogoWhite from '/public/images/main-logo-white.svg';

const Navbar = () => {
  const { userInfo } = useUserInfo(store => store);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const isShow = pathname !== '/login' && pathname !== '/sign-up';

  return (
    isShow && (
      <div>
        <nav className="z-50 fixed w-full flex items-center justify-between flex-wrap bg-light-main p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div className="font-semibold text-xl tracking-tight">
              <Link href="/">
                <MainLogoWhite />
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div className="font-semibold text-xl tracking-tight">
              {isClient ? (
                !!userInfo._id ? (
                  <div className="flex gap-3 items-center">
                    <Link href={'/mypage/my-coffeechat'}>
                      <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
                    </Link>
                    <NavLogout name={userInfo?.name} />
                  </div>
                ) : (
                  <NavLogin />
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  );
};
export default Navbar;
