'use client';

import { usePathname } from 'next/navigation';
import LoadingHome from './LoadingHome';
import LoadingDefault from './LoadingDefault';

const Loading = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return <LoadingHome />;
  }
  return <LoadingDefault />;
};

export default Loading;
