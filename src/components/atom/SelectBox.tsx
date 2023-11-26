'use client';
import { useTheme } from 'next-themes';

interface Props {
  border: string;
  labelTitle: string;
  isError: boolean;
  helperTxt: string;
}

const jobSelect = [
  {id: 'select', title: '직무를 선택해주세요'},
  {id: 1, title: '프론트 엔드'},
  {id: 2, title: '백 엔드'},
  {id: 3, title: '디자이너'},
  {id: 4, title: '기획자'}
];

const locSelect = [
  {id: 'select', title: '지역을 선택해주세요'},
  {id: 1, title: '서울'},
  {id: 2, title: '대전'},
  {id: 3, title: '대구'},
  {id: 4, title: '부산'},
  {id: 5, title: '인천'},
  {id: 6, title: '광주'},
  {id: 7, title: '울산'}
];

const lightborders: Record<string, string> = {
  default: 'border-light-disabled',
  active: 'border-light-main'
};

const darkborders: Record<string, string> = {
  default: 'border-dark-disabled',
  active: 'border-dark-main'
};

const JobSelectBox = ({ 
  border = 'default', 
  labelTitle,
  isError,
  helperTxt}: Props) => {

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  let errorState = isError;

  return (
    <form className='w-full'>
      <label className='block' htmlFor='job' >{labelTitle}</label>
      <select
        className={`
          w-full
          border
          border-solid
          ${currentTheme === 'dark' ? darkborders[border] : lightborders[border]} 
          ${errorState ? (currentTheme === 'dark' ? 'border-dark-error' : 'border-light-error') : ''} 
          px-3 py-4
          rounded
          focus: outline-dark-main
        `}
        name='jobSelect'
        id='job'
      >
        {jobSelect.map((item) => (
          <option key={item.id} value={item.id} >
            {item.title}
          </option>
        ))}
      </select>
      {errorState && (
        <strong className={currentTheme === 'dark' ? 'text-dark-error' : 'text-light-error'}>
          {helperTxt}
        </strong>
      )}
    </form>
  );
};

const LocSelectBox = ({ 
  border = 'default', 
  labelTitle,
  isError,
  helperTxt}: Props) => {

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  let errorState = isError;

  return (
    <form className='w-full'>
      <label className='block' htmlFor='loc' >{labelTitle}</label>
      <select
        className={`
          w-full
          border
          border-solid
          ${currentTheme === 'dark' ? darkborders[border] : lightborders[border]} 
          ${errorState ? (currentTheme === 'dark' ? 'border-dark-error' : 'border-light-error') : ''} 
          px-3 py-4
          rounded
          focus: outline-dark-main
        `}
        name='locSelect'
        id='loc'
      >
        {locSelect.map((item) => (
          <option key={item.id} value={item.id} >
            {item.title}
          </option>
        ))}
      </select>
      {errorState && (
        <strong className={currentTheme === 'dark' ? 'text-dark-error' : 'text-light-error'}>
          {helperTxt}
        </strong>
      )}
    </form>
  );
};

export {JobSelectBox, LocSelectBox};
