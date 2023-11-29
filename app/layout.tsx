import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';

export const metadata: Metadata = {
  title: 'EDUTUBE',
  description: '원하는 강의만 모아서 볼 수 있어요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
