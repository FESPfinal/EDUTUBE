'use client';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <form>
        <h2>Coffechat Layout</h2>
        {children}
      </form>
    </QueryClientProvider>
  );
};

export default Layout;
