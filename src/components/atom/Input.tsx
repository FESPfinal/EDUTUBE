'use client';
import { useTheme } from 'next-themes';


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
}: InputType) => {
  //? darkmode 이렇게 하면 되는지

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  let errorState = isError;

  return (
    <>
      <label className='block'>{label}
      <input
        className={
          `
          border border-solid ${currentTheme === 'dark' ? darkborders[border] : lightborders[border]} 
          ${errorState ? (currentTheme === 'dark' ? 'border-dark-error' : 'border-light-error') : ''} 
          rounded 
          focus:outline-none 
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

interface InputType {
  border: string;
  type: string;
  placeholder: string;
  helperTxt: string | number;
  isError: boolean;
  label: string;
}

export default Input;