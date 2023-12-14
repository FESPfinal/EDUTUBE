'use client';

import Link from 'next/link';

const NavLogin = () => {
  return (
    <Link href="/login">
      <div
        className="font-bold inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm text-light-main hover:bg-gray-50 focus:outline-none"
        id="options-menu"
        aria-haspopup="true"
      >
        LOGIN
      </div>
    </Link>
  );
};

export default NavLogin;
