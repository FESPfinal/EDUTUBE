import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="min-w-[350px]">
        <ReactQueryClient>{children}</ReactQueryClient>
      </div>
    </div>
  );
};

export default Layout;
