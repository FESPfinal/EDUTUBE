'use client';

interface Props {
  label: string;
  size?: 'large' | 'medium' | 'small';
  isChecked?: boolean;
  onChange?: () => void
}

const sizes = {
  small: 'w-3 h-3',
  medium: 'w-5 h-5',
  large: 'w-7 h-7'
};

const CheckBox = ({ label, size = 'small', onChange, isChecked }: Props) => {
  let sizeClass = sizes[size];

  const handleClicked = () => {
    if (onChange) {
      onChange();
    }
  }

  return (
    <>
      <label className={`block flex items-center`}>
        <input
          className={`
          text-light-main
          focus:ring-transparent
          mr-3 
          ${sizeClass}
          `}
          type='checkbox'
          onChange = {handleClicked}
          checked = {isChecked}
          />
          {label}
      </label>
    </>
  );
};

export default CheckBox;
