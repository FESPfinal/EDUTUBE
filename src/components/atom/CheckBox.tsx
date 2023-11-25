'use client';

interface Props {
  label: string;
  size?: 'large' | 'medium' | 'small';
}

const sizes = {
  small: 'w-3 h-3',
  medium: 'w-5 h-5',
  large: 'w-7 h-7'
};

const CheckBox = ({ label, size = 'small', }: Props) => {

  let sizeClass = sizes[size];

  return (
    <>
      <label className={`block flex items-center`}>
        <input
          className={`
          accent-dark-main mr-3 ${sizeClass}
          `}
          type='checkbox'
          />
          {label}
      </label>
    </>
  );
};

export default CheckBox;
