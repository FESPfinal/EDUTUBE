'use client';

interface Props {
  point: string;
  percent: string | number;
}

const RatingBar = ({ point = '0', percent = '0' }: Props) => {
  return (
    <div className="flex items-center mt-4 space-x-2">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{point}점</span>
      <div className="flex-1 w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
        <div className="h-2.5 rounded bg-yellow-300" style={{ width: `${percent}%` }}></div>
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{percent}%</span>
    </div>
  );
};
export default RatingBar;
