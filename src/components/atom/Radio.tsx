'use-client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

const Radio = ({ children, value, name, defaultChecked = false, disabled }: Props) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="w-4 h-4 text-light-main focus:ring-light-main"
      />
      <span className="m-2">{children}</span>
    </label>
  );
};
export default Radio;
