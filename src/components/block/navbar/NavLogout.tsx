'use client';

import { useState } from 'react';
import NavLogoutModal from './NavLogoutModal';

const NavLogout = ({ name }: { name: string }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="relative inline-block text-left" onClick={() => setIsShow(isShow => !isShow)}>
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
          >
            안녕하세요, {name}님!
          </button>
        </div>
        {isShow && <NavLogoutModal />}
      </div>
    </>
  );
};

export default NavLogout;
