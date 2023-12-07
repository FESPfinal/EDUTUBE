import CoffeechatInfo from '../../../../src/components/views/coffeechat/info/CoffeechatInfo';

const CoffeechatInfoPage = ({ params: { _id } }: { params: { _id: string } }) => {
  return (
    <>
      <CoffeechatInfo _id={_id} />
    </>
  );
};
export default CoffeechatInfoPage;
