'use client'
import RatingBarGroup from '@/components/atom/RatingBarGroup';
import RatingStarGroup from '@/components/atom/RatingStarGroup';

interface Props {
  averageRating: number;
  replyCount: number;
  ratingPercentages: {
    five: number | string;
    four: number | string;
    three: number | string;
    two: number | string;
    one: number | string;
  };
};

const RatingSummary = ({ averageRating,
  replyCount,
  ratingPercentages }: Props) => {
  return (
    <div className="flex border-2 border-indigo">
      <div className="flex flex-col border-2 border-black">
        <p>{averageRating}</p>
        <RatingStarGroup isReadOnly={true} defaultRate={averageRating} />
        <p>{replyCount}개의 수강평</p>
      </div>
      <div className="flex flex-col border-2 border-black w-full">
        <RatingBarGroup percentList={ratingPercentages} />
      </div>
    </div>
  );
}
export default RatingSummary;