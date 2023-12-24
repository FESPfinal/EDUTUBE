'use client';

import { usePathname } from 'next/navigation';
import LoadingHome from './LoadingHome';

const Loading = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return <LoadingHome />;
  }
  return (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-light-main border-8 h-64 w-64"></div>
    </div>
  );
};

export default Loading;
