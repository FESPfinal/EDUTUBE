'use client';

import React, { useEffect, useState } from 'react';
import { MembersData, MsgItem, RoomItem, socket } from '@/helper/utils/websocket';
import useUserInfo from '@/stores/userInfo';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const ChatRoom = function ({ roomId }: { roomId: string }) {
  // 서버 접속 상태
  const [isJoined, setIsJoined] = useState(false);
  // 채팅방 멤버 목록
  const [members, setMembers] = useState<MembersData>({});
  // 채팅 메세지 목록
  const [msgList, setMsgList] = useState<string[]>([]);
  // 채팅방 정보
  const [roomInfo, setRoomInfo] = useState<Partial<RoomItem>>({});
  const { userInfo } = useUserInfo(store => store);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 서버 접속 완료시
  const onConnect = () => {
    socket.emit('getRoomInfo', roomId!, setRoomInfo);
    socket.emit('getMembers', roomId!, setMembers);
  };

  // 채팅방 입장
  const handleJoinRoom = () => {
    socket.emit(
      'joinRoom',
      { roomId: roomId!, user_id: userInfo?._id, nickName: userInfo?.name },
      () => {
        setIsJoined(true);
      },
    );
  };

  // 채팅방 퇴장
  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', () => {
      setIsJoined(false);
      setMsgList([]);
    });
  };

  //메시지 보내기
  function sendMsg(msg: string) {
    msg = msg.trim();
    if (msg) {
      socket.emit('sendMsg', msg);
      if (inputRef.current) {
        setMsg('');
        inputRef.current.focus();
      }
    }
  }

  // 링크 복사
  const handleCopyLink = () => {
    const link = `${window.location.origin}/mypage/chat/${roomId}`;
    navigator.clipboard.writeText(link);
    setIsModalOpen(false);
    alert('채팅방 링크가 복사되었습니다.');
  };

  useEffect(() => {
    const onDisconnect = () => {
      setIsJoined(false);
    };

    const onSetMsg = (data: MsgItem) => {
      setMsgList(previous => [...previous, `${data.nickName}: ${data.msg}`]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('setMsg', onSetMsg);
    socket.on('setMembers', setMembers);

    if (socket.connected) {
      onConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('setMsg', onSetMsg);
      socket.off('setMembers', setMembers);
    };
  }, []);

  const msgOut = React.createRef<HTMLDivElement>();

  // msgOut이 업데이트될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (msgOut.current) {
      msgOut.current.scrollTop = msgOut.current.scrollHeight;
    }
  }, [msgList, msgOut]);

  const [msg, setMsg] = useState('');
  const inputRef = React.createRef<HTMLInputElement>();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    sendMsg(msg);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMsg(msg);
    }
  }

  return (
    <main className="container mx-auto h-[calc(100vh-86px)] flex max-w-lg">
      <div className="max-w-lg min-w-[450px] mx-auto shadow-lg p-6 h-[calc(100vh-86px)] flex flex-col">
        <div className="flex justify-between items-center mb-4" ref={msgOut}>
          <h1 className="text-2xl font-bold">커피챗 채팅방: {roomInfo.roomName}</h1>
          <button onClick={handleCopyLink}>
            <FontAwesomeIcon className="text-2xl" icon={faLink} />
          </button>
        </div>
        <p className="mb-4">바리스타: {roomInfo.hostName}</p>

        {isJoined && (
          <>
            <h3 className="text-lg font-bold mt-4 mb-2">채팅 메세지</h3>
            <div className="flex-grow overflow-y-auto mb-4">
              <ul>
                {msgList.map((msg, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded mb-2">
                    <div className="flex items-start">
                      {/* <div className="flex-shrink-0">
                    <Image src="/avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                  </div> */}
                      <div className="ml-2">
                        <p className="text-sm">{msg}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                size={40}
                className="border border-gray-300 rounded px-2 py-1 mr-2"
                disabled={!isJoined}
                autoFocus={true}
                ref={inputRef}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                value={msg}
              />
              <button
                type="button"
                className={`min-w-fit bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                  !isJoined ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isJoined}
                onClick={handleClick}
              >
                전송
              </button>
            </div>
          </>
        )}
      </div>
      <div className="min-w-fit">
        <div className="flex m-3">
          <button
            className={`min-w-fit bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded mr-2 ${
              isJoined ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleJoinRoom}
            disabled={isJoined}
          >
            입장
          </button>
          <button
            className={`min-w-fit bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ${
              !isJoined ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleLeaveRoom}
            disabled={!isJoined}
          >
            퇴장
          </button>
        </div>
        {isJoined && (
          <div className="shadow-lg p-6 m-1 flex flex-col">
            <>
              <h3 className="font-bold mb-2">참가자 목록</h3>
              <ul className="mb-4">
                {Object.keys(members).map((socketId, index) => (
                  <li key={index}>{members[socketId].nickName}</li>
                ))}
              </ul>
            </>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatRoom;
