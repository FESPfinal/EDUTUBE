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

interface Props {
  data: ReservedState;
  parentsId: string;
}

const MyCoffeechatDetailChatButton = ({ data, parentsId }: Props) => {
  console.log(data);

  const { userInfo } = useUserInfo();
  const { mutate: updateChatLinkMutate } = useUpdateMyCoffeechatChatLink();
  const { refetch: coffeechatInfoRefetch } = useSelectCoffeechatInfo(parentsId);
  const { refetch: sellerOrdersRefetch } = useSelectSellerOrders();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rooms, setRooms] = useState<RoomsData>({});

  const isExist = !!Object.keys(rooms).filter(
    key => `/mypage/chat/${key}` === data.itemInfo.online,
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

  const refetchAll = () => {
    coffeechatInfoRefetch();
    sellerOrdersRefetch();
  };

  // useEffect(() => {
  //   function handleCreateRoomResponse(response: CreateRoomResponse) {
  //     if (response.success) {
  //       // 채팅방이 성공적으로 생성된 경우
  //       //option에 해당하는 채팅방 입장 키
  //       const roomKey = Object.entries(response.roomList).filter(
  //         item => item[1].parents_option === `${parentsId}_${data.itemInfo.optionId}`,
  //       )[0]?.[0];

  //       if (roomKey !== undefined) {
  //         const chatLink = `/mypage/chat/${roomKey}`;
  //         updateChatLinkMutate(
  //           {
  //             _id: data.itemInfo.optionId,
  //             extraData: { ...data.itemInfo.extra, online: chatLink },
  //           },
  //           {
  //             onSuccess: () => {
  //               refetchAll();
  //             },
  //           },
  //         );
  //       }
  //     }
  //   }
  //   // 서버에서 createRoom에 대한 응답을 받을 때 호출될 함수
  //   socket.on('createRoomResponse', handleCreateRoomResponse);

  //   return () => {
  //     socket.off('createRoomResponse', handleCreateRoomResponse);
  //   };
  // }, []);

  const updateLink = (response: CreateRoomResponse) => {
    const roomKey = Object.entries(response.roomList).filter(
      item => item[1].parents_option === `${parentsId}_${data.itemInfo.optionId}`,
    )[0]?.[0];

    if (roomKey !== undefined) {
      const chatLink = `/mypage/chat/${roomKey}`;
      updateChatLinkMutate(
        {
          _id: data.itemInfo.optionId,
          extraData: { ...data.itemInfo.extra, online: chatLink },
        },
        {
          onSuccess: () => {
            refetchAll();
          },
        },
      );
    }
  };

  if (data.itemInfo.place === 'online') {
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
          <Link href={data.itemInfo.online}>
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
  }
};

export default MyCoffeechatDetailChatButton;
