const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <h2>Video Layout</h2>
      {children}
    </form>
  );
};

export default Layout;
