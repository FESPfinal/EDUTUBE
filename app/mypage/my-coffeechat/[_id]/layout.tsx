import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <ReactQueryClient>{children}</ReactQueryClient>
    </div>
  );
};

export default Layout;
