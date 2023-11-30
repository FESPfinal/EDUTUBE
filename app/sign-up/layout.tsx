import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReactQueryClient>{children}</ReactQueryClient>
    </>
  );
};

export default Layout;
