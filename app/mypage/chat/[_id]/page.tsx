import ChatRoom from '@/components/views/mypage/chat/ChatRoom';

const MyChatRoomPage = ({ params: { _id } }: { params: { _id: string } }) => {
  return (
    <>
      <ChatRoom roomId={_id} />
    </>
  );
};

export default MyChatRoomPage;
