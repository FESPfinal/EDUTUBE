'use client';

import Button from '@/components/atom/Button';
import { ReservedState } from './MyCoffeechatDetailBody';
import useUserInfo from '@/stores/userInfo';
import { CreateRoomResponse, MsgItem, RoomsData, socket } from '@/helper/utils/websocket';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useUpdateMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useUpdateMyCoffeechatChatLink';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useSelectSellerOrders from '@/queries/mypage/myCoffeechat/useSelectSellerOrders';
import useSelectMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechatChatLink';

interface Props {
  data: ReservedState;
  parentsId: string;
  chatLink: string | undefined;
}

const MyCoffeechatDetailChatButton = ({ data, parentsId, chatLink }: Props) => {
  const { userInfo } = useUserInfo();
  const { mutate: updateChatLinkMutate } = useUpdateMyCoffeechatChatLink();
  const { refetch: coffeechatInfoRefetch } = useSelectCoffeechatInfo(parentsId);
  const { refetch: sellerOrdersRefetch } = useSelectSellerOrders();
  const { data: chatLinkData } = useSelectMyCoffeechatChatLink(data.itemInfo.optionId);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rooms, setRooms] = useState<RoomsData>({});

  const isExist = !!Object.keys(rooms).filter(
    key => `/mypage/chat/${key}` === chatLinkData?.title,
  )[0];

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
    coffeechatInfoRefetch();
    sellerOrdersRefetch();
  };

  //채팅방 링크 update
  const updateLink = (response: CreateRoomResponse) => {
    const roomKey = Object.entries(response.roomList).filter(
      item => item[1].parents_option === `${parentsId}_${data.itemInfo.optionId}`,
    )[0]?.[0];

    if (roomKey !== undefined) {
      const chatLink = `/mypage/chat/${roomKey}`;
      updateChatLinkMutate(
        {
          _id: data.itemInfo.optionId,
          reqData: {
            type: 'coffeechat',
            product_id: data.itemInfo.optionId,
            title: chatLink,
            content: '',
          },
        },
        {
          onSuccess: () => {
            refetchAll();
          },
        },
      );
    }
  };

  // 채팅방 생성
  const handleCreateRoom = () => {
    console.log('clicked');
    if (userInfo) {
      if (data.itemInfo.name.trim().length > 0) {
        socket.emit(
          'createRoom',
          {
            user_id: userInfo._id,
            hostName: userInfo.name,
            roomName: data.itemInfo.name,
            parents_option: `${parentsId}_${data.itemInfo.optionId}`,
          },
          updateLink,
        );
      } else {
        alert('채팅방 이름을 입력하세요.');
      }
    } else {
      alert('로그인 후에 이용하세요.');
    }
  };

  return (
    <>
      {isExist ? (
        <Link href={chatLinkData?.title || ''}>
          <Button
            content={'채팅방 참여'}
            size={'small'}
            color={'bg-orange-400 hover:bg-orange-800'}
            darkColor={'bg-orange-400 hover:bg-orange-800'}
          />
        </Link>
      ) : (
        <Button content={'채팅방 생성'} size={'small'} onClick={handleCreateRoom} />
      )}
    </>
  );
};

export default MyCoffeechatDetailChatButton;
