'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  content: string | number;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const PlusButton = ({ content, onClick, disabled = false }: Props) => {
  return (
    <>
      <button
        className={`font-medium px-4 py-3 rounded-full text-white ${
          disabled == true ? `bg-light-disabled hover:none` : `bg-light-main hover:bg-dark-main`
        } `}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {content}
        <FontAwesomeIcon icon={faPlus} className="ml-4" />
      </button>
    </>
  );
};

export default PlusButton;
