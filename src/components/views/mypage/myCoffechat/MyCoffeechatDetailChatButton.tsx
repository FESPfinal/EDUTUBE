'use client';

import Button from '@/components/atom/Button';
import { RoomsData } from '@/helper/utils/websocket';
import useSelectMyCoffeechatChatLink from '@/queries/mypage/myCoffeechat/useSelectMyCoffeechatChatLink';
import Link from 'next/link';
import { useMemo } from 'react';
import { ReservedState } from './MyCoffeechatDetailBody';

interface Props {
  data: ReservedState;
  parentsId: string;
  chatLink: string | undefined;
  rooms: RoomsData;
  handleCreateRoom: (optionData: ReservedState) => void;
}

const MyCoffeechatDetailChatButton = ({ data, rooms, handleCreateRoom }: Props) => {
  const { data: chatLinkData } = useSelectMyCoffeechatChatLink(data.itemInfo.optionId);
  const isChatExist = useMemo(() => {
    return (
      rooms && !!Object.keys(rooms).filter(key => `/mypage/chat/${key}` === chatLinkData?.title)[0]
    );
  }, [chatLinkData?.title, rooms]);

  return (
    <>
      {isChatExist ? (
        <Link href={chatLinkData?.title || ''}>
          <Button
            content={'채팅방 참여'}
            size={'small'}
            color={'bg-orange-400 hover:bg-orange-800'}
            darkColor={'bg-orange-400 hover:bg-orange-800'}
          />
        </Link>
      ) : (
        <Button content={'채팅방 생성'} size={'small'} onClick={() => handleCreateRoom(data)} />
      )}
    </>
  );
};

export default MyCoffeechatDetailChatButton;
