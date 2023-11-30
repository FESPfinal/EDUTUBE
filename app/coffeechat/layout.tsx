'use client';
import ReactQueryClient from '../../src/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-indigo-600">
      <h2>Coffeechat Layout</h2>
      <ReactQueryClient>{children}</ReactQueryClient>
    </div>
  );
};

export default Layout;
