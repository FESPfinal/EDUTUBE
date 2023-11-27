'use client';
import { useTheme } from 'next-themes';

interface Props {
  border: string;
  type: string;
  placeholder: string;
  helperTxt: string | number;
  isError: boolean;
  label: string;
}

const lightborders: Record<string, string> = {
  default: 'border-light-disabled',
  active: 'border-light-main'
};

const darkborders: Record<string, string> = {
  default: 'border-dark-disabled',
  active: 'border-dark-main'
};

const Input = ({
  border = 'default', 
  type,
  placeholder,
  helperTxt,
  isError,
  label
}: Props) => {

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  let errorState = isError;

  return (
    <>
      <label className='block'>{label}
      <input
        className={
          `
          w-full
          border border-solid ${currentTheme === 'dark' ? darkborders[border] : lightborders[border]} 
          ${errorState ? (currentTheme === 'dark' ? 'border-dark-error' : 'border-light-error') : ''} 
          rounded 
          focus:shadow-2xl duration-500 outline-dark-main
          px-3 py-4 
          block
          `}
        type={type}
        placeholder={placeholder}
      />
      </label>
      {errorState && (
        <strong className={currentTheme === 'dark' ? 'text-dark-error' : 'text-light-error'}>
          {helperTxt}
        </strong>
      )}
    </>
  );
};

export default Input;
