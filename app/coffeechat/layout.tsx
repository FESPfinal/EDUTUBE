'use client';
import ReactQueryClient from '../../src/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2>Coffechat Layout</h2>
      <ReactQueryClient>{children}</ReactQueryClient>
    </>
  );
};

export default Layout;
