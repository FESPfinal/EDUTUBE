import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className=" ml-8 w-full">
        <p className="text-3xl my-10">장바구니</p>
        <ReactQueryClient>{children}</ReactQueryClient>
      </div>
    </div>
  );
};

export default Layout;
