'use client';

import RatingBar from './RatingBar';

type PersentList = { five: string; four: string; three: string; two: string; one: string };

interface Props {
  persentList: PersentList;
}

const RatingBarGroup = ({ persentList }: Props) => {
  return (
    <>
      <RatingBar point={'5'} percent={persentList.five} />
      <RatingBar point={'4'} percent={persentList.four} />
      <RatingBar point={'3'} percent={persentList.three} />
      <RatingBar point={'2'} percent={persentList.two} />
      <RatingBar point={'1'} percent={persentList.one} />
    </>
  );
};
export default RatingBarGroup;
