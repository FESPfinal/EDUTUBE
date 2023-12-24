'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isShow = pathname === '/';

  return (
    isShow && (
      <footer className="bg-gray-800 text-white py-5 mt-5">
        <div className="container mx-auto flex flex-col justify-center items-center">
          <nav>
            <Link href={'https://velog.io/@edutube/posts'} target="_blank">
              Blog
            </Link>{' '}
            |&nbsp;
            <Link href={'https://github.com/FESPfinal/EDUTUBE'} target="_blank">
              Github
            </Link>
          </nav>

          <br />
          <span>개발자: 조민경, 전서희, 우경석</span>
          <br />
          <span> &copy; 2023, EDUTUBE All Rights Reserved.</span>
          <br />
        </div>
      </footer>
    )
  );
};

export default Footer;
