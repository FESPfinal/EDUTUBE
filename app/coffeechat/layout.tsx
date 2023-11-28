'use client';
import ReactQueryClient from '../../src/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <h2>Coffechat Layout</h2>
      <ReactQueryClient>{children}</ReactQueryClient>
    </form>
  );
};

export default Layout;
