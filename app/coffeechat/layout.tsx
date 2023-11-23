const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <h2>Coffechat Layout</h2>
      {children}
    </form>
  );
};

export default Layout;
