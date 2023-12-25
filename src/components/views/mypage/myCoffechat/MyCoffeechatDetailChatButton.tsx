'use client';

import Button from '@/components/atom/Button';
import { RoomsData } from '@/helper/utils/websocket';
import useSelectMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechatChatLink';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ReservedState } from './MyCoffeechatDetailBody';

interface Props {
  data: ReservedState;
  parentsId: string;
  chatLink: string | undefined;
  rooms: RoomsData;
  handleCreateRoom: (
    optionData: ReservedState,
    callback: (isCreatedChat: boolean, chatLink: string) => void,
  ) => void;
}

const MyCoffeechatDetailChatButton = ({ data, rooms, handleCreateRoom }: Props) => {
  const { data: chatLinkData } = useSelectMyCoffeechatChatLink(data.itemInfo.optionId);
  const [isExist, setExist] = useState({ isExist: !!chatLinkData?.title, chatLink: '' });

  useEffect(() => {
    const roomKey = Object.keys(rooms).filter(
      key => `/mypage/chat/${key}` === chatLinkData?.title,
    )[0];
    setExist({
      isExist: rooms && !!roomKey,
      chatLink: `/mypage/chat/${roomKey}`,
    });
  }, [chatLinkData, rooms]);

  const handleOnClick = () => {
    handleCreateRoom(data, (isCreatedChat, chatLink) =>
      setExist({ isExist: isCreatedChat, chatLink }),
    );
  };

  return (
    <>
      {isExist.isExist ? (
        <Link href={chatLinkData?.title || isExist.chatLink || ''}>
          <Button
            content={'채팅방 참여'}
            size={'small'}
            color={'bg-orange-400 hover:bg-orange-800'}
            darkColor={'bg-orange-400 hover:bg-orange-800'}
          />
        </Link>
      ) : (
        <Button content={'채팅방 생성'} size={'small'} onClick={handleOnClick} />
      )}
    </>
  );
};

export default MyCoffeechatDetailChatButton;
