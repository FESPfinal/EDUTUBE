const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <h2>Mypage Layout</h2>
      {children}
    </form>
  );
};

export default Layout;
