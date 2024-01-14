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
import useUserCartInfo from '@/stores/cart';

const Navbar = () => {
  const { userInfo } = useUserInfo(store => store);
  const { userCartCount } = useUserCartInfo(store => store);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isShow = pathname !== '/login' && pathname !== '/sign-up';
  const isCoffeechat = pathname.match(/\/coffeechat/);

  return (
    isShow && (
      <div>
        <nav className="z-40 fixed w-full flex items-center justify-between flex-wrap bg-light-main p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div className="font-semibold text-xl tracking-tight">
              <Link href="/">
                <MainLogoWhite />
              </Link>
            </div>
          </div>
          <div className="flex gap-6 text-white text-xl">
            <Link href={'/'}>
              <div
                className={
                  !isCoffeechat ? 'p-2  font-semibold underline underline-offset-8' : 'p-2'
                }
              >
                <span>커리큘럼 동영상</span>
              </div>
            </Link>
            <Link href={'/coffeechat'}>
              <div
                className={isCoffeechat ? 'p-2 font-semibold underline  underline-offset-8' : 'p-2'}
              >
                <span>커피챗</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div className="font-semibold text-xl tracking-tight">
              {isClient ? (
                !!userInfo._id ? (
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <Link href={'/mypage/cart'}>
                        <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
                      </Link>
                      {userCartCount > 0 && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                          {userCartCount}
                        </span>
                      )}
                    </div>
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
