'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface Props {
  title: string;
  state: string
}

const lightStepper: Record<string, string> = {
  default: 'bg-light-disabled',
  error: 'bg-light-error',
  active: 'bg-light-main',
};

const darkStepper: Record<string, string> = {
  default: 'bg-dark-disabled',
  error: 'bg-dark-error',
  active: 'bg-dark-main',
};

const Stepper = ({ title, state='default' }: Props) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <Link href="#">
        <span className={`
        inline-block 
        w-3.5 h-3.5 
        mr-5 
        rounded-full 
        ${currentTheme === 'dark' ? darkStepper[state] : lightStepper[state]} 
        `}></span>
        {title}
      </Link>
    </>
  );
};

export default Stepper;
