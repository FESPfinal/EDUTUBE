'use client';

import { useState } from 'react';
import NavLogoutModal from './NavLogoutModal';

const NavLogout = ({ name }: { name: string }) => {
  const [isShow, setIsShow] = useState(false);

  const handleMouseEnter = () => {
    setIsShow(true);
  };

  const handleMouseLeave = () => {
    setIsShow(false);
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            onMouseEnter={handleMouseEnter}
          >
            안녕하세요, {name}님!
          </button>
        </div>
        {isShow && (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLogoutModal />
          </div>
        )}
      </div>
    </>
  );
};

export default NavLogout;
