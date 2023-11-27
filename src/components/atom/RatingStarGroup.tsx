'use client';

import { useState } from 'react';
import RatingStar from './RatingStar';

interface Props {
  isReadOnly: boolean;
  defaultRate?: number;
  setSelectedRate?: (value: number) => void;
}

/**
 *
 * @param isReadOnly 별점을 수정할 수 있는지 여부
 * @param defaultRate 별점을 수정하지 않는 경우, 보여질 별점
 * @param setSelectedRate 별점이 수정될 때 수정된 별점의 점수를 받아갈 함수
 */
const RatingStarGroup = ({ isReadOnly = true, defaultRate = 0, setSelectedRate }: Props) => {
  const [rate, setRate] = useState(defaultRate);
  const handleStarRate = (value: number) => {
    setRate(value);
    setSelectedRate && setSelectedRate(value);
  };

  {
    return isReadOnly ? (
      <div className="flex items-center">
        <RatingStar id={1} state={rate >= 1 ? 'fill' : 'empty'} />
        <RatingStar id={2} state={rate >= 2 ? 'fill' : 'empty'} />
        <RatingStar id={3} state={rate >= 3 ? 'fill' : 'empty'} />
        <RatingStar id={4} state={rate >= 4 ? 'fill' : 'empty'} />
        <RatingStar id={5} state={rate >= 5 ? 'fill' : 'empty'} />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{rate}</span>
      </div>
    ) : (
      <div className="flex items-center">
        <RatingStar id={1} onClick={handleStarRate} state={rate >= 1 ? 'fill' : 'empty'} />
        <RatingStar id={2} onClick={handleStarRate} state={rate >= 2 ? 'fill' : 'empty'} />
        <RatingStar id={3} onClick={handleStarRate} state={rate >= 3 ? 'fill' : 'empty'} />
        <RatingStar id={4} onClick={handleStarRate} state={rate >= 4 ? 'fill' : 'empty'} />
        <RatingStar id={5} onClick={handleStarRate} state={rate >= 5 ? 'fill' : 'empty'} />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{rate}</span>
      </div>
    );
  }
};
export default RatingStarGroup;
