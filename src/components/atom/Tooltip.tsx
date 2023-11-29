'use client';

import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  content: string;
}

const Tooltip = ({ children, content }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="text-sm font-medium absolute z-10 w-32 p-2 bg-gray-200 text-black shadow-md rounded">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
