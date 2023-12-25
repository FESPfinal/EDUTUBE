'use client';

import { CreateRoomResponse, MsgItem, RoomsData, socket } from '@/helper/utils/websocket';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useSelectSellerOrders from '@/queries/mypage/myCoffeechat/useSelectSellerOrders';
import useUpdateMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useUpdateMyCoffeechatChatLink';
import useUserInfo from '@/stores/userInfo';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyCoffeechatDetailBody, { ReservedState } from './MyCoffeechatDetailBody';
import MyCoffeechatDetailHead from './MyCoffeechatDetailHead';

const MyCoffeechatDetail = () => {
  const params = useParams();
  const _id = params._id as string;

  const { userInfo } = useUserInfo();
  const { mutate: updateChatLinkMutate } = useUpdateMyCoffeechatChatLink();
  const { refetch: coffeechatInfoRefetch } = useSelectCoffeechatInfo(_id);
  const { refetch: sellerOrdersRefetch } = useSelectSellerOrders();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rooms, setRooms] = useState<RoomsData>({});

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onSetMsg(data: MsgItem) {
      console.log(data);
    }

    // 서버 접속 완료
    socket.on('connect', onConnect);
    // 서버 접속 해제
    socket.on('disconnect', onDisconnect);
    // 채팅방 목록 변경
    socket.on('setRooms', setRooms);
    // 채팅 메세지 도착
    socket.on('setMsg', onSetMsg);

    // 서버 접속
    socket.connect();
    // 채팅방 목록 조회
    socket.emit('getRooms', (rooms: RoomsData) => setRooms(rooms));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('setRooms', setRooms);
      socket.off('setMsg', onSetMsg);
    };
  }, []);

  //데이터 리패치
  const refetchAll = () => {
    console.log('리패치');
    coffeechatInfoRefetch();
    sellerOrdersRefetch();
  };

  /**
   * 채팅방 링크 업데이트
   * @param response api 응답 값
   * @param optionData child product에 대해 ReservedState 타입으로 구성한 데이터
   */
  const updateLink = (
    response: CreateRoomResponse,
    optionData: ReservedState,
    callback: (isCreatedChat: boolean, chatLink: string) => void,
  ) => {
    const roomKey = Object.entries(response.roomList).filter(
      item => item[1].parents_option === `${_id}_${optionData.itemInfo.optionId}`,
    )[0]?.[0];

    if (roomKey !== undefined) {
      const chatLink = `/mypage/chat/${roomKey}`;
      updateChatLinkMutate(
        {
          _id: optionData.itemInfo.optionId,
          reqData: {
            type: 'coffeechat',
            product_id: optionData.itemInfo.optionId,
            title: chatLink,
            content: '',
          },
        },
        {
          onSuccess: () => {
            refetchAll();
            const isCreatedChat = true;
            callback(isCreatedChat, chatLink);
          },
        },
      );
    }
  };

  // 채팅방 생성
  const handleCreateRoom = (
    optionData: ReservedState,
    callback: (isCreatedChat: boolean, chatLink: string) => void,
  ) => {
    console.log('clicked');
    if (userInfo) {
      if (optionData.itemInfo.name.trim().length > 0) {
        socket.emit(
          'createRoom',
          {
            user_id: userInfo._id,
            hostName: userInfo.name,
            roomName: optionData.itemInfo.name,
            parents_option: `${_id}_${optionData.itemInfo.optionId}`,
          },
          response => updateLink(response, optionData, callback),
        );
      } else {
        alert('채팅방 이름을 입력하세요.');
      }
    } else {
      alert('로그인 후에 이용하세요.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <MyCoffeechatDetailHead _id={_id} />
      <MyCoffeechatDetailBody _id={_id} rooms={rooms} handleCreateRoom={handleCreateRoom} />
    </div>
  );
};

export default MyCoffeechatDetail;
