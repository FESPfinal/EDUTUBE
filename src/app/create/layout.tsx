const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <form>
      <h2>Create</h2>
      {children}
    </form>
  );
};

export default Layout;
