'use client';
import useSelectCoffeechatInfo from '../../../../queries/coffeechat/info/useSelectCoffeechatInfo';
import Link from 'next/link';

const CoffeechatInfo = ({ _id }: { _id: string }) => {
  const {
    커피챗디테일데이터,
    커피챗디테일데이터Loading,
    커피챗디테일에러여부,
  } = useSelectCoffeechatInfo(_id);

  if (커피챗디테일데이터Loading) return <></>;
  if (커피챗디테일에러여부) {
    return <div>Error: {커피챗디테일에러여부.message}</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">이것은 커피챗디테일</h1>
      <img src={커피챗디테일데이터?.item?.mainImages} />
      <div className="text-lg font-bold mb-2">Title: {커피챗디테일데이터.item.name}</div>
    </>
  );
};

export default CoffeechatInfo;
