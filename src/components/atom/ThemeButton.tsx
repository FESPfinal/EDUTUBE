'use client';
import { useTheme } from 'next-themes';

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      <button
        className="bg-pink-100 dark:bg-white flex items-center transition duration-300 focus:outline-none shadow"
        onClick={() => {
          setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        }}
      >
        {currentTheme === 'dark' ? <div>...다크모드 버튼</div> : <div>...라이트모드 버튼</div>}
      </button>
    </div>
  );
};

export default ThemeButton;
