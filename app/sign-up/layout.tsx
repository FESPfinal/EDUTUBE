import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-[400px]">
        <ReactQueryClient>{children}</ReactQueryClient>
      </div>
    </div>
  );
};

export default Layout;
