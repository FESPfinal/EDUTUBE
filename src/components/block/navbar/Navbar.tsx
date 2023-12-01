'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';
import MainLogoWhite from '/public/images/main-logo-white.svg';

const Navbar = () => {
  const pathname = usePathname();
  const token = Cookies.get('refreshToken');

  return (
    pathname !== '/login' &&
    pathname !== '/sign-up' && (
      <>
        <nav className="flex items-center justify-between flex-wrap bg-light-main p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">
              <Link href="/">
                <MainLogoWhite />
              </Link>
            </span>
          </div>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">
              {!!token ? <NavLogout /> : <NavLogin />}
            </span>
          </div>
        </nav>
      </>
    )
  );
};
export default Navbar;
