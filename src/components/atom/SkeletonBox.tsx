'use client';
import { useTheme } from 'next-themes';
import MainLogoWhiteBook from '/public/images/main-logo-book.svg';

interface Props {
  width: string;
  height: string;
  round: number;
}

const SkeletonBox = ({ width, height, round }: Props) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div
      style={{ width: `${width}`, height: `${height}`, borderRadius: `${round}px` }}
      className={`flex justify-center flex-col items-center
        ${currentTheme === 'dark' ? 'bg-dark-disabled' : 'bg-light-disabled'}`}
    >
      <MainLogoWhiteBook />
    </div>
  );
};

export default SkeletonBox;
