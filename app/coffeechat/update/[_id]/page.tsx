import CoffeeChatUpdate from '@/components/views/coffeechat/update/CoffeeChatUpdate';

const CoffeechatUpdate = ({ params: { _id } }: { params: { _id: string } }) => {
  return (
    <>
      <p>커피챗 수정</p>
      <CoffeeChatUpdate _id={_id} />
    </>
  );
};
export default CoffeechatUpdate;
