'use client';

import { MsgItem, RoomsData, socket } from '@/helper/utils/websocket';
import useUserInfo from '@/stores/userInfo';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CreateRoom = function () {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomName, setRoomName] = useState('');

  const [rooms, setRooms] = useState<RoomsData>({});
  const { userInfo } = useUserInfo();

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

  // 채팅방 생성
  const handleCreateRoom = function () {
    if (userInfo) {
      if (roomName.trim().length > 0) {
        socket.emit('createRoom', {
          user_id: userInfo._id,
          hostName: userInfo.name,
          roomName: roomName,
          parents_option: '',
          callback: () => {},
        });
      } else {
        alert('채팅방 이름을 입력하세요.');
      }
    } else {
      alert('로그인 후에 이용하세요.');
    }
  };

  console.log(rooms);

  return (
    <div>
      <p>연결 상태: {'' + isConnected}</p>
      <h3>채팅방 목록</h3>
      <ul>
        {Object.keys(rooms).map((key, index) => (
          <li key={index}>
            {rooms[key].roomName}({rooms[key].hostName})
            <Link href={`/mypage/chat/${key}`}>참여</Link>
          </li>
        ))}
      </ul>
      이름{' '}
      <input
        type="text"
        autoFocus={true}
        onChange={e => setRoomName(e.target.value)}
        value={roomName}
      />
      <button onClick={handleCreateRoom}>생성</button>
    </div>
  );
};

export default CreateRoom;
