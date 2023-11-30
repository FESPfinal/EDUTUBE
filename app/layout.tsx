import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';
import ReactQueryClient from '@/helper/utils/ReactQueryClient';
import Navbar from '@/components/block/navbar/Navbar';

export const metadata: Metadata = {
  title: 'EDUTUBE',
  description: '원하는 강의만 모아서 볼 수 있어요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <div className="border border-indigo-600">
          <Navbar />
          <div className="border border-indigo-600 mx-40">
            <Provider>
              <ReactQueryClient>{children}</ReactQueryClient>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
