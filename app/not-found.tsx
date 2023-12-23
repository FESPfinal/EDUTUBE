'use client';

import Image from 'next/image';
import oops from '/public/images/oops.png';

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div>
          <Image src={oops} width={500} height={80} alt="oops!" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark-main sm:text-5xl">
          404 Page not found!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">페이지를 찾을 수 없습니다.</p>
      </div>
    </main>
  );
};
export default NotFound;
