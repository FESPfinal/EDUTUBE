'use client';

import MainLogoWhiteBook from '/public/images/main-logo-book.svg';

const LoadingHome = () => {
  return (
    <div className="z-50 fixed w-full flex items-center justify-center h-screen bg-light-main">
      <MainLogoWhiteBook />
      <h1 className="text-4xl font-bold text-white">EDUTUBE</h1>
    </div>
  );
};

export default LoadingHome;
