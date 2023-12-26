'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import lightLogo from '../../../public/lightLogo.svg';
import darkLogo from '../../../public/DarkLogo.svg'

const Inquire = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <button className='relative w-44 h-20' onClick={handleClick}>
      {toggle ? (
        <div
          className={`
            w-20
            h-20
            ${currentTheme === 'dark' ? 'bg-white' : 'bg-light-main'}
            rounded-full
            absolute
            top-0
            right-0
          `}
        >
          <FontAwesomeIcon
            icon={faTimes}
            style={{
              fontSize: '50px',
              //#09CF83 수정예정 계속 오류 발생함
              color: currentTheme === 'dark' ? '#09CF83' : 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <div
          className={`
            w-44
            h-20
            bg-transparent
            border
            border-solid
            ${currentTheme === 'dark' ? 'border-white' : 'border-light-main'}
            rounded-full
            box-border
            flex
            flex-col
            justify-center
          `}>
          <p className={`
          text-left 
          pl-5 
          ${currentTheme === 'dark' ? 'text-white' : 'text-light-main'}`}>
            문의하기
          </p>
          <Image
            src={currentTheme === 'dark' ? darkLogo : lightLogo}
            alt='로고'
            style={{
              height: '80px',
              position: 'absolute',
              top: '0',
              right: '0',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}
    </button>
  );
};

export default Inquire;
