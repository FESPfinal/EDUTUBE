import MypageMenu from '@/components/views/mypage/MypageMenu';
import ReactQueryClient from '@/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <MypageMenu />
      <ReactQueryClient>{children}</ReactQueryClient>
    </div>
  );
};

export default Layout;
