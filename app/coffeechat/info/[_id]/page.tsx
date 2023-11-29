import CoffeechatInfo from '../../../../src/components/views/coffeechat/info/CoffeechatInfo';

const CoffeechatInfoPage = ({ params: { _id } }: { params: { _id: string } }) => {
  return (
    <>
      <p>커피챗 상세 _id: {_id}</p>
      <CoffeechatInfo _id={_id} />
    </>
  );
};
export default CoffeechatInfoPage;
