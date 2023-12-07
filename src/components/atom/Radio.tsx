'use-client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: string;
  name: string;
  onClick: (type: string) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
}

const Radio = ({ children, value, name, defaultChecked = false, disabled, onClick }: Props) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="w-4 h-4 text-light-main focus:ring-light-main"
        onClick={e => {
          const curTarget = e.target as HTMLInputElement;
          onClick(curTarget.value);
        }}
      />
      <span className="m-2">{children}</span>
    </label>
  );
};
export default Radio;
