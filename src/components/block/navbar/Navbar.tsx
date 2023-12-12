'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';
import MainLogoWhite from '/public/images/main-logo-white.svg';
import { useEffect, useState } from 'react';
import useUserInfo from '@/stores/userInfo';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { userInfo } = useUserInfo(store => store);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const isShow = pathname !== '/login' && pathname !== '/sign-up';

  return (
    isShow && (
      <>
        <nav className="flex items-center justify-between flex-wrap bg-light-main p-6">
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
                  <NavLogout name={userInfo?.name} />
                ) : (
                  <NavLogin />
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </nav>
      </>
    )
  );
};
export default Navbar;
