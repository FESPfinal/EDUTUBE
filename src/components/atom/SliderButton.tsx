import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  direction: 'left' | 'right';
}

const SliderButton = ({ onClick, direction = 'left' }: Props) => {
  return (
    <button
      className={`
      px-5 py-3.5 rounded-full
      text-gray-700 dark:text-gray-300
      bg-gray-100 dark:bg-gray-700
      hover:bg-gray-200 hover:dark:bg-gray-600
      w-16 shadow-md`}
      type="button"
      onClick={onClick}
    >
      {direction == 'left' ? (
        <FontAwesomeIcon icon={faChevronLeft} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} />
      )}
    </button>
  );
};
export default SliderButton;
