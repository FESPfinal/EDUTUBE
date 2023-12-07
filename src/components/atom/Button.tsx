'use client';
import { useTheme } from 'next-themes';
interface Props {
  content: string | number;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: string;
  darkColor?: string;
  hoverColor?: string;
  textColor?: string;
  size?: 'large' | 'medium' | 'small';
}
const sizes = {
  small: ' px-2 py-2 rounded-lg text-base w-content',
  medium: 'px-4 py-4 rounded-lg text-base min-h-12 w-full',
  large: 'px-5 py-5 rounded-lg text-lg min-h-14 min-w-24 w-full',
};
const Button = ({
  content,
  onClick,
  disabled = false,
  color = 'bg-light-main',
  darkColor = 'bg-light-main',
  textColor = 'text-white',
  size = 'large',
  hoverColor = 'hover:bg-dark-main',
}: Props) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  let sizeClass = sizes[size];
  return (
    <button
      className={`font-medium ${
        disabled == true ? `bg-light-disabled` : currentTheme === 'light' ? color : darkColor
      } ${textColor} ${sizeClass} ${hoverColor}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
export default Button;
