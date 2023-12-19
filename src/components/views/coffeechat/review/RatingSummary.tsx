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
    <div className="flex gap-6 bg-gray-100 rounded-lg mt-6 mb-6">
      <div className="flex flex-col  p-8 items-center justify-center gap-5 ">
        <p className="text-bold text-2xl">{averageRating}</p>
        <RatingStarGroup isReadOnly={true} defaultRate={averageRating} />
        <p className="text-gray-700 text-sm">{replyCount}개의 수강평</p>
      </div>
      <div className="flex flex-col w-full  p-4">
        <RatingBarGroup percentList={ratingPercentages} />
      </div>
    </div>
  );
}
export default RatingSummary;