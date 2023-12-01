import ReactQueryClient from '../../src/helper/utils/ReactQueryClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <ReactQueryClient> {children}</ReactQueryClient>
    </form>
  );
};

export default Layout;
