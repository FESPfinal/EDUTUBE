'use client';

import MainLogoWhiteBook from '/public/images/main-logo-book.svg';

const LoadingHome = () => {
  return (
    <div className="absolute inset-0 z-50 fixed w-full flex items-center justify-center h-screen bg-light-main">
      <MainLogoWhiteBook />
      <div className="w-max">
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
          EDUTUBE
        </h1>
      </div>
    </div>
  );
};

export default LoadingHome;
