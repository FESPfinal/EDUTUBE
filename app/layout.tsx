import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';
import ReactQueryClient from '@/helper/utils/ReactQueryClient';
import Navbar from '@/components/block/navbar/Navbar';
import Footer from '@/components/views/footer/Footer';

export const metadata: Metadata = {
  title: 'EDUTUBE',
  description: '교육 영상을 원하는 카테고리별로 무료수강하고, 현직자와 커피챗을 진행해보세요!',
  openGraph: {
    images: ['/uploads/edutube.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <div>
          <ReactQueryClient>
            <Navbar />
          </ReactQueryClient>
          <div className="md:mx-8 lg:mx-16 pt-[83px]">
            <Provider>
              <ReactQueryClient>{children}</ReactQueryClient>
              <ReactQueryClient>{modal}</ReactQueryClient>
            </Provider>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
