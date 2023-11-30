'use client';

import Link from 'next/link';

const NavLogin = () => {
  return (
    <Link href="/login">
      <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Login
      </span>
    </Link>
  );
};

export default NavLogin;
