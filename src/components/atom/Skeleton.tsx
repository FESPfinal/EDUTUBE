'use client';
import { useTheme } from 'next-themes';

interface Props {
  width: string;
  height: string;
  round: number;
}

const Skeleton = ({ width, height, round }: Props) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div
      style={{ width: `${width}`, height: `${height}`, borderRadius: `${round}px` }}
      className={`
        ${currentTheme === 'dark' ? 'bg-dark-disabled' : 'bg-light-disabled'}`}
    ></div>
  );
};

export default Skeleton;
