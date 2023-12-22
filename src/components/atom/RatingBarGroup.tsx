'use client';

import RatingBar from './RatingBar';

type PercentList = { five: string | number; four: string | number; three: string | number; two: string | number; one: string | number };

interface Props {
  percentList: PercentList;
}

const RatingBarGroup = ({ percentList }: Props) => {
  return (
    <>
      <RatingBar point={'5'} percent={percentList.five} />
      <RatingBar point={'4'} percent={percentList.four} />
      <RatingBar point={'3'} percent={percentList.three} />
      <RatingBar point={'2'} percent={percentList.two} />
      <RatingBar point={'1'} percent={percentList.one} />
    </>
  );
};
export default RatingBarGroup;
