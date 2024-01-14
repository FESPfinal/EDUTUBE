'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const H3 = ({ children }: Props) => {
  return <p className="font-bold text-lg text-gray-700">{children}</p>;
};

export default H3;
